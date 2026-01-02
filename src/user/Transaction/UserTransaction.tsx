import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useGetUserTransactions } from '../../queries/Transaction';
import AdminReusableTable, { type ColumnDefinition } from '../../utils/AdminReusableTable';
import { type Transaction } from '../../types/Transaction';

const UserTransaction: React.FC = () => {
    const [searchParams] = useSearchParams();
    const memberId = searchParams.get('memberid') || '';
    const accountType = searchParams.get('account_type') || undefined;
    const accountName = searchParams.get('account_name') || accountType; // For display

    const { data, isLoading, isError } = useGetUserTransactions(memberId, accountType);

    const columns: ColumnDefinition<Transaction>[] = [
        {
            id: 'transaction_id',
            label: 'Transaction ID',
            minWidth: 120,
            sortable: true,
        },
        {
            id: 'transaction_date',
            label: 'Date',
            minWidth: 120,
            sortable: true,
            renderCell: (row) => {
                return new Date(row.transaction_date).toLocaleDateString('en-GB');
            }
        },
        {
            id: 'account_type',
            label: 'Account Type',
            minWidth: 100,
        },
        {
            id: 'transaction_type',
            label: 'Type',
            minWidth: 120,
        },
        {
            id: 'description',
            label: 'Description',
            minWidth: 200,
        },
        {
            id: 'credit',
            label: 'Credit',
            minWidth: 100,
            align: 'right',
            renderCell: (row) => {
                return row.credit > 0 ? `₹${row.credit.toLocaleString('en-IN')}` : '-';
            }
        },
        {
            id: 'debit',
            label: 'Debit',
            minWidth: 100,
            align: 'right',
            renderCell: (row) => {
                return row.debit > 0 ? `₹${row.debit.toLocaleString('en-IN')}` : '-';
            }
        },
        {
            id: 'balance',
            label: 'Balance',
            minWidth: 120,
            align: 'right',
            renderCell: (row) => {
                return `₹${row.balance.toLocaleString('en-IN')}`;
            }
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 100,
        },
    ];

    return (
        <Box sx={{ mt: 10, px: 3 }}>
            <Card sx={{ mb: 3, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a237e', mb: 1 }}>
                        Transaction History
                    </Typography>
                    {accountName && (
                        <Typography variant="body2" color="text.secondary">
                            Showing transactions for {accountName} account
                        </Typography>
                    )}
                </CardContent>
            </Card>

            {isError ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="error">Failed to load transactions</Typography>
                </Box>
            ) : (
                <AdminReusableTable
                    columns={columns}
                    data={data?.data || []}
                    title=""
                    isLoading={isLoading}
                    emptyMessage="No transactions found"
                    paginationPerPage={25}
                />
            )}
        </Box>
    );
};

export default UserTransaction;
