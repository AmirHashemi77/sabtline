import type { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const Stepper: FC<IProps> = ({ children }) => {
  return (
    <>
      <ol className="border-b border-b-gray-500 p-3 flex max-sm:flex-wrap flex-row items-center justify-around w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base mt-5 relative gap-5 bg-white dark:bg-card">
        {children}
        {/* <span
                    className='h-1 w-full border-b border-b-gray-500 border-r-0 border-t-0 border-l-0 absolute top-[160%]'/>*/}
      </ol>
    </>
  );
};

export default Stepper;
