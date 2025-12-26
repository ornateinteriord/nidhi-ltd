import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TransferMoneyDialog from '../../components/Wallet/TransferMoneyDialog';
import { useGetMyAccounts } from '../../queries/member';

const Wallet: React.FC = () => {
    const [transferDialogOpen, setTransferDialogOpen] = useState(false);
    const { data: accountsData, isLoading } = useGetMyAccounts();

    // Calculate total balance from all accounts
    const totalBalance = accountsData?.data?.accountTypes?.reduce((total: number, accType: any) => {
        const typeTotal = accType.accounts.reduce((sum: number, acc: any) => sum + (acc.account_amount || 0), 0);
        return total + typeTotal;
    }, 0) || 0;

    // Create breakdown by account type
    const accountBreakdown = accountsData?.data?.accountTypes?.map((accType: any) => {
        const typeTotal = accType.accounts.reduce((sum: number, acc: any) => sum + (acc.account_amount || 0), 0);
        return {
            type: accType.account_group_name,
            amount: typeTotal
        };
    }) || [];

    // Dummy transaction data
    const transactions = [
        { id: 1, date: '2023-10-25', description: 'Added Funds', amount: '+ ₹500.00', status: 'Success' },
        { id: 2, date: '2023-10-24', description: 'Transfer to User A', amount: '- ₹200.00', status: 'Success' },
        { id: 3, date: '2023-10-23', description: 'Withdrawal', amount: '- ₹1000.00', status: 'Pending' },
        { id: 4, date: '2023-10-20', description: 'Bonus', amount: '+ ₹50.00', status: 'Success' },
    ];

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1f2937' }}>
                My Wallet
            </Typography>

            {/* Balance Section */}
            <Card sx={{ mb: 4, borderRadius: '16px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', color: 'white' }}>
                <CardContent sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', p: 4 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>Total Balance</Typography>
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
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
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
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                            }}
                        >
                            Transfer
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<AccountBalanceWalletIcon />}
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                            }}
                        >
                            Withdraw
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {/* Transactions Section */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#374151' }}>
                Recent Transactions
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f9fafb' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id} hover>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell sx={{
                                    fontWeight: 'bold',
                                    color: transaction.amount.startsWith('+') ? 'green' : 'red'
                                }}>
                                    {transaction.amount}
                                </TableCell>
                                <TableCell>
                                    <Box sx={{
                                        display: 'inline-block',
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: '6px',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        bgcolor: transaction.status === 'Success' ? '#dcfce7' : '#fef9c3',
                                        color: transaction.status === 'Success' ? '#166534' : '#854d0e',
                                    }}>
                                        {transaction.status}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Transfer Dialog */}
            <TransferMoneyDialog
                open={transferDialogOpen}
                onClose={() => setTransferDialogOpen(false)}
            />
        </Box>
    );
};

export default Wallet;
