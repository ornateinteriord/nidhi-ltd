import React, { useState } from 'react';
import {
    Box, Typography, Card, CardContent, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Select, MenuItem, FormControl, InputLabel,
    CircularProgress, Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useCreatePaymentOrder } from '../../queries/Wallet/useWallet';
import { useGetMemberById, useGetMyAccounts } from '../../queries/Member';
import TokenService from '../../queries/token/tokenService';
import TransferMoneyDialog from '../../components/Wallet/TransferMoneyDialog';
import WithdrawMoneyDialog from '../../components/Wallet/WithdrawMoneyDialog';

const Wallet: React.FC = () => {
    const [transferDialogOpen, setTransferDialogOpen] = useState(false);
    const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
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

    const [openAddMoney, setOpenAddMoney] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [customAmount, setCustomAmount] = useState<string>('');
    const { mutate: createOrder, isPending } = useCreatePaymentOrder();
    const userId = TokenService.getMemberId();
    const { data: memberData } = useGetMemberById(userId || '');
    console.log("memberdata:", memberData)
    // Initialize Cashfree
    let cashfree: any;
    try {
        if ((window as any).Cashfree) {
            cashfree = new (window as any).Cashfree({
                mode: "sandbox", // or "production"
            });
        }
    } catch (e) {
        console.error("Cashfree SDK not found or failed to initialize", e);
    }

    const handleOpenAddMoney = () => {
        setOpenAddMoney(true);
    };

    const handleCloseAddMoney = () => {
        setOpenAddMoney(false);
        setAmount('');
        setCustomAmount('');
        setSelectedAccount('');
    };

    // Flatten accounts for dropdown (similar to TransferMoneyDialog)
    const myAccounts = accountsData?.data?.accountTypes?.flatMap((accType: any) =>
        accType.accounts.map((acc: any) => ({
            ...acc,
            account_type: accType.account_type,
            account_group_name: accType.account_group_name
        }))
    ) || [];

    const handleAddMoney = () => {
        const finalAmount = amount === 'custom' ? parseFloat(customAmount) : parseFloat(amount);
        if (finalAmount > 0) {
            const request = {
                member_id: memberData?.data?.member_id,
                amount: finalAmount,
                mobileno: memberData?.data?.contactno,
                Name: memberData?.data?.name,
                email: memberData?.data?.emailid,
                account_id: selectedAccount
            };

            if (!request.member_id) {
                console.error("Missing critical member data for payment");
                return;
            }

            createOrder(request, {
                onSuccess: (data: any) => {
                    console.log("Order created:", data);
                    // Initiate Cashfree Checkout
                    if (data?.payment_session_id && cashfree) {
                        cashfree.checkout({
                            paymentSessionId: data.payment_session_id
                        });
                    } else {
                        console.error("Missing payment session ID or Cashfree SDK");
                        // Fallback or error handling
                    }
                    handleCloseAddMoney();
                },
                onError: (error) => {
                    console.error("Error creating order:", error);
                    // Handle error
                }
            });
        }
    };

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
                            onClick={handleOpenAddMoney}
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
                            onClick={() => setWithdrawDialogOpen(true)}
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

            {/* Add Money Dialog */}
            <Dialog open={openAddMoney} onClose={handleCloseAddMoney} maxWidth="xs" fullWidth>
                <DialogTitle>Add Money to Wallet</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {memberData && (
                            <>
                                <TextField
                                    label="Member ID"
                                    value={memberData.data.member_id || ''}
                                    fullWidth
                                    disabled
                                    size="small"
                                />
                                <TextField
                                    label="Name"
                                    value={memberData.data.name || ''}
                                    fullWidth
                                    disabled
                                    size="small"
                                />
                                <TextField
                                    label="Mobile"
                                    value={memberData.data.contactno || ''}
                                    fullWidth
                                    disabled
                                    size="small"
                                />
                                <TextField
                                    label="Email"
                                    value={memberData.data.emailid || ''}
                                    fullWidth
                                    disabled
                                    size="small"
                                />
                            </>
                        )}
                        <TextField
                            select
                            fullWidth
                            value={selectedAccount}
                            onChange={(e) => setSelectedAccount(e.target.value)}
                            label="Select Account"
                            size="small"
                        >
                            {myAccounts.map((acc: any) => (
                                <MenuItem key={acc.account_id} value={acc.account_id}>
                                    {acc.account_group_name} - ₹{acc.account_amount.toFixed(2)} ({acc.account_no})
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormControl fullWidth>
                            <InputLabel id="amount-select-label">Select Amount</InputLabel>
                            <Select
                                labelId="amount-select-label"
                                value={amount}
                                label="Select Amount"
                                onChange={(e) => setAmount(e.target.value)}
                            >
                                <MenuItem value="100">₹100</MenuItem>
                                <MenuItem value="500">₹500</MenuItem>
                                <MenuItem value="1000">₹1000</MenuItem>
                                <MenuItem value="2000">₹2000</MenuItem>
                                <MenuItem value="custom">Custom Amount</MenuItem>
                            </Select>
                        </FormControl>
                        {amount === 'custom' && (
                            <TextField
                                label="Enter Amount"
                                type="number"
                                fullWidth
                                value={customAmount}
                                onChange={(e) => setCustomAmount(e.target.value)}
                                InputProps={{ inputProps: { min: 1 } }}
                            />
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddMoney}>Cancel</Button>
                    <Button
                        onClick={handleAddMoney}
                        variant="contained"
                        disabled={isPending || (amount === 'custom' && !customAmount) || (!amount) || !selectedAccount}
                    >
                        {isPending ? 'Processing...' : 'Add Money'}
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Transfer Money Dialog */}
            <TransferMoneyDialog
                open={transferDialogOpen}
                onClose={() => setTransferDialogOpen(false)}
            />

            {/* Withdraw Money Dialog */}
            <WithdrawMoneyDialog
                open={withdrawDialogOpen}
                onClose={() => setWithdrawDialogOpen(false)}
            />
        </Box>
    );
};

export default Wallet;
