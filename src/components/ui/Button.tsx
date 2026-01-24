import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { RoutePath } from "@/lib/shared";

import Link from "next/link";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const btnVariants = cva(
  "focus:outline-accent disabled:bg-accent-disabled hover:bg-accent flex h-9 w-auto cursor-pointer items-center justify-center rounded-lg px-4 text-center text-sm text-black outline-2 outline-offset-2 outline-transparent transition-colors duration-300",
  {
    variants: {
      intent: {
        primary: "bg-black text-white",
        secondary:
          "hover:border-accent gap-2 border border-neutral-100 hover:text-white",
        inline:
          "hover:text-accent focus:text-accent inline-flex h-auto gap-1 px-0 hover:bg-transparent focus:outline-transparent",
      },
      size: { full: "w-full h-12 rounded-xl text-base" },
      decoration: { underline: "underline" },
    },
    defaultVariants: { intent: "primary" },
  },
);

interface BaseProps extends VariantProps<typeof btnVariants> {
  text: string;
  leftIcon?: IconDefinition;
  rightIcon?: IconDefinition;
  iconstyles?: string;
}

function Content({ text, leftIcon, rightIcon, iconstyles }: BaseProps) {
  return (
    <>
      {leftIcon && <FontAwesomeIcon icon={leftIcon} className={iconstyles} />}
      {text}
      {rightIcon && <FontAwesomeIcon icon={rightIcon} className={iconstyles} />}
    </>
  );
}

export function Button({
  text,
  intent,
  size,
  decoration,
  leftIcon,
  rightIcon,
  iconstyles,
  className,
  ...props
}: ComponentProps<"button"> & BaseProps) {
  const classes = twMerge(btnVariants({ intent, size, decoration, className }));
  return (
    <button className={classes} {...props}>
      <Content
        text={text}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        iconstyles={iconstyles}
      />
    </button>
  );
}

export function LinkButton({
  text,
  intent,
  size,
  decoration,
  leftIcon,
  rightIcon,
  iconstyles,
  className,
  ...props
}: { href: RoutePath } & ComponentProps<typeof Link> & BaseProps) {
  const classes = twMerge(btnVariants({ intent, size, decoration, className }));
  return (
    <Link className={classes} {...props}>
      <Content
        text={text}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        iconstyles={iconstyles}
      />
    </Link>
  );
}
