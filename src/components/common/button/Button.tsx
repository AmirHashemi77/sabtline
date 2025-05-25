import type { ReactNode } from "react";

interface IProps {
  variant: "primary" | "secondary" | "danger" | "succsses" | "outlinePrimary" | "outlineSecondary" | "outlineDanger" | "outlineSuccsses" | "InputClass";
  type: "submit" | "button";
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  customClassName?: string;
}

const CustomButton = ({ variant, type, label, icon, onClick, loading, disabled, customClassName }: IProps) => {
  const classNameCreator = (): string => {
    let finalClassName = `${disabled && disabled ? "disabled" : "enable"} rounded-md py-3  px-2 ${customClassName} `;
    if (variant === "primary") {
      finalClassName += "bg-primary hover:opacity-95 transition-opacity";
    } else if (variant === "secondary") {
      finalClassName += "bg-gray-500 hover:opacity-95 transition-opacity";
    } else if (variant === "danger") {
      finalClassName += "bg-red-600 hover:opacity-95 transition-opacity";
    } else if (variant === "succsses") {
      finalClassName += "bg-green-600 hover:opacity-95 transition-opacity";
    } else if (variant === "outlinePrimary") {
      finalClassName += "bg-transparent border-primary border-2";
    } else if (variant === "outlineSecondary") {
      finalClassName += "bg-transparent border-gray-500 border-2";
    } else if (variant === "outlineDanger") {
      finalClassName += "bg-transparent border-red-600 border-2";
    } else if (variant === "outlineSuccsses") {
      finalClassName += "bg-transparent border-green-600 border-2";
    }

    return finalClassName;
  };

  const loadingIconCreator = () => {
    return <div className="w-6 h-6 rounded-xl animate-spin border-2 border-gray-400 border-t-gray-800"></div>;
  };

  return (
    <button type={type} onClick={onClick} className={classNameCreator()}>
      {loading && loadingIconCreator()}

      {!loading && (
        <div className="flex justify-center items-center w-full">
          {icon && <div className="mx-1">{icon}</div>}
          <div
            className={`text-center text-sm md:text-base w-full ${variant === "outlinePrimary" && "text-primary"} ${variant === "outlineSecondary" && "text-gray-600"} ${
              variant === "outlineDanger" && "text-red-600"
            } ${variant === "outlineSuccsses" && "text-green-600"} ${variant === "secondary" || variant === "primary" || variant === "danger" || variant === "succsses" ? "text-white" : ""} `}
          >
            {label}
          </div>
        </div>
      )}
    </button>
  );
};

export default CustomButton;
