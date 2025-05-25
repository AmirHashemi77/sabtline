import type { ReactNode } from "react";

interface IProps {
  title: string;
  subTitle: string;
  children: ReactNode;
}

export default function ServiceFormContainer({ title, subTitle, children }: IProps) {
  return (
    <div className="col-span-4 row-span-1 bg-white rounded-lg pt-6 pb-14 px-4 md:px-10 my-5 max-w-5xl sm:w-[90%] w-full">
      <div className="flex flex-col items-start gap-3">
        <h4 className="text-gray-800 self-start lg:text-2xl lg:mb-3">{title}</h4>
        <p className="text-gray-500 text-sm text-start">{subTitle}</p>
        {children}
      </div>
    </div>
  );
}
