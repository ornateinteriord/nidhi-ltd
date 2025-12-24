import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "../useApi";

// TypeScript Interfaces
export interface Member {
    _id?: string;
    member_id: string;
    branch_id?: string;
    date_of_joining?: Date | string;
    receipt_no?: string;
    name?: string;
    father_name?: string;
    gender?: string;
    dob?: Date | string;
    age?: number;
    address?: string;
    emailid?: string;
    contactno?: string;
    pan_no?: string;
    aadharcard_no?: string;
    voter_id?: string;
    nominee?: string;
    relation?: string;
    occupation?: string;
    introducer?: string;
    introducer_name?: string;
    member_image?: string;
    member_signature?: string;
    entered_by?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface MembersResponse {
    success: boolean;
    message: string;
    data: Member[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface MemberResponse {
    success: boolean;
    message: string;
    data: Member;
}

// GET ALL MEMBERS
export const useGetMembers = (
    page: number = 1,
    limit: number = 10,
    search?: string,
    status?: string
) => {
    return useQuery({
        queryKey: ["members", page, limit, search, status],
        queryFn: async () => {
            const params: Record<string, any> = { page, limit };
            if (search) params.search = search;
            if (status) params.status = status;

            return await useApi<MembersResponse>("GET", "/admin/get-members", undefined, params);
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// GET MEMBER BY ID
export const useGetMemberById = (memberId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["member", memberId],
        queryFn: async () => {
            return await useApi<MemberResponse>("GET", `/admin/get-member/${memberId}`);
        },
        enabled: enabled && !!memberId, // Only run query if enabled and memberId exists
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// CREATE MEMBER
export const useCreateMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (memberData: Partial<Member>) => {
            return await useApi<MemberResponse>("POST", "/admin/create-member", memberData);
        },
        onSuccess: () => {
            // Invalidate and refetch members list
            queryClient.invalidateQueries({ queryKey: ["members"] });
        },
    });
};

// UPDATE MEMBER
export const useUpdateMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ memberId, data }: { memberId: string; data: Partial<Member> }) => {
            return await useApi<MemberResponse>("PUT", `/admin/update-member/${memberId}`, data);
        },
        onSuccess: (_, variables) => {
            // Invalidate and refetch members list and specific member
            queryClient.invalidateQueries({ queryKey: ["members"] });
            queryClient.invalidateQueries({ queryKey: ["member", variables.memberId] });
        },
    });
};

// ==================== AGENT QUERIES ====================

// TypeScript Interfaces for Agents
export interface Agent {
    _id?: string;
    agent_id: string;
    branch_id?: string;
    date_of_joining?: Date | string;
    name?: string;
    gender?: string;
    dob?: Date | string;
    address?: string;
    emailid?: string;
    mobile?: string;
    pan_no?: string;
    aadharcard_no?: string;
    introducer?: string;
    entered_by?: string;
    designation?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface AgentsResponse {
    success: boolean;
    message: string;
    data: Agent[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface AgentResponse {
    success: boolean;
    message: string;
    data: Agent;
}

// GET ALL AGENTS
export const useGetAgents = (
    page: number = 1,
    limit: number = 10,
    search?: string,
    status?: string
) => {
    return useQuery({
        queryKey: ["agents", page, limit, search, status],
        queryFn: async () => {
            const params: Record<string, any> = { page, limit };
            if (search) params.search = search;
            if (status) params.status = status;

            return await useApi<AgentsResponse>("GET", "/admin/get-agents", undefined, params);
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// GET AGENT BY ID
export const useGetAgentById = (agentId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["agent", agentId],
        queryFn: async () => {
            return await useApi<AgentResponse>("GET", `/admin/get-agent/${agentId}`);
        },
        enabled: enabled && !!agentId, // Only run query if enabled and agentId exists
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// CREATE AGENT
export const useCreateAgent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (agentData: Partial<Agent>) => {
            return await useApi<AgentResponse>("POST", "/admin/create-agent", agentData);
        },
        onSuccess: () => {
            // Invalidate and refetch agents list
            queryClient.invalidateQueries({ queryKey: ["agents"] });
        },
    });
};

// UPDATE AGENT
export const useUpdateAgent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ agentId, data }: { agentId: string; data: Partial<Agent> }) => {
            return await useApi<AgentResponse>("PUT", `/admin/update-agent/${agentId}`, data);
        },
        onSuccess: (_, variables) => {
            // Invalidate and refetch agents list and specific agent
            queryClient.invalidateQueries({ queryKey: ["agents"] });
            queryClient.invalidateQueries({ queryKey: ["agent", variables.agentId] });
        },
    });
};

// ==================== INTEREST QUERIES ====================

// TypeScript Interfaces for Interests
export interface Interest {
    _id?: string;
    interest_id: string;
    ref_id?: string;
    interest_name?: string;
    interest_rate?: number;
    duration?: number;
    from_date?: Date | string;
    to_date?: Date | string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface InterestsResponse {
    success: boolean;
    message: string;
    data: Interest[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface InterestResponse {
    success: boolean;
    message: string;
    data: Interest;
}

// GET ALL INTERESTS
export const useGetInterests = (
    page: number = 1,
    limit: number = 10,
    search?: string,
    status?: string
) => {
    return useQuery({
        queryKey: ["interests", page, limit, search, status],
        queryFn: async () => {
            const params: Record<string, any> = { page, limit };
            if (search) params.search = search;
            if (status) params.status = status;

            return await useApi<InterestsResponse>("GET", "/admin/get-interests", undefined, params);
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// GET INTEREST BY ID
export const useGetInterestById = (interestId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["interest", interestId],
        queryFn: async () => {
            return await useApi<InterestResponse>("GET", `/admin/get-interest/${interestId}`);
        },
        enabled: enabled && !!interestId, // Only run query if enabled and interestId exists
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// CREATE INTEREST
export const useCreateInterest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (interestData: Partial<Interest>) => {
            return await useApi<InterestResponse>("POST", "/admin/create-interest", interestData);
        },
        onSuccess: () => {
            // Invalidate and refetch interests list
            queryClient.invalidateQueries({ queryKey: ["interests"] });
        },
    });
};

// UPDATE INTEREST
export const useUpdateInterest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ interestId, data }: { interestId: string; data: Partial<Interest> }) => {
            return await useApi<InterestResponse>("PUT", `/admin/update-interest/${interestId}`, data);
        },
        onSuccess: (_, variables) => {
            // Invalidate and refetch interests list and specific interest
            queryClient.invalidateQueries({ queryKey: ["interests"] });
            queryClient.invalidateQueries({ queryKey: ["interest", variables.interestId] });
        },
    });
};
