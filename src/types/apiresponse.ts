// API Response type definitions
import { Member } from './member';
import { Agent } from './agent';
import { Interest } from './admin';
import { Account, AccountBook, AccountGroup, AccountForAssignment } from './accounts';

// Pagination interface
export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Member responses
export interface MemberResponse {
    success: boolean;
    message: string;
    data: Member;
}

export interface MembersResponse {
    success: boolean;
    message: string;
    data: Member[];
    pagination: Pagination;
}

// Agent responses
export interface AgentResponse {
    success: boolean;
    message: string;
    data: Agent;
}

export interface AgentsResponse {
    success: boolean;
    message: string;
    data: Agent[];
    pagination: Pagination;
}

// Interest responses
export interface InterestResponse {
    success: boolean;
    message: string;
    data: Interest;
}

export interface InterestsResponse {
    success: boolean;
    message: string;
    data: Interest[];
    pagination: Pagination;
}

// Account responses
export interface AccountResponse {
    success: boolean;
    message: string;
    data: Account;
}

export interface AccountsResponse {
    success: boolean;
    message: string;
    data: Account[];
    pagination: Pagination;
}

export interface AccountBooksResponse {
    success: boolean;
    message: string;
    data: AccountBook[];
}

export interface AccountGroupsResponse {
    success: boolean;
    message: string;
    data: AccountGroup[];
}

export interface InterestsByGroupResponse {
    success: boolean;
    message: string;
    data: Interest[];
}

// Agent Assignment response
export interface AccountsForAssignmentResponse {
    success: boolean;
    message: string;
    data: AccountForAssignment[];
    pagination: Pagination;
}

