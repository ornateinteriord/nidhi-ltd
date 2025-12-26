import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "../useApi";
import { MemberResponse, MemberAccountsResponse, UpdateMemberRequest, UpdateMemberResponse } from "../../types";

export const useGetMemberById = (memberId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["member", memberId],
        queryFn: async () => {
            return await useApi<MemberResponse>("GET", `/member/get-member/${memberId}`);
        },
        enabled: enabled && !!memberId, // Only run query if enabled and memberId exists
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// GET MY ACCOUNTS (for logged-in member)
export const useGetMyAccounts = () => {
    return useQuery({
        queryKey: ["myAccounts"],
        queryFn: async () => {
            return await useApi<MemberAccountsResponse>("GET", "/member/get-my-accounts");
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// UPDATE MEMBER PROFILE
export const useUpdateMemberProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ memberId, data }: { memberId: string; data: UpdateMemberRequest }) => {
            return await useApi<UpdateMemberResponse>("PUT", `/member/update-profile/${memberId}`, data);
        },
        onSuccess: (_response, variables) => {
            // Invalidate and refetch member data
            queryClient.invalidateQueries({ queryKey: ["member", variables.memberId] });
        },
    });
};
