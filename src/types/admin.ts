// Admin-related type definitions
export interface Interest {
    _id?: string;
    interest_id: string;
    plan_type: "FD" | "RD" | "PIGMY" | "SAVING" | string;
    interest_name: string;
    duration: number;  // months
    interest_rate?: number; // legacy field
    interest_rate_general: number;
    interest_rate_senior: number;
    minimum_deposit?: number;
    ref_id?: string; // legacy field
    from_date: Date | string;
    to_date: Date | string | null;
    status: "active" | "inactive" | string;
    createdAt?: string;
    updatedAt?: string;
}
