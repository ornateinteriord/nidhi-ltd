// Admin-related type definitions
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
