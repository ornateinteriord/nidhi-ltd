// Member update type definitions
export interface UpdateMemberRequest {
    name?: string;
    father_name?: string;
    gender?: string;
    dob?: Date | string;
    age?: number;
    address?: string;
    occupation?: string;
    pan_no?: string;
    aadharcard_no?: string;
    voter_id?: string;
    nominee?: string;
    relation?: string;
    member_image?: string;
    member_signature?: string;
}

export interface UpdateMemberResponse {
    success: boolean;
    message: string;
    data: any; // Returns updated member object
}
