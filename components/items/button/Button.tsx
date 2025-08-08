import clsx from "clsx";
import { FC } from "react";

type Props = {
  children: React.ReactNode;
  type?: "button" | "submit";
  color?: "lime" | "danger" | "rose" | "violet";
  clickHandler?: () => void;
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
};

export const Button: FC<Props> = ({
  children,
  type = "submit",
  color = "lime",
  clickHandler,
  size = "md",
  isDisabled,
}) => {
  const buttonClassName = clsx(
    "rounded",
    "hover:opacity-80",
    color === "lime" && "bg-lime-600",
    color === "danger" && "bg-danger-500",
    color === "rose" && "bg-rose-500",
    color === "violet" && "bg-violet-500",
    "text-white",
    size === "sm" && "p-2 text-sm",
    size === "md" && "px-4 py-2 text-base",
    size === "lg" && "px-10 py-3 text-lg",
    isDisabled && "cursor-not-allowed opacity-50"
  );

  return (
    <button
      type={type}
      className={buttonClassName}
      onClick={clickHandler}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
