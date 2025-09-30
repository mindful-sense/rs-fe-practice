import { type VariantProps, cva } from "class-variance-authority";
import { type ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "font-sm h-10 cursor-pointer rounded-lg px-4 font-medium text-black transition duration-500",
  {
    variants: {
      intent: {
        primary: "hover:bg-accent bg-black text-white",
        secondary: "",
        inline: "hover:text-accent px-0",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  },
);

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, intent, ...props }: Props) {
  return (
    <button
      className={twMerge(buttonVariants({ intent, className }))}
      {...props}
    />
  );
}
