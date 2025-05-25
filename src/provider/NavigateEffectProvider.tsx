//makes the component client so we can use hooks

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const NavigateEffect = () => {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setProgress(60);
    setHidden(false);

    const timer = setTimeout(() => {
      setProgress(100);

      setTimeout(() => {
        setHidden(true);
        setProgress(0);
      }, 200);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={`h-[5px] z-[10000] bg-blur-400 absolute bottom-[-2px] transition-all duration-300 ${hidden ? "opacity-0 w-0" : "opacity-100 w-full z-[70]"}`}
      style={{
        width: `${progress}%`,
        transition: progress === 100 ? "none" : "width 0.3s ease-in-out",
      }}
    />
  );
};

export default NavigateEffect;
