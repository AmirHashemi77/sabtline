import { useMutation, useQuery } from "@tanstack/react-query";

import { enqueueSnackbar } from "notistack";
import { ApiClient } from "../config";
import type { ContractDetailsResponse, IOfflineContractCarInformation } from "../../type/offlineContract.types";

const getColorTitleQuery = async () => {
  return await ApiClient.get("/ColorQuery/GetTitles");
};
export const useGetColorTitleQuery = () =>
  useQuery({
    queryKey: ["getColorTitleQuery"],
    queryFn: () => getColorTitleQuery(),
    enabled: false,
    staleTime: 50000,
  });

const getCarSystemQuery = async () => {
  return await ApiClient.get("/CarSystemQuery/GetTitles");
};
export const useGetCarSystemQuery = () =>
  useQuery({
    queryKey: ["getCarSystemQuery"],
    queryFn: () => getCarSystemQuery(),
    enabled: false,
    staleTime: 50000,
  });

const getCarTypeQuery = async () => {
  return await ApiClient.get("/CarTypeQuery/GetTitles");
};
export const useGetCarTypeQuery = () =>
  useQuery({
    queryKey: ["getCarTypeQuery"],
    queryFn: () => getCarTypeQuery(),
    enabled: false,
    staleTime: 50000,
  });

const createOfflineContracts = async (body: IOfflineContractCarInformation) => {
  return await ApiClient.post("/ContractCommand/Create", body);
};

export const useCreateOfflineContracts = () =>
  useMutation({
    mutationKey: ["createOfflineContracts"],
    mutationFn: createOfflineContracts,
    onSuccess: () => {
      enqueueSnackbar({ message: "مشخصات خودرو با موفقیت ثبت شد", variant: "success" });
    },
    onError: () => {
      enqueueSnackbar({ message: "خطا در ثبت مشخصات خودرو", variant: "error" });
    },
  });

const getContractDataQuery = async (body: { BusinessId: string }): Promise<ContractDetailsResponse> => {
  const response = await ApiClient.get(`/ContractQuery/GetByBusinessId?BusinessId=${body.BusinessId}`);
  return response.data;
};
export const useGetContractDataQuery = (body: { BusinessId: string }) =>
  useQuery<ContractDetailsResponse>({
    queryKey: ["ContractDataQuery", body],
    queryFn: () => getContractDataQuery(body),
    retry: false,
  });
