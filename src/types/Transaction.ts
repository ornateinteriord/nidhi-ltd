// Transaction types for API responses

export interface Transaction {
    _id: string;
    transaction_id: string;
    transaction_date: string;
    member_id: string;
    account_number?: string;
    account_type?: string;
    transaction_type: string;
    description: string;
    credit: number;
    debit: number;
    balance: number;
    status: string;
    reference_no?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface GetTransactionsResponse {
    success: boolean;
    message: string;
    data: Transaction[];
}
