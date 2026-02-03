import { type ComponentPropsWithRef } from "react";

interface Props extends Omit<ComponentPropsWithRef<"input">, "className"> {
  label: string;
}

export function Input({ label, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label>
        {label}
        <input
          className={`focus:outline-accent not-placeholder-shown:bg-elembg h-12 w-full rounded-xl border border-transparent bg-neutral-50 px-5 outline-2 -outline-offset-2 outline-transparent transition-colors duration-300 not-placeholder-shown:border-neutral-200 placeholder:text-neutral-300 hover:border-neutral-200`}
          {...props}
        />
      </label>
    </div>
  );
}
