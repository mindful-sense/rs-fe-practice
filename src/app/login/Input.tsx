import { type ReactNode } from "react";
import { type InputType } from "./types";

interface Props {
  id: string;
  type: InputType;
  placeholder?: string | undefined;
  children: ReactNode;
}

export function Input({ id, type, placeholder, children }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-medium">
        {children}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="focus:outline-accent h-12 rounded-xl border border-neutral-50 bg-white px-5 font-medium outline-2 outline-offset-2 outline-transparent transition-colors duration-300"
      />
    </div>
  );
}
