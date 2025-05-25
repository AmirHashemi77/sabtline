import type { FC } from "react";
import { useThemeStore } from "../../../store/theme/store";

interface ILoading {
  isPending?: boolean;
  customPendingMessage?: string;
}

const ResponseLoading: FC<ILoading> = ({ customPendingMessage, isPending }) => {
  const message = <p className="text-center text-sm ">{customPendingMessage ?? "لطفا چند لحظه صبر کنید ..."}</p>;

  const { theme } = useThemeStore();
  return (
    <>
      {isPending && (
        <>
          <div className="z-[10000] flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden bg-loading dark:bg-background"></div>
          <div className="z-[10001] absolute top-[50%] left-[50%] translate-x-[-50%] translate-Y-[-50%] flex items-center justify-between flex-col">
            <img src={theme === "light" ? "/images/loading.svg" : "/images/loading-dark.svg"} alt="loading" width="90" height="90" />
            {message}
          </div>
        </>
      )}
    </>
  );
};

export default ResponseLoading;
