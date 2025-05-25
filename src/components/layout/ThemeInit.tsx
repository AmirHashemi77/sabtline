import { useLayoutEffect } from "react";
import { useThemeStore } from "../../store/theme/store";

export default function ThemeInit() {
  const setTheme = useThemeStore((state) => state.setTheme);

  useLayoutEffect(() => {
    const storedTheme = (typeof window !== "undefined" && (localStorage.getItem("theme") as "light" | "dark")) || "light";
    setTheme(storedTheme);
  }, [setTheme]);

  return null;
}
