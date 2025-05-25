import type { FC } from "react";
import StepCircle from "./StepCircle";

interface IProps {
  title: string;
  active?: boolean;
}

const Step: FC<IProps> = ({ title, active }) => {
  return (
    <>
      <li className={`flex md:w-full items-center justify-center ${active ? "text-blue-600 dark:text-blue-500 " : "dark:after:border-gray-700"} `}>
        {/*sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10*/}
        <span className="flex items-center justify-center text-sm after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
          {active && <StepCircle />}
          {title}
        </span>
      </li>
    </>
  );
};

export default Step;
