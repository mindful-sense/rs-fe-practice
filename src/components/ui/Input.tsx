import { type ComponentPropsWithoutRef } from "react";

export function Input({
  children,
  ...props
}: Omit<ComponentPropsWithoutRef<"input">, "className">) {
  return (
    <div className="flex flex-col gap-1">
      <label>
        {children}
        <input
          className={
            "focus:outline-accent h-12 w-full rounded-xl border border-transparent bg-neutral-50/70 px-5 outline-2 -outline-offset-2 outline-transparent transition-colors duration-300 not-placeholder-shown:border-neutral-100 not-placeholder-shown:bg-white/70 placeholder:text-neutral-200 hover:border-neutral-100"
          }
          {...props}
        />
      </label>
    </div>
  );
}
