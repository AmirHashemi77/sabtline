import { ChangeEvent, useRef, useState, MouseEvent } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IoChevronDownSharp } from "react-icons/io5";

interface IProps<T extends FieldValues> {
  placeHolder: string;
  customClassName: string;
  typeOfTitle: "Placeholder" | "Label";
  value: string | number;
  register?: UseFormRegister<T>;
  isRequired: boolean;
  name: string;
  option: { label: string; value: string }[];
  onChange?: (e: ChangeEvent<HTMLInputElement> | string | null | undefined) => void;
}

export default function SelectInput<T extends FieldValues>({ placeHolder, customClassName, name, onChange, option = [], register }: IProps<T>) {
  const [isOpenList, setIsOpenList] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const changeInputValue = (e: MouseEvent<HTMLLIElement>) => {
    const value = (e.target as HTMLInputElement).innerText;
    if (inputRef.current) {
      inputRef.current.value = value;
      setIsOpenList(false);
    }
  };

  return (
    <>
      {isOpenList && <div onClick={() => setIsOpenList(false)} className="w-full h-full absolute top-0 right-0"></div>}
      <div className={`w-full relative flex ${customClassName}`}>
        {/* @ts-expect-error disable name error*/}
        <input
          {...(register && register(name))}
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          readOnly
          onClick={() => setIsOpenList(true)}
          onChange={onChange}
          name={name}
          placeholder={placeHolder}
          className={`cursor-pointer bg-white peer py-[9px] md:py-3 w-full rounded-lg  
                px-1 appearance-none text-[12px] sm:text-sm border border-gray-300  outline-0 focus:outline-0 ${customClassName}`}
        />

        <div className="absolute top-1/2 left-1  -translate-y-1/2">
          <IoChevronDownSharp className="text-gray-800" />
        </div>

        {isOpenList && (
          <ul className="absolute top-full right-0 w-full shadow-lg bg-white rounded-md z-10 max-h-36 overflow-y-auto custom-scrollbar">
            {" "}
            {option?.map((item) => {
              return (
                <li
                  key={item.value}
                  value={item.value}
                  onClick={(e) => changeInputValue(e)}
                  className="text-right px-2 py-3 border-b text-xs border-gray-200 w-full text-gray-800 cursor-pointer hover:text-white hover:bg-primary transition-all"
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
