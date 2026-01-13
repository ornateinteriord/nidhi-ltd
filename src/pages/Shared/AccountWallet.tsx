import React, { useState } from 'react';
import {
    Box, Typography, Card, CardContent, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, CircularProgress, Chip, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useGetMyAccounts, useGetMemberTransactions } from '../../queries/Member';
import TransferMoneyDialog from '../../components/Wallet/TransferMoneyDialog';
import AddMoneyDialog from '../../components/Wallet/AddMoneyDialog';
import WithdrawMoneyDialog from '../../components/Wallet/WithdrawMoneyDialog';
import TokenService from '../../queries/token/tokenService';

const AccountWallet: React.FC = () => {
    const navigate = useNavigate();
    const [transferDialogOpen, setTransferDialogOpen] = useState(false);
    const [addMoneyDialogOpen, setAddMoneyDialogOpen] = useState(false);
    const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);

    const memberId = TokenService.getMemberId();
    const { data: accountsData, isLoading } = useGetMyAccounts();
    const {
        data: transactionsData,
        isLoading: transactionsLoading,
        error: transactionsError
    } = useGetMemberTransactions(
        memberId || '',
        !!memberId
    );
    console.log("transaction data from user :", transactionsData)
    // Get total balance from backend (already calculated)
    const totalBalance = accountsData?.data?.totalBalance || 0;

    // Create breakdown by account type
    const accountBreakdown = accountsData?.data?.accountTypes?.map((accType: any) => {
        const typeTotal = accType.accounts.reduce((sum: number, acc: any) => sum + (acc.account_amount || 0), 0);
        return {
            type: accType.account_group_name,
            amount: typeTotal
        };
    }) || [];

    // Get real transactions
    const transactions = transactionsData?.data || [];
    console.log("Account transactions:", transactionsData);

    // Format transaction for display
    const formatTransaction = (transaction: any) => {
        const credit = transaction.credit || 0;
        const debit = transaction.debit || 0;
        const amount = credit > 0 ? credit : debit;
        const isCredit = credit > 0;

        return {
            id: transaction._id || transaction.transaction_id,
            date: new Date(transaction.transaction_date).toLocaleDateString('en-IN'),
            description: transaction.description || 'Transaction',
            amount: `${isCredit ? '+ ' : '- '}₹${Math.abs(amount).toFixed(2)}`,
            status: transaction.status || 'Pending',
            isCredit
        };
    };

    return (
        <Box sx={{ p: { xs: 2, sm: 3 }, mt: { xs: 2, sm: 8 } }}>
            {/* Back Button */}
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{
                    mb: 3,
                    color: '#10B981',
                    fontWeight: 600,
                    '&:hover': {
                        bgcolor: 'rgba(16, 185, 129, 0.08)'
                    }
                }}
            >
                Back
            </Button>

            {/* Header */}
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1f2937' }}>
                Account Wallet
            </Typography>

            {/* Balance Section */}
            <Card sx={{
                mb: 4,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)'
            }}>
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 4
                }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
                            Total Account Balance
                        </Typography>
                        {isLoading ? (
                            <CircularProgress size={40} sx={{ color: 'white', mt: 1 }} />
                        ) : (
                            <>
                                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                                    ₹{totalBalance.toFixed(2)}
                                </Typography>
                                {/* Account Breakdown */}
                                {accountBreakdown.length > 0 && (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                                        {accountBreakdown.map((acc: any, index: number) => (
                                            <Chip
                                                key={index}
                                                label={`${acc.type} - ₹${acc.amount.toFixed(2)}`}
                                                sx={{
                                                    bgcolor: 'rgba(255,255,255,0.2)',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                    backdropFilter: 'blur(10px)'
                                                }}
                                            />
                                        ))}
                                    </Box>
                                )}
                            </>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mt: { xs: 3, md: 0 } }}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setAddMoneyDialogOpen(true)}
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '12px',
                                px: 3,
                                py: 1.5,
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.3)',
                                    transform: 'scale(1.02)'
                                }
                            }}
                        >
                            Add Money
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<SwapHorizIcon />}
                            onClick={() => setTransferDialogOpen(true)}
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '12px',
                                px: 3,
                                py: 1.5,
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.3)',
                                    transform: 'scale(1.02)'
                                }
                            }}
                        >
                            Transfer
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<AccountBalanceWalletIcon />}
                            onClick={() => setWithdrawDialogOpen(true)}
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '12px',
                                px: 3,
                                py: 1.5,
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.3)',
                                    transform: 'scale(1.02)'
                                }
                            }}
                        >
                            Withdraw
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {/* Transactions Section */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#374151' }}>
                Recent Account Transactions
            </Typography>

            {transactionsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress sx={{ color: '#10B981' }} />
                </Box>
            ) : transactionsError ? (
                <Alert severity="error" sx={{ borderRadius: '12px' }}>
                    Failed to load transactions. Please try again later.
                </Alert>
            ) : transactions.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px' }}>
                    <Typography variant="body1" color="text.secondary">
                        No transactions yet
                    </Typography>
                </Paper>
            ) : (
                <TableContainer component={Paper} sx={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(16, 185, 129, 0.1)'
                }}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'rgba(16, 185, 129, 0.05)' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Description</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((transaction: any) => {
                                const formatted = formatTransaction(transaction);
                                return (
                                    <TableRow key={formatted.id} hover sx={{
                                        '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.02)' }
                                    }}>
                                        <TableCell>{formatted.date}</TableCell>
                                        <TableCell>{formatted.description}</TableCell>
                                        <TableCell sx={{
                                            fontWeight: 'bold',
                                            color: formatted.isCredit ? '#16a34a' : '#dc2626'
                                        }}>
                                            {formatted.amount}
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{
                                                display: 'inline-block',
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: '6px',
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                bgcolor: formatted.status === 'Success' || formatted.status === 'Completed'
                                                    ? '#dcfce7'
                                                    : formatted.status === 'Pending'
                                                        ? '#fef9c3'
                                                        : '#fee2e2',
                                                color: formatted.status === 'Success' || formatted.status === 'Completed'
                                                    ? '#166534'
                                                    : formatted.status === 'Pending'
                                                        ? '#854d0e'
                                                        : '#991b1b',
                                            }}>
                                                {formatted.status}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Dialogs */}
            <AddMoneyDialog
                open={addMoneyDialogOpen}
                onClose={() => setAddMoneyDialogOpen(false)}
            />

            <TransferMoneyDialog
                open={transferDialogOpen}
                onClose={() => setTransferDialogOpen(false)}
            />

            <WithdrawMoneyDialog
                open={withdrawDialogOpen}
                onClose={() => setWithdrawDialogOpen(false)}
            />
        </Box>
    );
};

export default AccountWallet;
