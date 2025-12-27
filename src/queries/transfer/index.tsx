import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "../useApi";
import {
    MemberBasicInfoResponse,
    AccountsPublicResponse,
    TransferRequest,
    TransferResponse
} from "../../types";

// Get member basic info by member_id (for recipient lookup)
export const useGetMemberBasicInfo = (memberId: string, enabled: boolean = false) => {
    return useQuery({
        queryKey: ["memberBasicInfo", memberId],
        queryFn: async () => {
            return await useApi<MemberBasicInfoResponse>("GET", `/member/basic-info/${memberId}`);
        },
        enabled: enabled && !!memberId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Get member's accounts without balances (for recipient account selection)
export const useGetMemberAccountsPublic = (memberId: string, enabled: boolean = false) => {
    return useQuery({
        queryKey: ["memberAccountsPublic", memberId],
        queryFn: async () => {
            return await useApi<AccountsPublicResponse>("GET", `/member/accounts/${memberId}`);
        },
        enabled: enabled && !!memberId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Transfer money mutation
export const useTransferMoney = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TransferRequest) => {
            return await useApi<TransferResponse>("POST", "/transaction/transfer-money", data);
        },
        onSuccess: () => {
            // Invalidate accounts to refresh balances
            queryClient.invalidateQueries({ queryKey: ["myAccounts"] });
        },
    });
};
