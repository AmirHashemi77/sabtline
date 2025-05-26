import { User } from "oidc-client";
import { useNavigate } from "react-router-dom";
import { CallbackComponent } from "redux-oidc";
import { useRegisterStore } from "../../store/register/store";
import { logoutOnLoginError } from "../../sso/ssoUtils";
import ResponseLoading from "../../components/common/responseLoading/ResponseLoading";
import userManager from "../../sso/userManager";

const SignInCallbackPage = () => {
  const navigate = useNavigate();
  const checkAuthenticated = useRegisterStore((state) => state.checkAuthenticated);
  const setIsAuthChecking = useRegisterStore((state) => state.setIsAuthChecking);

  /*const dispatch = useDispatch();
    const {clearUserClaims} = bindActionCreators(dashboardActions, dispatch);*/
  const successCallback = (user: User) => {
    /* const validPersonData =
             user.profile && shareData.validDataForCreatePerson(user.profile);
         if (typeof window !== 'undefined') {
             localStorage.setItem(shareData.USER_DATA, JSON.stringify(validPersonData));
         }*/
    setIsAuthChecking(true);
    checkAuthenticated(user.access_token);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("user-data-updated"));
    }
    navigate("/");
  };

  const errorCallback = () => {
    logoutOnLoginError();
  };

  return (
    /*@ts-expect-error rrr*/
    <CallbackComponent userManager={userManager} successCallback={successCallback} errorCallback={errorCallback}>
      <ResponseLoading isPending={true} />
    </CallbackComponent>
  );
};

export default SignInCallbackPage;
