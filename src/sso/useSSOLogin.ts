import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import * as dashboardActions from "./claims/Claims";
import { useDispatch } from "react-redux";
import userManager from "./userManager";
import { logoutOnLoginError } from "./ssoUtils";
import { useLocation } from "react-router-dom";

export const useSSOLogin = (clearUserClaims: () => void) => {
  const [isLogin, setIsLogin] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { setUserReady } = bindActionCreators(dashboardActions, dispatch);

  useEffect(() => {
    if (window.location.pathname !== "/SignInCallback") {
      userManager
        .getUser()
        .then((user) => {
          if (!user || user.expired) {
            userManager.signinRedirect();
            setIsLogin(false);
          } else {
            setIsLogin(true);
            setUserReady();
          }
        })
        .catch(() => {
          logoutOnLoginError();
          clearUserClaims();
        });
    } else {
      setIsLogin(true);
      setUserReady();
    }
  }, [logoutOnLoginError, isLogin, pathname]);

  return { isLogin };
};
