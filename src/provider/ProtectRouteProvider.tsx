import { useLayoutEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VERIFY_OTP_TOKEN } from "../constants/constants";
import { isValidJSON } from "../utils/validateJson";
import { useRegisterStore } from "../store/register/store";
import ResponseLoading from "../components/common/responseLoading/ResponseLoading";

interface IProps {
  children: ReactNode;
}

const ProtectRouteProvider = ({ children }: IProps) => {
  const { pathname } = useLocation();
  const verifyToken =
    typeof window !== "undefined" && isValidJSON(localStorage.getItem(VERIFY_OTP_TOKEN))
      ? JSON.parse(localStorage.getItem(VERIFY_OTP_TOKEN) as string)?.state.verifyToken
      : localStorage.getItem(VERIFY_OTP_TOKEN);

  const isAuthChecking = useRegisterStore((state) => state.isAuthChecking);
  const setIsAuthChecking = useRegisterStore((state) => state.setIsAuthChecking);
  const navigate = useNavigate();
  useLayoutEffect(() => {
    setTimeout(() => {
      if (pathname !== "/") {
        if (pathname.trim() === "/register" && verifyToken) {
          navigate("/");
        } else if (pathname.trim() !== "/register" && pathname.trim() !== "/aboutUs" && pathname.trim() !== "/services" && !verifyToken) {
          navigate("/register");
        }
      }
      setIsAuthChecking(false);
    }, 100);
  }, [verifyToken, setIsAuthChecking, pathname]);

  return isAuthChecking ? <ResponseLoading /> : children;
};

export default ProtectRouteProvider;
