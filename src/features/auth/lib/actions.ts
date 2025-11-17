"use server";

import { redirect } from "next/navigation";
import * as z from "zod";
import bcrypt from "bcrypt";

import { ROUTE_PATHS } from "@/config";
import { createUser, isLoginTaken, getAuthUserByLogin } from "@/lib/server";
import { getErrorMessage, getDelay } from "@/lib/shared";

import { createDefaultFieldErrors } from "./constants";
import { signUpSchema, signInSchema } from "./schema";
import { createSession, deleteSession } from "./session";
import type { ActionState, ErrorFields } from "./types";

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

const createErrorState = ({
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

const handleAuth = async <Schema extends z.ZodObject>({
  formData,
  schema,
  handler,
}: {
  formData: FormData;
  schema: Schema;
  handler: (data: z.infer<Schema>) => Promise<ActionState>;
}): Promise<ActionState> => {
  const entries = Object.keys(schema.shape).reduce<Record<string, string>>(
    (values, key) => {
      const value = formData.get(key);
      return { ...values, [key]: typeof value === "string" ? value : "" };
    },
    {},
  );

  const result = schema.safeParse(entries);

  if (!result.success) {
    return createErrorState({
      formData,
      errors: result.error,
      error: "Entered invalid data",
    });
  }

  return handler(result.data);
};

export const signup = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> =>
  await handleAuth({
    formData,
    schema: signUpSchema,
    handler: async ({ login, password }) => {
      try {
        if (await isLoginTaken(login)) {
          throw new Error("This username is already taken");
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const createdUser = await createUser({
          login,
          password: hashedPassword,
        });

        await createSession(createdUser);
      } catch (error) {
        return createErrorState({
          formData,
          error: getErrorMessage(error),
        });
      }
      redirect(ROUTE_PATHS.HOME);
    },
  });

export const signin = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> =>
  await handleAuth({
    formData,
    schema: signInSchema,
    handler: async ({ login, password }) => {
      try {
        await getDelay();

        const user = await getAuthUserByLogin(login);

        if (!user) {
          throw new Error("User is not found");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        const { password: _, ...userWithoutPassword } = user;
        await createSession(userWithoutPassword);
      } catch (error) {
        return createErrorState({
          formData,
          error: getErrorMessage(error),
        });
      }
      redirect(ROUTE_PATHS.HOME);
    },
  });

export const signout = async (): Promise<void> => {
  await deleteSession();
  redirect(ROUTE_PATHS.LOGIN);
};
