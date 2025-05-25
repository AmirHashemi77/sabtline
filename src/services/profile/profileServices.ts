import {useQuery} from "@tanstack/react-query";
import {ApiClient} from "../config";

interface IGetUserApprovedInquiry {
    PageNumber: number,
    PageSize: number
}

interface IGetContractByType {
    type: "Offline" | "Online"
    PageNumber: number,
    PageSize: number,
    ContractState?: number
}

export interface ContractListResponse {
    data: {
        data: ContractListItem[];
        totalCount: number;

    }
}


export interface InquiryItem {
    id: number;
    businessId: string;
    initialInquiryRequestBusinessId: string;
    createDate: string;
}

export interface InquiryListResponse {
    data: {
        data: InquiryItem[];
        totalCount: number;
    }
}

export interface ContractListItem {
    businessId: string;
    createDateTime: string;
    type: 'Online' | "Offline";
    contractState: "Draft" | "Pendding" | "Signed" | "Canceld";
    amount: number;
    date: string;
}


export interface User {
    data: {
        id: string;
        firstName: string;
        lastName: string;
        userName: string;
        email: string;
    }
}


const getUserContractsQuery = async (body: IGetContractByType): Promise<ContractListResponse> => {
    return await ApiClient.get(`/ContractQuery/GetUserContracts?Type=${body.type}&PageNumber=${body.PageNumber}&PageSize=${body.PageSize}&ContractState=${body.ContractState}&NeedTotalCount=true`);
};
export const useGetUserContractsQuery = (body: IGetContractByType) =>
    useQuery<ContractListResponse>({
        queryKey: ["getUserContractsQuery", body],
        queryFn: () => getUserContractsQuery(body),
        //   enabled: false,
    });


const getUserApprovedInquiry = async (body: IGetUserApprovedInquiry): Promise<InquiryListResponse> => {
    return await ApiClient.get(`/ApprovedInquiryRequestQuery/GetUserApprovedInquiryRequests?PageNumber=${body.PageNumber}&PageSize=${body.PageSize}&NeedTotalCount=true`);
};
export const useGetUserApprovedInquiry = (body: IGetUserApprovedInquiry) =>
    useQuery<InquiryListResponse>({
        queryKey: ["getUserApprovedInquiry", body],
        queryFn: () => getUserApprovedInquiry(body),
        //   enabled: false,
    });


const getUserData = async (): Promise<User> => {
    return await ApiClient.get(`/User/get-profile`);
};
export const useGetUserDataQuery = () =>
    useQuery<User>({
        queryKey: ["getUserContractsQuery"],
        queryFn: getUserData,
        enabled: false,
    });
