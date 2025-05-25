import { useThemeStore } from "../../../store/theme/store";

const LoadingContent = () => {
  const { theme } = useThemeStore();

  return (
    <div className="z-[10001] absolute top-[50%] left-[50%] translate-x-[-50%] translate-Y-[-50%] flex items-center justify-between flex-col">
      <img src={theme === "light" ? "/images/loading.svg" : "/images/loading-dark.svg"} alt="loading" width="90" height="90" />
      لطفا چند لحظه صبر کنید ...
    </div>
  );
};

export default LoadingContent;
