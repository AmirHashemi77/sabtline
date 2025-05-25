// import React, { useRef, type ChangeEvent, type ChangeEventHandler } from "react";
// import DatePicker, { DateObject } from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persianFa from "react-date-object/locales/persian_fa";
// import { Button } from "../../ui/button";

// interface IProps {
//   value?: string | number;
//   onChange?: (e: ChangeEvent<HTMLInputElement> | string | ChangeEventHandler<HTMLTextAreaElement> | null | undefined) => void;
//   onClick?: () => void;
//   className?: string;
//   buttonTitle?: string;
//   withButton?: boolean;
//   placeholder: string;
//   name?: string;
//   maxLength?: number;
//   disabledButton?: boolean;
//   disabledInput?: boolean;
//   onBeforeInput?: (event: ChangeEvent<HTMLInputElement>) => void;
//   type?: string;
//   pattern?: string;
//   customClassName?: string;
//   isTextArea?: boolean;
//   isDatePicker?: boolean;
//   important?: boolean;
// }

// const CustomInput = ({
//   value,
//   className,
//   onChange,
//   onClick,
//   buttonTitle,
//   withButton,
//   name,
//   placeholder,
//   maxLength,
//   disabledButton,
//   onBeforeInput,
//   disabledInput = false,
//   type,
//   pattern,
//   customClassName,
//   isTextArea,
//   isDatePicker,
//   important,
// }: IProps) => {
//   const handleNumberInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { value } = e.target;
//     if (value.length <= (maxLength || Infinity)) {
//       onChange!(e);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//     }
//   };

//   const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
//   return (
//     <div className={`w-full relative flex ${className} ${isTextArea ? "h-auto" : ""} ${customClassName ? customClassName : ""}`}>
//       {isDatePicker ? (
//         <DatePicker
//           style={{ direction: "ltr" }}
//           calendar={persian}
//           name={name}
//           type={type}
//           maxDate={maxLength}
//           containerClassName={"w-full"}
//           inputClass={"`peer px-1 py-[9px] md:py-3 w-full rounded-lg text-[13px] sm:text-sm border border border-gray-300   bg-white focus:outline-0 "}
//           locale={persianFa}
//           className={"w-full"}
//           format="YYYY/MM/DD"
//           value={
//             value
//               ? new DateObject({
//                   date: value,
//                   calendar: persian,
//                   locale: persianFa,
//                 })
//               : null
//           }
//           onChange={(date: DateObject | null) => {
//             if (date instanceof DateObject) {
//               const isoString = date.toDate().toISOString();
//               onChange!(isoString);
//             } else {
//               onChange!(null);
//             }
//           }}
//         />
//       ) : isTextArea ? (
//         <textarea
//           ref={inputRef as React.RefObject<HTMLTextAreaElement>}
//           // onBeforeInput={
//           //   onBeforeInput as (event: ChangeEvent<HTMLInputElement>) => void
//           // }
//           onKeyDown={handleKeyDown}
//           className={`peer py-[9px] md:py-3 ${withButton ? "rounded-tr-lg rounded-br-lg rounded-none" : "rounded-lg"} ${disabledInput ? "disabled" : ""}
//            text-[13px] sm:text-sm border  border-gray-300 w-full  bg-white  outline-none  px-3 `}
//           placeholder=""
//           name={name}
//           value={value}
//           onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
//             onChange!(event as unknown as ChangeEvent<HTMLInputElement>);
//           }}
//           maxLength={type === "number" ? maxLength : undefined}
//           rows={4}
//         />
//       ) : (
//         <input
//           dir={type === "number" || type === "shiba" ? "ltr" : "rtl"}
//           ref={inputRef as React.RefObject<HTMLInputElement>}
//           onBeforeInput={onBeforeInput}
//           onKeyDown={handleKeyDown}
//           className={` bg-white peer py-[9px] md:py-3 w-full ${withButton ? "rounded-tr-lg rounded-br-lg rounded-none" : "rounded-lg"} ${disabledInput ? "disabled" : ""}
//           ${type === "number" || type === "shiba" ? "px-2" : "px-1"} appearance-none text-[12px] sm:text-sm border border-gray-300  outline-0 focus:outline-0 ${
//             customClassName ? customClassName : ""
//           } `}
//           placeholder=""
//           name={name}
//           type={type}
//           pattern={pattern}
//           value={value}
//           onChange={type === "number" ? handleNumberInputChange : onChange}
//           maxLength={maxLength}
//         />
//       )}
//       {withButton && <Button variant="InputClass" label={buttonTitle!} onClick={onClick!} type={"button"} disabled={disabledButton} />}
//       {/* Label for DatePicker */}
//       {isDatePicker && (
//         <label
//           className={`absolute right-1 flex font-normal transition-all  text-gray-800 ${
//             value ? "  bg-white  -top-2 text-[10px] px-1" : "py-0.5 top-2 text-[12px]"
//           } w-fit peer-focus:-top-2 peer-focus:text-[10px] peer-focus:px-1 peer-focus: bg-white `}
//         >
//           {placeholder}
//           {important ? <div className={"mx-2 text-red-500 text-[14px]"}>*</div> : null}
//         </label>
//       )}
//       {/* Label for other input types */}
//       {!isDatePicker && (
//         <label
//           className={`absolute right-1 flex font-normal transition-all text-gray-800 ${
//             value ? " bg-white -top-2 text-[14px] px-1" : "py-0.5 top-2 text-[12px]"
//           } w-fit peer-focus:-top-2 peer-focus:text-[10px] peer-focus:px-1 peer-focus: bg-white `}
//         >
//           {placeholder}
//           {important ? <div className={"mx-2 text-red-500 text-md"}>*</div> : null}
//         </label>
//       )}
//     </div>
//   );
// };

// export default CustomInput;
