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
        inline:
          "hover:text-accent focus:text-accent inline-flex px-0 focus:outline-transparent",
      },
      size: {
        full: "w-full h-12 rounded-xl text-base",
      },
      decoration: {
        underline: "underline",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  },
);

type BaseProps = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "className">,
    BaseProps {
  href?: never;
}

interface LinkProps
  extends Omit<ComponentPropsWithoutRef<"a">, "href" | "className">,
    BaseProps {
  href: string;
}

type Props = ButtonProps | LinkProps;

const isLinkProps = (props: Props): props is LinkProps =>
  "href" in props && typeof props.href === "string";

export function Button(props: Props) {
  const { intent, size, decoration } = props;
  const classes = twMerge(buttonVariants({ intent, size, decoration }));

  if (isLinkProps(props)) {
    return <Link className={classes} {...props} />;
  }

  return <button className={classes} {...props} />;
}
