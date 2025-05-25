import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  ApprovedInquiryRequest,
  ContractResponse,
  IAddPayment,
  IContractDetails,
  ICreateEmpty,
  IGetPayment,
  IGetPersonByType,
  IGreenPaper,
  InquiryResultResponse,
  IRemovePayment,
  IRemovePerson,
  IReturnBank,
  IVerifyInquiry,
} from "../../type/onlineContact.types";
import { ApiClient } from "../config";
import type { IPerson } from "../../type/person.types";
import { enqueueSnackbar } from "notistack";
import { throwListErrors } from "../../utils/validateServiceResponse";

const createInitialInquiryRequest = async (body: IGreenPaper) => {
  return await ApiClient.post("/InitialInquiryRequestCommand/Create", body);
};
export const useCreateInitialInquiryRequest = () =>
  useMutation({
    mutationKey: ["createInitialInquiry"],
    mutationFn: createInitialInquiryRequest,
  });

const bankReturnRequest = async (body: IReturnBank) => {
  return await ApiClient.post("/PaymentCommand/BankReturn", body);
};
export const useBankReturnRequest = () =>
  useMutation({
    mutationKey: ["bankReturnRequest"],
    mutationFn: bankReturnRequest,
  });

const verifyInquiryRequest = async (body: IVerifyInquiry): Promise<InquiryResultResponse> => {
  return await ApiClient.post("/InitialInquiryRequestCommand/VerifyInquiry", body);
};
export const useVerifyInquiryRequest = () =>
  useMutation<InquiryResultResponse, unknown, IVerifyInquiry>({
    mutationKey: ["verifyInquiryRequest"],
    mutationFn: verifyInquiryRequest,
  });

const addPersonRequest = async (body: IPerson) => {
  return await ApiClient.post("/ContractCommand/AddPerson", body);
};
export const useAddPersonRequest = () =>
  useMutation({
    mutationKey: ["addPersonRequest"],
    mutationFn: addPersonRequest,
    onSuccess: () => {
      enqueueSnackbar({ message: "عملیات با موفقیت انجام شد", variant: "success", autoHideDuration: 1000 });
    },
    onError: (error) => {
      throwListErrors(error);
    },
  });

const createEmptyRequest = async (body: ICreateEmpty) => {
  return await ApiClient.post("/ContractCommand/CreateEmpty", body);
};
export const useCreateEmptyRequest = () =>
  useMutation({
    mutationKey: ["createEmptyRequest"],
    mutationFn: createEmptyRequest,
    onSuccess: () => {
      enqueueSnackbar({ message: "عملیات با موفقیت انجام شد", variant: "success", autoHideDuration: 1000 });
    },
    onError: () => {
      enqueueSnackbar({ message: "عملیات با خطا مواجه شد", variant: "error", autoHideDuration: 1000 });
    },
  });

const lastStepUpdateRequest = async (body: IContractDetails) => {
  return await ApiClient.put("/ContractCommand/LastStepUpdate", body);
};
export const useLastStepUpdateRequest = () =>
  useMutation({
    mutationKey: ["lastStepUpdateRequest"],
    mutationFn: lastStepUpdateRequest,
    onSuccess: () => {
      enqueueSnackbar({ message: "عملیات با موفقیت انجام شد", variant: "success", autoHideDuration: 1000 });
    },
    onError: () => {
      enqueueSnackbar({ message: "عملیات با خطا مواجه شد", variant: "error", autoHideDuration: 1000 });
    },
  });

const getPersonsByTypeQuery = async (body: IGetPersonByType) => {
  return await ApiClient.get(`/ContractQuery/GetPersonsByType?ContractBusinessId=${body.ContractBusinessId}&Type=${body.Type}`);
};
export const useGetPersonsByTypeQuery = (body: IGetPersonByType) =>
  useQuery({
    queryKey: ["getPersonsByTypeQuery", body],
    queryFn: () => getPersonsByTypeQuery(body),
    enabled: false,
  });

const addPaymentRequest = async (body: IAddPayment) => {
  return await ApiClient.post("/ContractCommand/AddPayment", body);
};
export const useAddPaymentRequest = () =>
  useMutation({
    mutationKey: ["addPaymentRequest"],
    mutationFn: addPaymentRequest,
    onSuccess: () => {
      enqueueSnackbar({ message: "عملیات با موفقیت انجام شد", variant: "success", autoHideDuration: 1000 });
    },
    onError: () => {
      enqueueSnackbar({ message: "عملیات با خطا مواجه شد", variant: "error", autoHideDuration: 1000 });
    },
  });

const getPayments = async (body: IGetPayment) => {
  return await ApiClient.get(`/ContractQuery/GetPayments?ContractBusinessId=${body.ContractBusinessId}`);
};
export const useGetPaymentsQuery = (body: IGetPayment) =>
  useQuery({
    queryKey: ["getPayments", body],
    queryFn: () => getPayments(body),
    enabled: false,
  });

const getContractData = async (body: { BusinessId: string }) => {
  const response = await ApiClient.get<ContractResponse>(`/ContractQuery/GetDetail?BusinessId=${body.BusinessId}`);

  return response.data;
};
export const useGetContractDataQuery = (body: { BusinessId: string }) =>
  useQuery<ContractResponse>({
    queryKey: ["getContractData", body],
    queryFn: () => getContractData(body),
    enabled: false,
  });

const finalConfirmRequest = async (body: { BusinessId: string }) => {
  return await ApiClient.put("/ContractCommand/Sign", body);
};
export const useFinalConfirmRequest = () =>
  useMutation({
    mutationKey: ["finalConfirmRequest"],
    mutationFn: finalConfirmRequest,
    onSuccess: () => {
      enqueueSnackbar({ message: "عملیات با موفقیت انجام شد", variant: "success", autoHideDuration: 1000 });
    },
    onError: () => {
      enqueueSnackbar({ message: "عملیات با خطا مواجه شد", variant: "error", autoHideDuration: 1000 });
    },
  });

const removePerson = async (body: IRemovePerson) => {
  return await ApiClient.delete("/ContractCommand/RemovePerson", { data: body });
};
export const useRemovePerson = () =>
  useMutation({
    mutationKey: ["removePerson"],
    mutationFn: removePerson,
    onSuccess: () => {
      enqueueSnackbar({ message: "عملیات با موفقیت انجام شد", variant: "success", autoHideDuration: 1000 });
    },
    onError: () => {
      enqueueSnackbar({ message: "عملیات با خطا مواجه شد", variant: "error", autoHideDuration: 1000 });
    },
  });

const updatePersonRequest = async (body: IPerson) => {
  return await ApiClient.put("/ContractCommand/UpdatePerson", body);
};
export const useUpdatePersonRequest = () =>
  useMutation({
    mutationKey: ["updatePersonRequest"],
    mutationFn: updatePersonRequest,
    onSuccess: () => {
      enqueueSnackbar({ message: "عملیات با موفقیت انجام شد", variant: "success", autoHideDuration: 1000 });
    },
    onError: () => {
      enqueueSnackbar({ message: "عملیات با خطا مواجه شد", variant: "error", autoHideDuration: 1000 });
    },
  });

const removePaymentRequest = async (body: IRemovePayment) => {
  return await ApiClient.delete("/ContractCommand/RemovePayment", { data: body });
};
export const useRemovePaymentRequest = () =>
  useMutation({
    mutationKey: ["removePaymentRequest"],
    mutationFn: removePaymentRequest,
    onSuccess: () => {
      enqueueSnackbar({ message: "عملیات با موفقیت انجام شد", variant: "success", autoHideDuration: 1000 });
    },
    onError: () => {
      enqueueSnackbar({ message: "عملیات با خطا مواجه شد", variant: "error", autoHideDuration: 1000 });
    },
  });

const getApprovedInquiryRequestQuery = async (body: { BusinessId: string }): Promise<ApprovedInquiryRequest> => {
  const { data } = await ApiClient.get(`/ApprovedInquiryRequestQuery/GetByBusinessId?BusinessId=${body.BusinessId}`);
  return data;
};
export const useGetApprovedInquiryRequestQuery = (body: { BusinessId: string }) =>
  useQuery<ApprovedInquiryRequest>({
    queryKey: ["getApprovedInquiryRequestQuery", body],
    queryFn: () => getApprovedInquiryRequestQuery(body),
    enabled: false,
  });
