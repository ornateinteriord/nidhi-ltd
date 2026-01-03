import React, { useState, useRef } from 'react';
import { Box, Chip, Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';
import AdminReusableTable, { ColumnDefinition } from '../../utils/AdminReusableTable';
import { useGetUserTransactions } from '../../queries/User';
import TokenService from '../../queries/token/tokenService';
import { UserTransaction } from '../../types';
import TablePDF, { PrintColumn } from '../../components/Print-components/TablePDF';

const Report: React.FC = () => {
    const memberId = TokenService.getMemberId();
    const { data: transactionsData, isLoading: transactionsLoading } = useGetUserTransactions(memberId || '', !!memberId);

    const [printDialogOpen, setPrintDialogOpen] = useState(false);
    const tablePrintRef = useRef<HTMLDivElement>(null);

    const transactions = transactionsData?.data || [];

    const handleTablePrint = useReactToPrint({
        contentRef: tablePrintRef,
    });

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

    const printColumns: PrintColumn[] = [
        { id: 'transaction_date', label: 'Date', width: '12%' },
        { id: 'transaction_id', label: 'Txn ID', width: '12%' },
        { id: 'account_number', label: 'Account No', width: '12%' },
        { id: 'transaction_type', label: 'Type', width: '12%' },
        { id: 'description', label: 'Description', width: '16%' },
        { id: 'debit', label: 'Debit', width: '12%', align: 'right' },
        { id: 'credit', label: 'Credit', width: '12%', align: 'right' },
        { id: 'balance', label: 'Balance', width: '12%', align: 'right' },
    ];

    // Transform data for print
    const printData = transactions.map(row => ({
        ...row,
        transaction_date: new Date(row.transaction_date).toLocaleDateString('en-GB'),
        account_number: row.account_number || '-',
        description: row.description || '-',
        debit: row.debit > 0 ? `₹${row.debit.toLocaleString('en-IN')}` : '-',
        credit: row.credit > 0 ? `₹${row.credit.toLocaleString('en-IN')}` : '-',
        balance: `₹${row.balance.toLocaleString('en-IN')}`,
    }));

    return (
        <Box sx={{ mt: 10, px: 3, pb: 4 }}>
            <AdminReusableTable
                columns={transactionColumns}
                data={transactions}
                title="Transactions"
                isLoading={transactionsLoading}
                emptyMessage="No transactions found"
                actions={
                    <Button
                        variant="contained"
                        startIcon={<PrintIcon />}
                        onClick={() => setPrintDialogOpen(true)}
                        disabled={!transactions.length}
                        sx={{ textTransform: 'none' }}
                    >
                        Print
                    </Button>
                }
            />

            {/* Print Preview Dialog */}
            <Dialog
                open={printDialogOpen}
                onClose={() => setPrintDialogOpen(false)}
                maxWidth="lg"
                fullWidth
            >
                <DialogContent>
                    <Box ref={tablePrintRef}>
                        <TablePDF
                            title="Transaction Report"
                            columns={printColumns}
                            data={printData}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPrintDialogOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleTablePrint}
                        startIcon={<PrintIcon />}
                    >
                        Print
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Report;
