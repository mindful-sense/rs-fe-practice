import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import Link from "next/link";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const btnVariants = cva("rounded-full border border-neutral-200", {
  variants: {
    intent: {
      button:
        "focus:outline-accent hover:bg-accent hover:border-accent disabled:text-accent-disabled flex size-8 cursor-pointer items-center justify-center outline-2 outline-offset-2 outline-transparent transition-colors duration-300 hover:text-white disabled:cursor-not-allowed disabled:border-none disabled:bg-transparent disabled:outline-none",
      info: "flex h-8 items-center gap-1 px-2.5",
    },
    color: {
      danger:
        "focus:outline-danger text-danger border-danger hover:bg-danger hover:border-danger",
    },
    size: {
      md: "hover:text-danger hover:outline-danger size-6 hover:bg-transparent",
    },
    border: {
      none: "border-none",
    },
    rounded: {
      semi: "rounded-lg",
    },
  },
});

export type ChipVariantProps = VariantProps<typeof btnVariants>;

interface BaseProps extends ChipVariantProps {
  text?: string;
  icon?: IconDefinition;
  iconstyles?: string;
}

export function ChipButton({
  color,
  size,
  border,
  rounded,
  icon,
  iconstyles,
  className,
  ...props
}: ComponentProps<"button"> & BaseProps) {
  const classes = twMerge(
    btnVariants({ intent: "button", color, size, border, rounded, className }),
  );
  return (
    <button className={classes} {...props}>
      {icon && <FontAwesomeIcon icon={icon} className={iconstyles} />}
    </button>
  );
}

export function ChipLinkButton({
  color,
  size,
  border,
  rounded,
  icon,
  iconstyles,
  className,
  ...props
}: ComponentProps<typeof Link> & BaseProps) {
  const classes = twMerge(
    btnVariants({ intent: "button", color, size, border, rounded, className }),
  );
  return (
    <Link className={classes} {...props}>
      {icon && <FontAwesomeIcon icon={icon} className={iconstyles} />}
    </Link>
  );
}

export function ChipInfo({
  text,
  icon,
  iconstyles,
  className,
}: { className?: string } & BaseProps) {
  const classes = twMerge(btnVariants({ intent: "info", className }));
  return (
    <div className={classes}>
      {icon && <FontAwesomeIcon icon={icon} className={iconstyles} />}
      {text}
    </div>
  );
}
