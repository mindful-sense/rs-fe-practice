"use server";

import "server-only";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { flattenError } from "zod";

import { ROUTE_PATHS } from "@/config";
import { createUser, getAuthUserByLogin, isLoginTaken } from "@/lib/server";
import { getDelay, getErrorMessage } from "@/lib/shared";

import { createSession, deleteSession } from "./session";
import { type SignIn, type SignUp, signInSchema, signUpSchema } from "./schema";
import { type FormState } from "./types";

const SALT_ROUNDS = 10;

export const signup = async (
  _prevState: FormState<SignUp>,
  payload: FormData,
): Promise<FormState<SignUp>> => {
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
    await getDelay();

    if (await isLoginTaken(login)) throw new Error("Username is already taken");

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const createdUser = await createUser({ login, password: hashedPassword });

    await createSession(createdUser);
  } catch (error) {
    return {
      message: getErrorMessage(error),
      fields: { login },
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
    await getDelay();

    const user = await getAuthUserByLogin(login);
    if (!user) throw new Error("User is not found");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("Invalid password");

    const { password: _, ...userWithoutPassword } = user;
    await createSession(userWithoutPassword);
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
