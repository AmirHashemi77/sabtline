import { ChangeEvent } from "react";

interface IProps {
  placeHolder: string;
  customClassName: string;
  typeOfTitle: "Placeholder" | "Label";
  value: string | number;
  isRequired: boolean;
  name: string;

  onChange?: (e: ChangeEvent<HTMLInputElement> | string | null | undefined) => void;
  onInput?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function NumberInput({ placeHolder, value, customClassName, isRequired, typeOfTitle, name, onChange, onInput }: IProps) {
  return (
    <div className={`w-full relative flex ${customClassName}`}>
      <input
        type="number"
        onChange={onChange}
        onInput={onInput}
        name={name}
        placeholder={typeOfTitle === "Placeholder" ? placeHolder : ""}
        className={`bg-white peer py-[9px] md:py-3 w-full rounded-lg  
                px-1 appearance-none text-[12px] sm:text-sm border border-gray-300  outline-0 text-center focus:outline-0 ${customClassName}`}
      />

      {typeOfTitle === "Label" && (
        <label
          className={`absolute right-1 flex font-normal transition-all text-gray-600 ${
            value ? " bg-white -top-2 text-[14px] px-1" : "py-0.5 top-2 text-[12px]"
          } w-fit peer-focus:-top-2 peer-focus:text-[10px] peer-focus:px-1 peer-focus: bg-white`}
        >
          {placeHolder}
          {isRequired ? <div className={"mx-2 text-red-500 text-md"}>*</div> : null}
        </label>
      )}
    </div>
  );
}
