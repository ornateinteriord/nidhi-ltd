// Agent type definitions
export interface Agent {
    _id?: string;
    agent_id: string;
    branch_id?: string;
    date_of_joining?: Date | string;
    name?: string;
    gender?: string;
    dob?: Date | string;
    address?: string;
    emailid?: string;
    mobile?: string;
    pan_no?: string;
    aadharcard_no?: string;
    introducer?: string;
    entered_by?: string;
    designation?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
