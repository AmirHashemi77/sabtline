import type { FC } from "react";
import type { FieldError } from "react-hook-form";

interface IProps {
  error: FieldError | undefined;
  className?: string;
}

const ErrorMessage: FC<IProps> = ({ error, className }) => {
  return <>{error?.message ? <span className={className ?? "text-xs text-red-700 mt-2"}>{error.message}</span> : null}</>;
};

export default ErrorMessage;
