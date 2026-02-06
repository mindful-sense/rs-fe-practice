import type { ComponentPropsWithRef as RefProps } from "react";

const GENERAL_STYLE =
  "focus:outline-accent not-placeholder-shown:bg-elembg w-full rounded-xl border border-transparent bg-neutral-50 px-5 outline-2 -outline-offset-2 outline-transparent transition-colors duration-300 not-placeholder-shown:border-neutral-200 placeholder:text-neutral-300 hover:border-neutral-200";

export type InputBaseProps = { label?: string };
export type InputProps = Omit<RefProps<"input">, "className"> & InputBaseProps;
export type AreaProps = Omit<RefProps<"textarea">, "className"> &
  InputBaseProps;

function Wrapper({ id, label, children }: RefProps<"div"> & InputBaseProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={id}>{label}</label>}
      {children}
    </div>
  );
}

export function Input({ id, label, placeholder, ...props }: InputProps) {
  return (
    <Wrapper id={id} label={label}>
      <input
        id={id}
        placeholder={placeholder?.trim() ?? ""}
        className={`${GENERAL_STYLE} h-12 py-0`}
        {...props}
      />
    </Wrapper>
  );
}

export function TextArea({ id, label, placeholder, ...props }: AreaProps) {
  return (
    <Wrapper id={id} label={label}>
      <textarea
        id={id}
        placeholder={placeholder?.trim() ?? ""}
        className={`${GENERAL_STYLE} block field-sizing-content min-h-[5lh] resize-none py-3 font-normal tracking-wide`}
        {...props}
      />
    </Wrapper>
  );
}
