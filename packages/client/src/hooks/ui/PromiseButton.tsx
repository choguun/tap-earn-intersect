/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

type Props = {
  className?: string;
  buttonType: "primary" | "secondary" | "tertiary" | "danger";
  size?: "lg" | "md";
  children: React.ReactNode;
  disabled?: boolean;
  promise: () => Promise<unknown>;
};

export function PromiseButton({ size, buttonType, disabled, className, children, promise }: Props) {
  const [pending, setPending] = React.useState(false);
  const onClick = async () => {
    if (pending) return;

    setPending(true);

    try {
      await promise();
    } catch (e) {
      console.error(e);
    } finally {
      setPending(false);
    }
  };

  return (
    <button disabled={disabled || pending} className={className} onClick={onClick}>
      {pending ? "Pending..." : children}
    </button>
  );
}
