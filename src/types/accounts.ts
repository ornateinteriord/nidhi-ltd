// Account-related type definitions
export interface AccountBook {
    _id?: string;
    account_book_id: string;
    account_book_name?: string;
    primary_book?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface AccountGroup {
    _id?: string;
    account_group_id: string;
    account_book_id?: string;
    account_group_name?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface MemberDetails {
    name?: string;
    contactno?: string;
    emailid?: string;
    address?: string;
}

export interface Account {
    _id?: string;
    account_id: string;
    branch_id?: string;
    date_of_opening?: Date | string;
    member_id?: string;
    account_type?: string; // account_group_id
    account_no?: string;
    account_operation?: string;
    introducer?: string;
    entered_by?: string;
    ref_id?: string; // interest_id
    interest_rate?: number;
    duration?: number;
    date_of_maturity?: Date | string;
    date_of_close?: Date | string;
    status?: string;
    assigned_to?: string;
    account_amount?: number;
    joint_member?: string;
    memberDetails?: MemberDetails;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    // Account closure fields
    payout_amount?: number;
    interest_paid?: number;
    payment_mode?: string;
    payment_reference?: string;
}

// Extended account interface for agent assignment with additional details
export interface AccountForAssignment extends Account {
    account_type_name?: string;  // From AccountGroup
    agentDetails?: {
        agent_id: string;
        name: string;
    };
}

