// Member type definitions
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
    // Bank/KYC fields
    bank_name?: string;
    account_number?: string;
    ifsc_code?: string;
    kycStatus?: string;
    beneficiaryStatus?: string;
    beneficiaryId?: string;
    bank_details?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

// Transaction type definition
export interface Transaction {
    _id?: string;
    transaction_id: string;
    member_id: string;
    account_id: string;
    account_no: string;
    account_type: string;
    transaction_type: string; // 'credit' or 'debit'
    amount: number;
    balance_after: number;
    transaction_date: Date | string;
    description?: string;
    reference_no?: string;
    entered_by?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

// Member Transactions Response
export interface MemberTransactionsResponse {
    success: boolean;
    message: string;
    data: Transaction[];
}
