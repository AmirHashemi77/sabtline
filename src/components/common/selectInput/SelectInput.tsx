import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import type { FC } from "react";

interface IProps {
  className: string;
  placeholder: string;
  items: { label: string; value: string }[];
}

const SelectInput: FC<IProps> = ({ className, items, placeholder }) => {
  return (
    <Select>
      <SelectTrigger
        className={`h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-right placeholder:text-sm md:placeholder:text-md placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  ${className}`}
      >
        <SelectValue className="text-right text-sm md:text-md text-muted-foreground" placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default SelectInput;
