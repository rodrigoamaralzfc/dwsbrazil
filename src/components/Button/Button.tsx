import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: "primary" | "secondary";
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  function Button({ className, variant, ...rest }, ref) {
    return (
      <button
        ref={ref}
        className={clsx(
          styles.button,
          variant === "primary" && styles.primary,
          variant === "secondary" && styles.secondary,
          className,
        )}
        {...rest}
      />
    );
  },
);
