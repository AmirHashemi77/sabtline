import type { ChangeEvent } from "react";

interface IProps {
  title: string;
  id: string;
  value: string;
  checked: boolean;
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement> | string | null | undefined) => void;
}

export default function RadioButton({ title, id, value, name, onChange, checked }: IProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <label className="text-xs text-gray-800 text-center">{title}</label>
      <input checked={checked} id={id} name={name} value={value} onChange={onChange} className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary" type="radio" />
    </div>
  );
}
