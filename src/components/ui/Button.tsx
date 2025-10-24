import { type VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "focus:outline-accent flex h-10 w-auto cursor-pointer items-center rounded-lg px-4 text-sm font-medium text-black outline-2 outline-offset-2 outline-transparent transition-colors duration-300",
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

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    VariantProps<typeof buttonVariants> {
  href: string;
}

export function Button({
  className,
  intent,
  size,
  ...props
}: ButtonProps | LinkProps) {
  const classes = twMerge(buttonVariants({ intent, size, className }));

  if (props.href) {
    const { href, ...rest } = props as LinkProps;
    return <Link href={href} className={classes} {...rest} />;
  }

  return <button className={classes} {...(props as ButtonProps)} />;
}
