import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    IconButton,
    InputAdornment,
    MenuItem,
    CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useCreatePaymentOrder } from '../../queries/Wallet/useWallet';
import { useGetMemberById, useGetMyAccounts } from '../../queries/Member';
import TokenService from '../../queries/token/tokenService';
import { toast } from 'react-toastify';

interface AddMoneyDialogProps {
    open: boolean;
    onClose: () => void;
}

const AddMoneyDialog: React.FC<AddMoneyDialogProps> = ({ open, onClose }) => {
    const [amount, setAmount] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');

    const userId = TokenService.getMemberId();
    const { data: memberData } = useGetMemberById(userId || '');
    const { data: accountsData, isLoading: accountsLoading } = useGetMyAccounts();
    const { mutate: createOrder, isPending } = useCreatePaymentOrder();

    // Note: Using URL redirect method instead of SDK checkout
    // This bypasses SDK compatibility issues

    // Flatten accounts for dropdown
    const myAccounts = accountsData?.data?.accountTypes?.flatMap((accType: any) =>
        accType.accounts.map((acc: any) => ({
            ...acc,
            account_type: accType.account_type,
            account_group_name: accType.account_group_name
        }))
    ) || [];

    const handleClose = () => {
        setAmount('');
        setSelectedAccount('');
        onClose();
    };

    const handleAddMoney = () => {
        const finalAmount = parseFloat(amount);
        if (finalAmount > 0 && selectedAccount) {
            // Find the selected account object to get all details
            const accountDetails = myAccounts.find((acc: any) => acc.account_id === selectedAccount);

            if (!accountDetails) {
                toast.error("Selected account not found. Please try again.");
                return;
            }

            const request = {
                member_id: memberData?.data?.member_id,
                amount: finalAmount,
                mobileno: memberData?.data?.contactno,
                Name: memberData?.data?.name,
                email: memberData?.data?.emailid,
                account_id: accountDetails.account_id,
                account_no: accountDetails.account_no,
                account_type: accountDetails.account_type
            };

            if (!request.member_id) {
                toast.error("Missing member information. Please try again.");
                return;
            }

            createOrder(request, {
                onSuccess: (data: any) => {
                    console.log("💳 Payment created:", data);

                    // Handle both Payment Session (Orders) and Payment Link response patterns
                    // const redirectUrl = data.link_url || data.checkout_url || data.payment_session_id ? `https://sandbox.cashfree.com/pg/view/sessions?session_id=${data.payment_session_id}` : null;

                    // Specific check for payment link URL (Backend seems to be returning this now)
                    if (data.link_url) {
                        console.log("🔗 Redirecting to Payment Link:", data.link_url);
                        window.location.href = data.link_url;
                        return;
                    }

                    if (data.checkout_url) {
                        console.log("🚀 Redirecting to Checkout URL:", data.checkout_url);
                        window.location.href = data.checkout_url;
                        return;
                    }

                    if (data.payment_session_id) {
                        const sessionUrl = `https://sandbox.cashfree.com/pg/orders/sessions/pay?payment_session_id=${data.payment_session_id}`;
                        console.log("🚀 Redirecting to Session URL:", sessionUrl);
                        window.location.href = sessionUrl;
                        return;
                    }

                    console.error("❌ No valid redirect URL found in response");
                    toast.error("Invalid payment response received");
                },
                onError: (error: any) => {
                    console.error("❌ Order creation failed:", error);
                    console.error("Response data:", error?.response?.data);
                    toast.error(error?.response?.data?.message || "Failed to create payment order");
                }
            });
        } else {
            toast.error("Please enter a valid amount and select an account");
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                }
            }}
        >
            <DialogTitle sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AddIcon />
                    <Typography variant="h6">Add Money to Wallet</Typography>
                </Box>
                <IconButton onClick={handleClose} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        select
                        fullWidth
                        value={selectedAccount}
                        onChange={(e) => setSelectedAccount(e.target.value)}
                        label="Select Account"
                        disabled={accountsLoading}
                    >
                        {accountsLoading ? (
                            <MenuItem disabled>
                                <CircularProgress size={20} />
                            </MenuItem>
                        ) : (
                            myAccounts.map((acc: any) => (
                                <MenuItem key={acc.account_id} value={acc.account_id}>
                                    {acc.account_group_name} - ₹{acc.account_amount.toFixed(2)} ({acc.account_no})
                                </MenuItem>
                            ))
                        )}
                    </TextField>

                    <TextField
                        label="Enter Amount"
                        type="number"
                        fullWidth
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        InputProps={{
                            inputProps: { min: 1 },
                            startAdornment: <InputAdornment position="start">₹</InputAdornment>
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: '8px' }}>
                    Cancel
                </Button>
                <Button
                    onClick={handleAddMoney}
                    variant="contained"
                    disabled={isPending || !amount || !selectedAccount || parseFloat(amount) <= 0}
                    sx={{
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                        px: 4
                    }}
                >
                    {isPending ? <CircularProgress size={24} color="inherit" /> : 'Add Money'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddMoneyDialog;
