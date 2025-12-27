// hooks/useGetAgentById.ts
import { useQuery } from '@tanstack/react-query';
import useApi from "../useApi";
import { AgentResponse } from "../../types";

export const useGetAgentById = (agentId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["agent", agentId],
        queryFn: async () => {
            return await useApi<AgentResponse>("GET", `/agent/get-agent/${agentId}`);
        },
        enabled: enabled && !!agentId,
        
    });
};