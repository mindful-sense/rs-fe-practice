"use server";

import "server-only";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { flattenError } from "zod";
import { SqliteError } from "better-sqlite3";

import { ROUTE_PATHS } from "@/config";
import { insertUser, getUserForLogin } from "@/lib/server";
import { delay, getErrorMessage } from "@/lib/shared";

import { createSession, deleteSession } from "./session";
import { generateSalt, hashPassword } from "./passwordHasher";
import { type SignIn, type SignUp, signInSchema, signUpSchema } from "./schema";
import { type FormState } from "./types";

export const signup = async (
  _prevState: FormState<SignUp>,
  payload: FormData,
): Promise<FormState<SignUp>> => {
  await delay();

  const formData = Object.fromEntries(payload);
  const parsed = signUpSchema.safeParse(formData);

  if (!parsed.success) {
    const { login } = formData;
    return {
      fields: { login } as Partial<SignUp>,
      errors: flattenError(parsed.error).fieldErrors,
    };
  }

  const { login, password } = parsed.data;

  try {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(password, salt);
    const userId = insertUser({ login, password: hashedPassword, salt });

    await createSession(userId);
  } catch (error: unknown) {
    if (
      error instanceof SqliteError &&
      error.code === "SQLITE_CONSTRAINT_UNIQUE"
    ) {
      return {
        message: "Username is already taken",
        fields: { login } as Partial<SignUp>,
      };
    }
    console.log("error:", error, typeof error);
    return {
      message: getErrorMessage(error),
      fields: { login } as Partial<SignUp>,
    };
  }
  redirect(ROUTE_PATHS.HOME);
};

export const signin = async (
  _prevState: FormState<SignIn>,
  payload: FormData,
): Promise<FormState<SignIn>> => {
  const formData = Object.fromEntries(payload);
  const parsed = signInSchema.safeParse(formData);

  if (!parsed.success) {
    const { login } = formData;
    return {
      fields: { login } as Partial<SignIn>,
      errors: flattenError(parsed.error).fieldErrors,
    };
  }

  const { login, password } = parsed.data;

  try {
    const user = getUserForLogin(login);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("Invalid password");

    const { userId } = user;
    await createSession(userId);
  } catch (error) {
    return {
      message: getErrorMessage(error),
      fields: { login },
    };
  }
  redirect(ROUTE_PATHS.HOME);
};

export const signout = async (): Promise<void> => {
  await deleteSession();
  redirect(ROUTE_PATHS.LOGIN);
};
