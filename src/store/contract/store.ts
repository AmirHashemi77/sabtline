import { create } from "zustand/index";
import { persist } from "zustand/middleware";
import type { IContractStore } from "../../type/store.types";

import { CONTRACT_ID } from "../../constants/constants";
import type { ContractResponse } from "../../type/onlineContact.types";
import type { InquiryResultResponse } from "../../type/onlineContact.types";

export const useContractStore = create<IContractStore>()(
  persist(
    (set) => ({
      contractBusinessId: "",
      preShowContractData: null,
      buyerInformationData: {},
      carInformationData: {},
      verifyInquiryData: null,
      sellerInformationData: {},
      contractInformationData: {},
      hasSellerInformationData: false,
      hasBuyerInformationData: false,
      hasPaymentHistoryData: false,
      setHasPaymentHistoryData(data: boolean) {
        set({ hasPaymentHistoryData: data });
      },
      setHasBuyerInformationData(data: boolean) {
        set({ hasBuyerInformationData: data });
      },
      setHasSellerInformationData(data: boolean) {
        set({ hasSellerInformationData: data });
      },
      setCarInformationData(data) {
        set(data);
      },
      setContractBusinessId: (businessId: string) => {
        set({ contractBusinessId: businessId });
      },
      setContractInformationData(data: any) {
        set(data);
      },
      setPreShowContractData(data: ContractResponse) {
        set({ preShowContractData: data });
      },
      setVerifyInquiryData(data: InquiryResultResponse) {
        set({ verifyInquiryData: data });
      },
    }),
    {
      name: CONTRACT_ID,
      partialize: (state) => ({ contractBusinessId: state.contractBusinessId }),
    }
  )
);
