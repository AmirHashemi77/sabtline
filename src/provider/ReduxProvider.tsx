import type { ReactNode } from "react";
import configureStore from "../sso/oidcStore/configureStore";
import { useRegisterStepStore } from "../store/register/store";
import userManager from "../sso/userManager";
import { Provider } from "react-redux";
import { shareData } from "../sso/shareData";
import ClaimsProvider from "./ClaimsProvider";
import { OidcProvider } from "redux-oidc";

interface IProps {
  children: ReactNode;
}

const ReduxProvider = ({ children }: IProps) => {
  // const initialState = typeof window !== undefined && (window as any).initialReduxState;
  const initialState = {};
  const store = configureStore(initialState);
  const selectedSso = useRegisterStepStore((state) => state.selectedSso);

  if (typeof window !== "undefined" && window.location.pathname === "/SilentCallback") {
    userManager.signinSilentCallback();
  } else {
    return (
      <>
        {selectedSso && sessionStorage.getItem(shareData.SSO_APPROACH_SELECTED) === "true" ? (
          <Provider store={store}>
            {/*@ts-expect-error OidcProvider Config*/}
            <OidcProvider userManager={userManager} store={store as Store}>
              <ClaimsProvider>{children}</ClaimsProvider>
            </OidcProvider>
          </Provider>
        ) : (
          children
        )}
      </>
    );
  }
};

export default ReduxProvider;
