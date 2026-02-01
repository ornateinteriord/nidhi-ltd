import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    TextField,
    CircularProgress,
    Divider
} from '@mui/material';
import { toast } from 'react-toastify';
import { useApproveWithdrawal } from '../../../queries/admin/withdrawal';
import { useGetMemberById } from '../../../queries/Member';

interface PayWithdrawalDialogProps {
    open: boolean;
    onClose: () => void;
    request: any;
}

const PayWithdrawalDialog: React.FC<PayWithdrawalDialogProps> = ({ open, onClose, request }) => {
    const approveMutation = useApproveWithdrawal();
    const [remarks, setRemarks] = useState('');
    const [processing, setProcessing] = useState(false);

    // Fetch member details to get name
    const { data: memberData } = useGetMemberById(request?.member_id || '');
    const memberName = memberData?.data?.name || 'Loading...';

    if (!request) return null;

    const handleAction = async (action: 'Pay' | 'Reject') => {
        if (action === 'Reject' && !remarks) {
            toast.error("Please enter rejection remarks");
            return;
        }

        setProcessing(true);
        try {
            // Auto-generate transaction ID for admin payments
            const autoTransactionId = action === 'Pay' ? `ADM${Date.now()}` : '';

            const response = await approveMutation.mutateAsync({
                request_id: request.withdraw_request_id,
                action,
                transaction_id: autoTransactionId,
                remarks
            });

            if (response.success) {
                toast.success(response.message);
                onClose();
            } else {
                toast.error(response.message);
            }
        } catch (error: any) {
            toast.error(error?.message || "Action failed");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ bgcolor: '#f3f4f6', fontWeight: 'bold' }}>
                Process Withdrawal Request
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Member Name</Typography>
                    <Typography variant="body2" fontWeight="bold">{memberName}</Typography>

                    <Typography variant="body2" color="text.secondary">Member ID</Typography>
                    <Typography variant="body2" fontWeight="bold">{request.member_id}</Typography>

                    <Typography variant="body2" color="text.secondary">Amount</Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">₹{request.amount?.toFixed(2)}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Remarks (Optional / Required for Rejection)"
                        fullWidth
                        size="small"
                        multiline
                        rows={2}
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    onClick={() => handleAction('Reject')}
                    color="error"
                    variant="outlined"
                    disabled={processing}
                >
                    Reject
                </Button>
                <Button
                    onClick={() => handleAction('Pay')}
                    color="primary"
                    variant="contained"
                    disabled={processing}
                >
                    {processing ? <CircularProgress size={24} color="inherit" /> : 'Confirm Payment'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PayWithdrawalDialog;
