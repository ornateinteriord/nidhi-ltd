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
