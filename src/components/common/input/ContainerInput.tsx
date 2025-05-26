import type { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const ContainerInput: FC<IProps> = ({ children }) => {
  return <div className="flex flex-col justify-between w-full mb-5">{children}</div>;
};

export default ContainerInput;
