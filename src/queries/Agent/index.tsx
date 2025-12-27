// hooks/useGetAgentById.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from "../useApi";
import { AgentResponse, AssignedAccount } from "../../types";

export const useGetAgentById = (agentId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["agent", agentId],
        queryFn: async () => {
            return await useApi<AgentResponse>("GET", `/agent/get-agent/${agentId}`);
        },
        enabled: enabled && !!agentId,

    });
};

export const useGetAssignedAccounts = (agentId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["assignedAccounts", agentId],
        queryFn: async () => {
            return await useApi<{ success: boolean; message: string; data: AssignedAccount[] }>(
                "GET",
                `/agent/get-assigned-accounts/${agentId}`
            );
        },
        enabled: enabled && !!agentId,
    });
};

export const useCollectPayment = (agentId: string | number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { accountId: string; amount: number }) => {
            return await useApi<{
                success: boolean;
                message: string;
                data: {
                    transaction_id: string;
                    account_no: string;
                    account_holder: string;
                    collected_amount: number;
                    new_balance: number;
                    collection_date: Date;
                };
            }>("POST", `/agent/collect-payment/${agentId}`, data);
        },
        onSuccess: () => {
            // Invalidate assigned accounts query to refresh the list
            queryClient.invalidateQueries({ queryKey: ["assignedAccounts"] });
        },
    });
};