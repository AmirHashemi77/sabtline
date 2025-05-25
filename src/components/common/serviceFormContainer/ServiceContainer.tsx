import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function ServiceContainer({ children }: IProps) {
  return <div className="flex flex-col  md:grid md:grid-cols-6 md:grid-rows-1 items-center gap-5">{children}</div>;
}
