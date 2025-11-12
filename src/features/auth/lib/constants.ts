import type {
  ActionState,
  ErrorFields,
  SigninFields,
} from "@/features/auth/lib";

export const LOGIN_MIN_LENGTH = 3;
export const LOGIN_MAX_LENGTH = 30;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 50;

export const DEFAULT_FIELD_VALUES = {
  login: "",
  password: "",
} as const satisfies SigninFields;

export const createDefaultFieldErrors = (): ErrorFields => ({
  login: null,
  password: null,
  passwordConfirm: null,
});

export const createDefaultActionState = (): ActionState => ({
  ok: true,
  formData: new FormData(),
  errors: createDefaultFieldErrors(),
  error: "",
});
