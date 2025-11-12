"use server";

import { redirect } from "next/navigation";
import * as z from "zod";
import bcrypt from "bcrypt";

import { ROUTE_PATHS } from "@/config";
import { createUser, getUserForAuth, isLoginTaken } from "@/lib/db/queries";
import { getErrorMessage } from "@/lib/utils";
import { createSession, deleteSession } from "./session";

import {
  type ActionState,
  type ErrorFields,
  signupSchema,
  signinSchema,
  createDefaultFieldErrors,
} from "@/features/auth/lib";

const SALT_ROUNDS = 10;

const formatZodErrors = (error: z.ZodError): ErrorFields => {
  const formattedErrors: ErrorFields = createDefaultFieldErrors();
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
  errors = createDefaultFieldErrors(),
}: {
  formData: FormData;
  error: string;
  errors?: z.ZodError | ErrorFields;
}): ActionState => ({
  ok: false,
  formData,
  error,
  errors: errors instanceof z.ZodError ? formatZodErrors(errors) : errors,
});

const handleAuth = async <Schema extends z.ZodObject>(
  formData: FormData,
  schema: Schema,
  callback: (data: z.infer<Schema>) => Promise<ActionState>,
): Promise<ActionState> => {
  const data = Object.keys(schema.shape).reduce<Record<string, string>>(
    (acc, key) => {
      const value = formData.get(key);
      return { ...acc, [key]: typeof value === "string" ? value : "" };
    },
    {},
  );

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
    redirect(ROUTE_PATHS.HOME);
  });

export const signin = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> =>
  await handleAuth(formData, signinSchema, async ({ login, password }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
    redirect(ROUTE_PATHS.HOME);
  });

export const signout = async (): Promise<void> => {
  await deleteSession();
  redirect(ROUTE_PATHS.LOGIN);
};
