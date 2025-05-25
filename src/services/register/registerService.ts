import { useMutation } from "@tanstack/react-query";
import type { IUserRegistration, IVerityToken } from "../../type/register.types";
import { ApiClient } from "../config";

const checkUserRegistration = async (body: IUserRegistration) => {
  return await ApiClient.post("/Account/check-user-registration", body);
};
export const useCheckUserRegistration = () =>
  useMutation({
    mutationKey: ["checkUserRegistration"],
    mutationFn: checkUserRegistration,
  });

const generateToken = async (body: IUserRegistration) => {
  return await ApiClient.post("/Account/generate-otp", body);
};

export const useGenerateToken = () =>
  useMutation({
    mutationKey: ["generateToken"],
    mutationFn: generateToken,
  });

const verityOtp = async (body: IVerityToken) => {
  return await ApiClient.post("/Account/verify-otp", body);
};

export const useVerifyOtp = () =>
  useMutation({
    mutationKey: ["verifyOtp"],
    mutationFn: verityOtp,
  });

const generateOtpAndRegister = async (body: unknown) => {
  return await ApiClient.post("/Account/generate-otp-and-register", body);
};

export const useGenerateOtpAndRegister = () =>
  useMutation({
    mutationKey: ["generateOtpAndRegister"],
    mutationFn: generateOtpAndRegister,
  });
