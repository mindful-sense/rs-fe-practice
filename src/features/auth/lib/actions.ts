"use server";

import { redirect } from "next/navigation";
import * as z from "zod";
import bcrypt from "bcrypt";

import { createUser, getUserForAuth, isLoginTaken } from "@/lib/db/queries";
import { getErrorMessage } from "@/lib/utils";

import {
  type ActionState,
  type ErrorFields,
  signupSchema,
  signinSchema,
} from "@/features/auth/lib";

import { getDefaultFieldErrors } from "./constants";
import { createSession, deleteSession } from "./session";

interface ValidationError {
  formData: FormData;
  errors?: z.ZodError | ErrorFields;
  error?: string;
}

const SALT_ROUNDS = 10;

const formatZodErrors = (error: z.ZodError): ErrorFields => {
  const formattedErrors: ErrorFields = getDefaultFieldErrors();
  const fieldErrors = z.flattenError(error).fieldErrors;

  Object.entries(fieldErrors).forEach(([field, messages]) => {
    if (Array.isArray(messages) && messages.length > 0) {
      formattedErrors[field] = { message: messages.join(". ") };
    }
  });

  return formattedErrors;
};

const handleValidationError = ({
  formData,
  error,
  errors = getDefaultFieldErrors(),
}: ValidationError): ActionState => ({
  ok: false,
  formData,
  errors: errors instanceof z.ZodError ? formatZodErrors(errors) : errors,
  error,
});

const handleAuth = async <T extends z.ZodObject>(
  formData: FormData,
  schema: T,
  callback: (data: z.infer<T>) => Promise<ActionState>,
) => {
  const data: Record<string, unknown> = {};

  Object.keys(schema.shape).forEach((key) => {
    data[key] = formData.get(key);
  });

  const result = schema.safeParse(data);

  if (!result.success) {
    return handleValidationError({
      formData,
      errors: result.error,
      error: "Entered invalid data",
    });
  }

  return callback(result.data);
};

export const signup = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> =>
  await handleAuth(formData, signupSchema, async ({ login, password }) => {
    try {
      if (await isLoginTaken(login)) {
        throw new Error("This username is already taken");
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const createdUser = await createUser(login, hashedPassword);

      await createSession(createdUser.userId);
    } catch (error) {
      return handleValidationError({
        formData,
        error: getErrorMessage(error),
      });
    }
    redirect("/");
  });

export const signin = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> =>
  await handleAuth(formData, signinSchema, async ({ login, password }) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = await getUserForAuth(login);

      if (!user) {
        throw new Error("User is not found");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      await createSession(user.userId);
    } catch (error) {
      return handleValidationError({ formData, error: getErrorMessage(error) });
    }
    redirect("/");
  });

export const signout = async (): Promise<void> => {
  await deleteSession();
  redirect("/login");
};
