"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userManager from "@/sso/userManager";
import ResponseLoading from "../../components/common/responseLoading/ResponseLoading";

export default function SignoutCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    userManager
      .signoutRedirectCallback()
      .then(() => {
        if (typeof window !== "undefined") {
          localStorage.clear();
          sessionStorage.clear();
        }
        userManager.removeUser();
        userManager.clearStaleState();

        navigate("/");
      })
      .catch((error: any) => {
        console.error("Logout callback error:", error);
        navigate("/");
      });
  }, []);

  return <ResponseLoading isPending={true} />;
}
