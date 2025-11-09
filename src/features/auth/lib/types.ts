export type ErrorField = { message?: string } | null;

export type ErrorFields = Record<string, ErrorField>;

export interface ActionState {
  ok: boolean;
  formData: FormData;
  errors: ErrorFields;
  error?: string;
}
