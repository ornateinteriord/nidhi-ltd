// Transfer-related type definitions

export interface AccountWithBalance {
    account_id: string;
    account_no: string;
    account_type: string;
    account_group_name: string;
    account_amount: number;
    member_id: string;
}

export interface MemberBasicInfo {
    member_id: string;
    name: string;
    contact: string;
    email: string;
}

export interface AccountPublic {
    account_id: string;
    account_no: string;
    account_type: string;
    account_group_name: string;
    date_of_opening: Date | string;
}

export interface TransferRequest {
    from: {
        member_id: string;
        account_id: string;
        account_no: string;
        account_type: string;
    };
    to: {
        member_id: string;
        account_id: string;
        account_no: string;
        account_type: string;
    };
    amount: number;
}

export interface TransferResponse {
    success: boolean;
    message: string;
    data?: {
        transactionId: string;
        from: {
            account_no: string;
            member_name: string;
            new_balance: number;
        };
        to: {
            account_no: string;
            member_name: string;
            new_balance: number;
        };
        amount: number;
        transfer_date: string;
    };
}

export interface MemberBasicInfoResponse {
    success: boolean;
    message: string;
    data: MemberBasicInfo;
}

export interface AccountsPublicResponse {
    success: boolean;
    message: string;
    data: AccountPublic[];
}
