import DatePicker, { DateObject, type Value } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
// eslint-disable-next-line camelcase
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { CiCalendar } from "react-icons/ci";
import { useThemeStore } from "../../../store/theme/store";
import type { FC } from "react";

interface IProps {
  value: Value;
  onChange?: (
    date: DateObject | null,
    options: {
      validatedValue: string | string[];
      input: HTMLElement;
      isTyping: boolean;
    }
  ) => void | false;
  className?: string;
  placeholder: string;
  format?: string;
  maxDate?: string | number | Date | DateObject | undefined;
  disabled?: boolean;
  readOnly?: boolean;
}

const DatePickerComponent: FC<IProps> = ({ value, onChange, className, placeholder, format, maxDate, disabled = false, readOnly = false }) => {
  const { theme } = useThemeStore();
  return (
    <>
      <DatePicker
        value={value}
        onChange={onChange}
        className={`${className} flex-1 py-2 rmdp-mobile ${theme === "dark" && "bg-dark"}`}
        placeholder={placeholder}
        containerClassName={"w-full"}
        inputClass={
          "flex h-10 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-4 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-0 focus:border-[3px] focus:border-primary focus:shadow-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-card-foreground dark:disabled:border-card-foreground dark:disabled:border-text-foreground"
        }
        format={format ? format : `YYYY/MM/DD`}
        calendar={persian}
        maxDate={maxDate}
        /*eslint-disable-next-line camelcase */
        locale={persian_fa}
        disabled={disabled}
        readOnly={readOnly}
      />
      <CiCalendar className="absolute left-3 top-[7px] cursor-pointer text-2xl z-10 bg-white dark:bg-card dark:text-card-foreground" />
    </>
  );
};

export default DatePickerComponent;
