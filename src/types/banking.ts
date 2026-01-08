// Receipt type
export interface Receipt {
    _id?: string;
    receipt_id: string;
    receipt_date: string;
    received_from: string;
    receipt_details: string;
    mode_of_payment_received: string;
    amount: number;
    status: string;
    ref_no?: string;
    receipt_no?: string;
    entered_by: string;
    branch_code: string;
    member_id?: string;
    account_details?: {
        account_no: string;
        account_type: string;
        account_id: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

export interface ReceiptResponse {
    success: boolean;
    message: string;
    data: Receipt;
}

export interface ReceiptsResponse {
    success: boolean;
    message: string;
    data: Receipt[];
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

// Payment type
export interface Payment {
    _id?: string;
    payment_id: string;
    payment_date: string;
    paid_to: string;
    payment_details: string;
    mode_of_payment_paid: string;
    amount: number;
    status: string;
    ref_no?: string;
    payment_no?: string;
    entered_by: string;
    branch_code: string;
    member_id?: string;
    account_details?: {
        account_no: string;
        account_type: string;
        account_id: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

export interface PaymentResponse {
    success: boolean;
    message: string;
    data: Payment;
}

export interface PaymentsResponse {
    success: boolean;
    message: string;
    data: Payment[];
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
