import userManager from "./userManager";

export const autoLogout = async () => {
  if (typeof window !== "undefined") {
    await userManager.signoutRedirect();
  }
};

export const logoutOnLoginError = async () => {
  await userManager.signoutRedirect();
  await userManager.removeUser();
  await userManager.clearStaleState();
  if (typeof window !== "undefined") {
    localStorage.clear();
    sessionStorage.clear();
  }
};
