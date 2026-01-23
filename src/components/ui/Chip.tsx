import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const btnVariants = cva("rounded-full border border-neutral-200", {
  variants: {
    intent: {
      btnDefault:
        "focus:outline-accent hover:bg-accent hover:border-accent size-8 cursor-pointer rounded-full border border-neutral-200 outline-2 outline-offset-2 outline-transparent transition-colors duration-300 hover:text-white",
      btnDanger:
        "focus:outline-danger text-danger border-danger hover:bg-danger hover:border-danger size-8 cursor-pointer rounded-full border outline-2 outline-offset-2 outline-transparent transition-colors duration-300 hover:text-white",
      info: "flex h-8 items-center gap-1 px-2.5",
    },
  },
  defaultVariants: { intent: "btnDefault" },
});

interface BaseProps extends VariantProps<typeof btnVariants> {
  icon?: IconDefinition;
  iconstyles?: string;
}

export function ChipButton({
  intent,
  icon,
  iconstyles,
  className,
  ...props
}: Omit<ComponentProps<"button">, "type"> & BaseProps) {
  const classes = twMerge(btnVariants({ intent, className }));
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
}: { text: string; className?: string } & BaseProps) {
  const classes = twMerge(btnVariants({ intent: "info", className }));
  return (
    <div className={classes}>
      {icon && <FontAwesomeIcon icon={icon} className={iconstyles} />}
      {text}
    </div>
  );
}
