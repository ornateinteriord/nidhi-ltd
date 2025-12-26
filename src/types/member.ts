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
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
