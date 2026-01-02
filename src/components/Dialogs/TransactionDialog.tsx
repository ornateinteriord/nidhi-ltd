import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Box,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useGetAdminTransactions } from '../../queries/Transaction';
import AdminReusableTable, { type ColumnDefinition } from '../../utils/AdminReusableTable';
import { type Transaction } from '../../types/Transaction';

interface TransactionDialogProps {
    open: boolean;
    onClose: () => void;
    memberId: string;
    accountType?: string;
}

const TransactionDialog: React.FC<TransactionDialogProps> = ({
    open,
    onClose,
    memberId,
    accountType
}) => {
    const { data, isLoading } = useGetAdminTransactions(memberId, accountType);

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
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    minHeight: '85vh'
                }
            }}
        >
            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #e2e8f0',
                pb: 2
            }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a237e' }}>
                        Transaction History
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Member ID: {memberId}
                        {accountType && ` | Account Type: ${accountType}`}
                    </Typography>
                </Box>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
                <AdminReusableTable
                    columns={columns}
                    data={data?.data || []}
                    title=""
                    isLoading={isLoading}
                    emptyMessage="No transactions found"
                    paginationPerPage={25}
                />
            </DialogContent>
        </Dialog>
    );
};

export default TransactionDialog;
