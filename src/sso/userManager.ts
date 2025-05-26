import { createUserManager } from "redux-oidc";
import Oidc, { type UserManagerSettings } from "oidc-client";

const ssoURLOrganization = "https://sso.sabtline.ir";

let userManager: Oidc.UserManager;

const userManagerConfig: UserManagerSettings = {
  // eslint-disable-next-line camelcase
  client_id: "smsgw_ui",
  // eslint-disable-next-line camelcase
  redirect_uri: window.location.origin + "/SignInCallback",
  // eslint-disable-next-line camelcase
  silent_redirect_uri: window.location.origin + "/SilentCallback",
  // eslint-disable-next-line camelcase
  response_type: "code",
  scope: "smsgwapi openid profile roles",
  authority: ssoURLOrganization,
  // eslint-disable-next-line camelcase
  post_logout_redirect_uri: window.location.origin + "/signout-callback-oidc",
  userStore: new Oidc.WebStorageStateStore({ store: typeof window !== "undefined" && localStorage }),
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  monitorSession: false,
  // eslint-disable-next-line camelcase
  client_secret: "123456",
};

userManager = createUserManager(userManagerConfig);

export default userManager;
