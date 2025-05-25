import type { ContractResponse, InquiryResultResponse } from "./onlineContact.types";

export interface IStoreState {
  verifyToken: string | null;
  checkAuthenticated: (newToken?: string) => void;
  isAuthChecking: boolean;
  setIsAuthChecking: (isAuthChecking: boolean) => void;
  contractBusinessId: string;
  setContractBusinessId: (businessId: string) => void;
}

export type TRegisterStep = "SELECT_APPROACH" | "PHONE_NUMBER" | "OTP" | "LOGIN" | "REGISTER_DATA";

export interface IRegisterStep {
  registerStep: TRegisterStep;
  selectedSso: boolean;
  setSelectedSso: (value: boolean) => void;
  setRegisterStep: (registerStep: TRegisterStep) => void;
}

export interface IContractStore {
  contractBusinessId: string;
  verifyInquiryData: InquiryResultResponse | null;
  setContractBusinessId: (businessId: string) => void;
  carInformationData: any;
  setCarInformationData: (data: any) => void;
  sellerInformationData: any;
  buyerInformationData: any;
  contractInformationData: any;
  setContractInformationData: (data: any) => void;
  preShowContractData: ContractResponse | null;
  setPreShowContractData: (data: any) => void;
  hasSellerInformationData: boolean;
  setHasSellerInformationData: (has: boolean) => void;
  hasBuyerInformationData: boolean;
  setHasBuyerInformationData: (has: boolean) => void;
  hasPaymentHistoryData: boolean;
  setHasPaymentHistoryData: (has: boolean) => void;
  setVerifyInquiryData: (data: InquiryResultResponse) => void;
}
