import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RegisterSteps, VERIFY_OTP_TOKEN } from "../../constants/constants";
import type { IRegisterStep, IStoreState, TRegisterStep } from "../../type/store.types";

export const useRegisterStore = create<IStoreState>()(
  persist(
    (set) => ({
      verifyToken: "",
      contractBusinessId: "",
      isAuthChecking: true,
      checkAuthenticated: (verifyOtpToken?: string) => {
        /* if (typeof window !== "undefined" &&
                 localStorage.getItem(VERIFY_OTP_TOKEN) &&
                 (localStorage.getItem(VERIFY_OTP_TOKEN) as string).includes('verifyToken') &&
                 JSON.parse(localStorage.getItem(VERIFY_OTP_TOKEN) as string).state.verifyToken) {
                 console.log(1)
                 verifyOtpToken = JSON.parse(localStorage.getItem(VERIFY_OTP_TOKEN) as string).state.verifyToken;
             }*/

        /*  if (typeof window !== "undefined" && localStorage.getItem(ACCESS_TOKEN_SSO)) {
                  // console.log(2)
                  verifyOtpToken = localStorage.getItem(ACCESS_TOKEN_SSO)
              }*/

        /*  if (typeof window !== "undefined" && typeof localStorage.getItem(VERIFY_OTP_TOKEN) === 'string') {
                  verifyOtpToken = localStorage.getItem(VERIFY_OTP_TOKEN)
              }*/
        set({ verifyToken: verifyOtpToken, isAuthChecking: false });
      },
      setIsAuthChecking: (isAuthChecking: boolean) => {
        set({ isAuthChecking: isAuthChecking });
      },
      setContractBusinessId: (businessId: string) => {
        set({ contractBusinessId: businessId });
      },
    }),
    {
      name: VERIFY_OTP_TOKEN,
      partialize: (state) => ({ verifyToken: state.verifyToken }),
    }
  )
);

export const useRegisterStepStore = create<IRegisterStep>((set) => ({
  registerStep: RegisterSteps.SELECT_APPROACH,
  selectedSso: false,
  setRegisterStep: (value: TRegisterStep) => set({ registerStep: value }),
  setSelectedSso: (value: boolean) => set({ selectedSso: value }),
}));
