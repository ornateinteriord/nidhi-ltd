import { useQuery } from "@tanstack/react-query";
import useApi from "../useApi";
import { MemberResponse } from "../../types";

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