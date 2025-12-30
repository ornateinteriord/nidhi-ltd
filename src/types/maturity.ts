// Maturity-related type definitions
import { Account } from './accounts';

export interface MaturityAccount extends Account {
    account_type_name?: string; // Account group name (e.g., "PIGMY", "FD", "RD", "MIS")
}

export interface MaturityAccountsResponse {
    success: boolean;
    message: string;
    data: MaturityAccount[];
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface PreMaturityAccountsResponse extends MaturityAccountsResponse { }

export interface PostMaturityAccountsResponse extends MaturityAccountsResponse { }
