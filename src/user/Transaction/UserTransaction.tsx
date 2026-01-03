import React, { useState, useRef } from 'react';
import { Box, Typography, Card, CardContent, Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { useSearchParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { useGetUserTransactions } from '../../queries/Transaction';
import AdminReusableTable, { type ColumnDefinition } from '../../utils/AdminReusableTable';
import { type Transaction } from '../../types/Transaction';
import TablePDF, { PrintColumn } from '../../components/Print-components/TablePDF';

const UserTransaction: React.FC = () => {
    const [searchParams] = useSearchParams();
    const memberId = searchParams.get('memberid') || '';
    const accountType = searchParams.get('account_type') || undefined;
    const accountName = searchParams.get('account_name') || accountType; // For display

    const [printDialogOpen, setPrintDialogOpen] = useState(false);
    const tablePrintRef = useRef<HTMLDivElement>(null);

    const { data, isLoading, isError } = useGetUserTransactions(memberId, accountType);

    const handleTablePrint = useReactToPrint({
        contentRef: tablePrintRef,
    });

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

    const printColumns: PrintColumn[] = [
        { id: 'transaction_id', label: 'Txn ID', width: '12%' },
        { id: 'transaction_date', label: 'Date', width: '12%' },
        { id: 'account_type', label: 'Account', width: '10%' },
        { id: 'transaction_type', label: 'Type', width: '12%' },
        { id: 'description', label: 'Description', width: '20%' },
        { id: 'credit', label: 'Credit', width: '12%', align: 'right' },
        { id: 'debit', label: 'Debit', width: '12%', align: 'right' },
        { id: 'balance', label: 'Balance', width: '10%', align: 'right' },
    ];

    // Transform data for print
    const printData = (data?.data || []).map(row => ({
        ...row,
        transaction_date: new Date(row.transaction_date).toLocaleDateString('en-GB'),
        credit: row.credit > 0 ? `₹${row.credit.toLocaleString('en-IN')}` : '-',
        debit: row.debit > 0 ? `₹${row.debit.toLocaleString('en-IN')}` : '-',
        balance: `₹${row.balance.toLocaleString('en-IN')}`,
    }));

    return (
        <Box sx={{ mt: 10, px: 3 }}>
            <Card sx={{ mb: 3, borderRadius: 2 }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a237e', mb: 1 }}>
                            Transaction History
                        </Typography>
                        {accountName && (
                            <Typography variant="body2" color="text.secondary">
                                Showing transactions for {accountName} account
                            </Typography>
                        )}
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<PrintIcon />}
                        onClick={() => setPrintDialogOpen(true)}
                        disabled={!data?.data?.length}
                        sx={{ textTransform: 'none' }}
                    >
                        Print
                    </Button>
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
                            title={`Transaction History${accountName ? ` - ${accountName}` : ''}`}
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

export default UserTransaction;
