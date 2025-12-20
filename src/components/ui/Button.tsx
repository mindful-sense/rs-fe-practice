import type { ComponentProps, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { RoutePath } from "@/lib/shared";

import Link from "next/link";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const btnVariants = cva(
  "focus:outline-accent disabled:bg-accent-disabled flex h-9 w-auto cursor-pointer items-center justify-center rounded-lg px-4 text-center text-sm text-black outline-2 outline-offset-2 outline-transparent transition-colors duration-300",
  {
    variants: {
      intent: {
        primary: "hover:bg-accent bg-black text-white",
        secondary:
          "hover:border-accent gap-2 border border-black hover:bg-accent hover:text-white",
        inline:
          "hover:text-accent focus:text-accent inline-flex h-auto gap-1 px-0 focus:outline-transparent",
      },
      size: { full: "w-full h-12 rounded-xl text-base" },
      decoration: { underline: "underline" },
    },
    defaultVariants: { intent: "primary" },
  },
);

interface BaseProps extends VariantProps<typeof btnVariants> {
  leftIcon?: IconDefinition;
  rightIcon?: IconDefinition;
  iconstyles?: string;
}

function Content({
  children,
  leftIcon,
  rightIcon,
  iconstyles,
}: BaseProps & { children: ReactNode }) {
  return (
    <>
      {leftIcon && <FontAwesomeIcon icon={leftIcon} className={iconstyles} />}
      {children}
      {rightIcon && <FontAwesomeIcon icon={rightIcon} className={iconstyles} />}
    </>
  );
}

export function Button({
  intent,
  size,
  decoration,
  className,
  leftIcon,
  rightIcon,
  iconstyles,
  children,
  ...props
}: ComponentProps<"button"> & BaseProps) {
  const classes = twMerge(btnVariants({ intent, size, decoration, className }));
  return (
    <button className={classes} {...props}>
      <Content
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        iconstyles={iconstyles}
      >
        {children}
      </Content>
    </button>
  );
}

export function LinkButton({
  intent,
  size,
  decoration,
  className,
  leftIcon,
  rightIcon,
  iconstyles,
  children,
  ...props
}: ComponentProps<typeof Link> & BaseProps & { href: RoutePath }) {
  const classes = twMerge(btnVariants({ intent, size, decoration, className }));
  return (
    <Link className={classes} {...props}>
      <Content
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        iconstyles={iconstyles}
      >
        {children}
      </Content>
    </Link>
  );
}
