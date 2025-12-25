// hooks/useGetAgentById.ts
import { useQuery } from '@tanstack/react-query';
import useApi from "../useApi";

export interface Agent {
    _id: string;
    agent_id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    status: 'active' | 'inactive' | 'suspended';
    createdAt: string;
    updatedAt: string;
}

export interface AgentResponse {
    success: boolean;
    message: string;
    data: Agent;
}

export const useGetAgentById = (agentId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["agent", agentId],
        queryFn: async () => {
            return await useApi<AgentResponse>("GET", `/agent/get-agent/${agentId}`);
        },
        enabled: enabled && !!agentId,
        staleTime: 1000 * 60 * 5,
    });
};