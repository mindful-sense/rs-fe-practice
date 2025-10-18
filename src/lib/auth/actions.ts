"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import * as z from "zod";

import { createUser, getUserForAuth, isLoginTaken } from "../db/queries";
import { getErrorMessage } from "../utils";
import { signupSchema, signinSchema } from "./schema";
import { createSession, deleteSession } from "./session";

type FieldErrors = Record<string, { message: string } | null>;

interface ValidationError {
  formData: FormData;
  errors?: z.ZodError | FieldErrors;
  error?: string;
}

interface ActionState {
  ok: boolean;
  formData: FormData;
  errors: FieldErrors;
  error?: string;
}

const DEFAULT_FIELD_ERRORS: FieldErrors = {
  login: null,
  password: null,
  passwordConfirm: null,
};
const SALT_ROUNDS = 10;

const formatZodErrors = (error: z.ZodError): FieldErrors => {
  const formattedErrors: FieldErrors = { ...DEFAULT_FIELD_ERRORS };
  const flattenError = z.flattenError(error).fieldErrors;

  for (const [field, messages] of Object.entries(flattenError)) {
    if (Array.isArray(messages) && messages.length > 0) {
      formattedErrors[field] = { message: messages[0] };
    }
  }

  return formattedErrors;
};

const handleValidationError = ({
  formData,
  error,
  errors = DEFAULT_FIELD_ERRORS,
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
  const result = schema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return handleValidationError({
      formData,
      errors: result.error,
      error: "Unable to proceed. Please enter valid data",
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
