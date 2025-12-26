// Dashboard statistics types
import { Account } from './accounts';
import { Member } from './member';

export interface AccountTypeCount {
    account_type: string;
    account_group_name: string;
    count: number;
}

export interface DashboardCounts {
    totalMembers: number;
    totalAccounts: number;
    totalAgents: number;
    accountsByType: AccountTypeCount[];
}

export interface DashboardCountsResponse {
    success: boolean;
    message: string;
    data: DashboardCounts;
}

export interface RecentData {
    recentAccounts: Account[];
    recentMembers: Member[];
}

export interface RecentDataResponse {
    success: boolean;
    message: string;
    data: RecentData;
}
