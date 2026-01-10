import { type ComponentPropsWithRef } from "react";

export function Input({
  label,
  ...props
}: Omit<ComponentPropsWithRef<"input">, "className"> & {
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label>
        {label}
        <input
          className={`focus:outline-accent h-12 w-full rounded-xl border border-transparent bg-neutral-50/70 px-5 outline-2 -outline-offset-2 outline-transparent transition-colors duration-300 not-placeholder-shown:border-neutral-300 not-placeholder-shown:bg-white/70 placeholder:text-neutral-400 hover:border-neutral-300`}
          {...props}
        />
      </label>
    </div>
  );
}
