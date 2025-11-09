import { type ComponentPropsWithoutRef } from "react";

export function Input({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"input">) {
  return (
    <div className="flex flex-col gap-1">
      <label>
        {children}
        <input
          {...props}
          className={`focus:outline-accent h-12 w-full rounded-xl border border-transparent bg-neutral-50/70 px-5 outline-2 -outline-offset-2 outline-transparent transition-colors duration-300 placeholder:text-neutral-200 hover:border-neutral-100 [&:not(:placeholder-shown)]:border-neutral-100 [&:not(:placeholder-shown)]:bg-white/70 ${className || ""}`}
        />
      </label>
    </div>
  );
}
