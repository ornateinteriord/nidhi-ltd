// Member dashboard related types

export interface MemberAccountType {
    account_type: string;
    account_group_name: string;
    count: number;
    accounts: {
        account_id: string;
        account_no?: string;
        account_amount?: number;
        status?: string;
        date_of_opening?: Date | string;
    }[];
}

export interface MemberAccountsData {
    accountTypes: MemberAccountType[];
    totalAccounts: number;
}

export interface MemberAccountsResponse {
    success: boolean;
    message: string;
    data: MemberAccountsData;
}
