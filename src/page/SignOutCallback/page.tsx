import { useEffect } from "react";
import userManager from "../../sso/userManager";

const SignOutCallbackPage = () => {
  useEffect(() => {
    userManager
      .signoutRedirectCallback()
      .then(() => {
        userManager.removeUser();
        if (typeof window !== "undefined") {
          localStorage.clear();
        }
        userManager.clearStaleState();
        window.location.replace("/");
      })
      .catch((error: Error) => {
        console.error("❌ Signout error:", error);
        window.location.replace("/");
      });
  }, []);

  return <p>در حال خروج...</p>;
};

export default SignOutCallbackPage;
