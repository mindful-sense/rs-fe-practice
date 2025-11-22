export interface FormState<Data> {
  message?: string;
  fields?: Partial<Data>;
  errors?: Partial<Record<keyof Data, string[]>>;
}
