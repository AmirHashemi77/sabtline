import userManager from "./userManager";

export const autoLogout = async () => {
  if (typeof window !== "undefined") {
    console.log("kiiiiill2");

    await userManager.signoutRedirect();
  }
};

export const logoutOnLoginError = async () => {
  console.log("kiiiiil");

  await userManager.signoutRedirect();
  await userManager.removeUser();
  await userManager.clearStaleState();
  if (typeof window !== "undefined") {
    localStorage.clear();
    sessionStorage.clear();
  }
};
