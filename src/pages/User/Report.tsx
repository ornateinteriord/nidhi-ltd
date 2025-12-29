import React from 'react';
import { Box, Chip } from '@mui/material';
import AdminReusableTable, { ColumnDefinition } from '../../utils/AdminReusableTable';
import { useGetUserTransactions } from '../../queries/User';
import TokenService from '../../queries/token/tokenService';
import { UserTransaction } from '../../types';

const Report: React.FC = () => {
    const memberId = TokenService.getMemberId();
    const { data: transactionsData, isLoading: transactionsLoading } = useGetUserTransactions(memberId || '', !!memberId);

    const transactions = transactionsData?.data || [];

    // Transaction columns
    const transactionColumns: ColumnDefinition<UserTransaction>[] = [
        {
            id: 'transaction_date',
            label: 'Date',
            sortable: true,
            renderCell: (row) => {
                const date = new Date(row.transaction_date);
                return date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                });
            },
        },
        {
            id: 'transaction_id',
            label: 'Transaction ID',
            sortable: true,
        },
        {
            id: 'account_number',
            label: 'Account No',
            sortable: true,
            renderCell: (row) => row.account_number || '-',
        },
        {
            id: 'transaction_type',
            label: 'Type',
            sortable: true,
        },
        {
            id: 'description',
            label: 'Description',
            sortable: true,
            renderCell: (row) => row.description || '-',
        },
        {
            id: 'debit',
            label: 'Debit',
            align: 'right',
            sortable: true,
            renderCell: (row) => row.debit > 0
                ? `₹ ${row.debit.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : '-',
        },
        {
            id: 'credit',
            label: 'Credit',
            align: 'right',
            sortable: true,
            renderCell: (row) => row.credit > 0
                ? `₹ ${row.credit.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : '-',
        },
        {
            id: 'balance',
            label: 'Balance',
            align: 'right',
            sortable: true,
            renderCell: (row) => `₹ ${row.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
        {
            id: 'status',
            label: 'Status',
            sortable: true,
            renderCell: (row) => {
                const status = row.status.toLowerCase();
                return (
                    <Chip
                        label={row.status}
                        size="small"
                        sx={{
                            backgroundColor:
                                status === 'completed' ? '#d1fae5' :
                                    status === 'pending' ? '#fef3c7' :
                                        '#fee2e2',
                            color:
                                status === 'completed' ? '#065f46' :
                                    status === 'pending' ? '#92400e' :
                                        '#991b1b',
                            fontWeight: 500,
                            borderRadius: 1,
                            textTransform: 'capitalize',
                        }}
                    />
                );
            },
        },
    ];

    return (
        <Box sx={{ mt: 10, px: 3, pb: 4 }}>
            <AdminReusableTable
                columns={transactionColumns}
                data={transactions}
                title="Transactions"
                isLoading={transactionsLoading}
                emptyMessage="No transactions found"
                onExport={() => {
                    console.log('Export transactions');
                }}
            />
        </Box>
    );
};

export default Report;
