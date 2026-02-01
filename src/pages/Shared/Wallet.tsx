import React, { useState } from 'react';
import {
    Box, Typography, Card, CardContent, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useGetMemberCommissionTransactions } from '../../queries/Member';
import WithdrawMoneyDialog from '../../components/Wallet/WithdrawMoneyDialog';
import TokenService from '../../queries/token/tokenService';

const Wallet: React.FC = () => {
    const navigate = useNavigate();
    const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);

    const memberId = TokenService.getMemberId() || '';
    const {
        data: commissionData,
        isLoading: commissionLoading,
        error: commissionError
    } = useGetMemberCommissionTransactions(memberId);
    console.log("commission:0", commissionData)
    // Get commission balance from summary
    const commissionBalance = commissionData?.data?.summary?.availableBalance || 0;

    // Get commission transactions
    const transactions = commissionData?.data?.transactions || [];

    // Format transaction for display
    const formatTransaction = (transaction: any) => {
        // Backend now returns 'type' as CREDIT or DEBIT
        // 'commission_amount' for credits, 'amount' for debits (normalized to 'amount' in backend response usually) via the new map

        // The backend `getCommissionTransactions` manually constructs these objects now.
        // Check field names from backend map: amount, status, type, description, date

        const isCredit = transaction.type === 'CREDIT';
        const amount = transaction.amount || transaction.commission_amount || 0;

        return {
            id: transaction._id || transaction.transaction_id,
            date: new Date(transaction.date || transaction.createdAt).toLocaleDateString('en-IN'),
            description: transaction.description,
            amount: `${isCredit ? '+ ' : '- '}₹${Math.abs(amount).toFixed(2)}`,
            status: transaction.status,
            isCredit,
            type: isCredit ? 'commission_received' : 'commission_withdrawal'
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
                    color: '#667EEA',
                    fontWeight: 600,
                    '&:hover': {
                        bgcolor: 'rgba(102, 126, 234, 0.08)'
                    }
                }}
            >
                Back
            </Button>

            {/* Header */}
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1f2937' }}>
                My Wallet
            </Typography>

            {/* Commission Balance Section */}
            <Card sx={{
                mb: 4,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #667EEA 0%, #5B21B6 100%)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
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
                            Commission Balance
                        </Typography>
                        {commissionLoading ? (
                            <CircularProgress size={40} sx={{ color: 'white', mt: 1 }} />
                        ) : (
                            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                                ₹{commissionBalance.toFixed(2)}
                            </Typography>
                        )}
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Available for withdrawal
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mt: { xs: 3, md: 0 } }}>
                        <Button
                            variant="contained"
                            startIcon={<AccountBalanceWalletIcon />}
                            onClick={() => setWithdrawDialogOpen(true)}
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '12px',
                                px: 4,
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

            {/* Commission Transactions Section */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#374151' }}>
                Commission Transactions
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: '#6b7280' }}>
                Showing commission received and commission withdrawal transactions
            </Typography>

            {commissionLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress sx={{ color: '#667EEA' }} />
                </Box>
            ) : commissionError ? (
                <Alert severity="info" sx={{ borderRadius: '12px' }}>
                    No commission transactions found yet. Your commission history will appear here.
                </Alert>
            ) : transactions.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px', bgcolor: '#f9fafb' }}>
                    <AccountBalanceWalletIcon sx={{ fontSize: 48, color: '#9ca3af', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                        No commission transactions yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Your commission earnings and withdrawals will appear here
                    </Typography>
                </Paper>
            ) : (
                <TableContainer component={Paper} sx={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(102, 126, 234, 0.1)'
                }}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'rgba(102, 126, 234, 0.05)' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Description</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((transaction: any) => {
                                const formatted = formatTransaction(transaction);
                                return (
                                    <TableRow key={formatted.id} hover sx={{
                                        '&:hover': { bgcolor: 'rgba(102, 126, 234, 0.02)' }
                                    }}>
                                        <TableCell>{formatted.date}</TableCell>
                                        <TableCell>{formatted.description}</TableCell>
                                        <TableCell>
                                            <Box sx={{
                                                display: 'inline-block',
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: '6px',
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                bgcolor: formatted.isCredit ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                color: formatted.isCredit ? '#16a34a' : '#dc2626',
                                            }}>
                                                {formatted.isCredit ? 'Received' : 'Withdrawal'}
                                            </Box>
                                        </TableCell>
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
                                                bgcolor: formatted.status === 'CREDITED' || formatted.status === 'Success'
                                                    ? '#dcfce7'
                                                    : formatted.status === 'PENDING'
                                                        ? '#fef9c3'
                                                        : formatted.status === 'WITHDRAWN'
                                                            ? '#dbeafe'
                                                            : '#fee2e2',
                                                color: formatted.status === 'CREDITED' || formatted.status === 'Success'
                                                    ? '#166534'
                                                    : formatted.status === 'PENDING'
                                                        ? '#854d0e'
                                                        : formatted.status === 'WITHDRAWN'
                                                            ? '#1e40af'
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

            {/* Withdraw Dialog */}
            <WithdrawMoneyDialog
                open={withdrawDialogOpen}
                onClose={() => setWithdrawDialogOpen(false)}
                isCommission={true}
                availableBalance={commissionBalance}
            />
        </Box>
    );
};

export default Wallet;
