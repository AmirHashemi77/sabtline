import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function PreviousInquiriesList({ children }: IProps) {
  return (
    <div className="col-span-2 row-span-1 bg-white max-h-72  border-l-4  border-l-primary rounded-lg pt-6 pb-14 px-10 my-5 max-w-5xl sm:w-[90%] w-full">
      <div className="flex flex-col items-start gap-5">
        <h4 className="text-gray-800 self-start">استعلام های قبلی</h4>
        <div className="flex flex-col items-center gap-6 w-full max-h-48 overflow-y-auto custom-scrollbar ">{children}</div>
      </div>
    </div>
  );
}
