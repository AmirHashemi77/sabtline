import type { FC } from "react";
import LoadingContent from "../components/common/responseLoading/LoadingContent";

const Loading: FC = () => {
  return (
    <>
      <div className="z-[10000] flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden bg-loading dark:bg-background"></div>
      <LoadingContent />
    </>
  );
};

export default Loading;
