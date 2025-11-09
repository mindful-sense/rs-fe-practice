import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "focus:outline-accent disabled:bg-accent-disabled flex h-9 w-auto cursor-pointer items-center justify-center rounded-lg px-4 text-center text-sm text-black outline-2 outline-offset-2 outline-transparent transition-colors duration-300",
  {
    variants: {
      intent: {
        primary: "hover:bg-accent bg-black text-white",
        secondary: "",
        inline:
          "hover:text-accent focus:text-accent inline px-0 focus:outline-transparent",
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

type BaseProps = VariantProps<typeof buttonVariants>;

interface ButtonProps extends ComponentPropsWithoutRef<"button">, BaseProps {
  href?: string;
}

interface LinkProps
  extends Omit<ComponentPropsWithoutRef<"a">, "href">,
    BaseProps {
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
