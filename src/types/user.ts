// User transaction type definition
export interface UserTransaction {
    transaction_id: string;
    transaction_date: Date | string;
    account_number: string;
    transaction_type: string;
    description: string;
    credit: number;
    debit: number;
    balance: number;
    status: string;
    reference_no: string;
}

export interface UserTransactionsResponse {
    success: boolean;
    message: string;
    data: UserTransaction[];
}
