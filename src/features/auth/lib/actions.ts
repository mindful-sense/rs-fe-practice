"use server";
import "server-only";

import type { UserId } from "@/lib/shared";
import type { SignIn, SignUp } from "./schema";
import type { FormState } from "./types";

import * as z from "zod";
import { redirect } from "next/navigation";

import { getErrorMessage, getUserByLogin, insertUser } from "@/lib/server";
import { ROUTE_PATHS, delay } from "@/lib/shared";

import { comparePasswords, generateSalt, hashPassword } from "./passwordHasher";
import { signInSchema, signUpSchema } from "./schema";
import {
  createSession,
  deleteUserFromSession,
  refreshSession,
} from "./session";

const handleAuth = async <FormType extends SignIn | SignUp>(
  payload: FormData,
  schema: z.ZodType<FormType>,
  handler: (data: FormType) => Promise<UserId>,
): Promise<FormState<FormType>> => {
  await delay();

  const formData = Object.fromEntries(payload);
  const parsed = schema.safeParse(formData);

  if (!parsed.success) {
    return {
      fields: { login: formData.login } as Partial<FormType>,
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const userId = await handler(parsed.data);
    await createSession(userId);
  } catch (error) {
    return {
      message: getErrorMessage(error),
      fields: { login: parsed.data.login } as Partial<FormType>,
    };
  }

  redirect(ROUTE_PATHS.HOME);
};

export const signup = async (
  _prevState: FormState<SignUp>,
  payload: FormData,
): Promise<FormState<SignUp>> =>
  handleAuth(payload, signUpSchema, async ({ login, password }) => {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(password, salt);

    return insertUser({ login, password: hashedPassword, salt });
  });

export const signin = async (
  _prevState: FormState<SignIn>,
  payload: FormData,
): Promise<FormState<SignIn>> =>
  handleAuth(payload, signInSchema, async ({ login, password }) => {
    const user = getUserByLogin(login);
    const isCorrectPassword = await comparePasswords({
      hashedPassword: user.password,
      password: password,
      salt: user.salt,
    });

    if (!isCorrectPassword) throw new Error("Invalid password");

    return user.userId;
  });

export const signout = async (): Promise<void> => {
  await deleteUserFromSession();
  redirect(ROUTE_PATHS.HOME);
};

export const refreshSessionAction = async (): Promise<void> => {
  await refreshSession();
};
