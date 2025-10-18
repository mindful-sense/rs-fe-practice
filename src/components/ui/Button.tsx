import { type VariantProps, cva } from "class-variance-authority";
import { type ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva(
  "focus:outline-accent h-10 w-auto cursor-pointer rounded-lg px-4 text-sm font-medium text-black outline-2 outline-offset-2 outline-transparent transition-colors duration-300",
  {
    variants: {
      intent: {
        primary: "hover:bg-accent bg-black text-white",
        secondary: "",
        inline:
          "hover:text-accent focus:text-accent px-0 focus:outline-transparent",
      },
      size: {
        full: "w-full h-12 rounded-xl text-base",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  },
);

export function Button({ className, intent, size, ...props }: Props) {
  return (
    <button
      className={twMerge(buttonVariants({ intent, size, className }))}
      {...props}
    />
  );
}
