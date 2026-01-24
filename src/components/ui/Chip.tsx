import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const btnVariants = cva("rounded-full border border-neutral-200", {
  variants: {
    intent: {
      button:
        "focus:outline-accent hover:bg-accent hover:border-accent disabled:text-accent-disabled size-8 cursor-pointer outline-2 outline-offset-2 outline-transparent transition-colors duration-300 hover:text-white disabled:cursor-not-allowed disabled:border-none disabled:bg-transparent disabled:outline-none",
      info: "flex h-8 items-center gap-1 px-2.5",
    },
    size: {
      md: "size-6",
    },
    border: {
      none: "border-none",
    },
    rounded: {
      semi: "rounded-lg",
    },
    color: {
      danger:
        "focus:outline-danger text-danger border-danger hover:bg-danger hover:border-danger",
    },
  },
});

interface BaseProps extends VariantProps<typeof btnVariants> {
  text?: string;
  icon?: IconDefinition;
  iconstyles?: string;
}

export function ChipButton({
  size,
  border,
  rounded,
  color,
  icon,
  iconstyles,
  className,
  ...props
}: Omit<ComponentProps<"button">, "type"> & BaseProps) {
  const classes = twMerge(
    btnVariants({ intent: "button", size, border, rounded, color, className }),
  );
  return (
    <button type="button" className={classes} {...props}>
      {icon && <FontAwesomeIcon icon={icon} className={iconstyles} />}
    </button>
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
