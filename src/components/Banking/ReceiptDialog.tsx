import React, { useState, useEffect } from 'react';
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
    CircularProgress,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
    Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { useGetReceiptById, useCreateReceipt, useUpdateReceipt } from '../../queries/banking';
import TokenService from '../../queries/token/tokenService';

interface ReceiptDialogProps {
    open: boolean;
    onClose: () => void;
    receiptId?: string | null;
}

const ReceiptDialog: React.FC<ReceiptDialogProps> = ({ open, onClose, receiptId }) => {
    const branch_code = TokenService.getBranchCode() || 'BRN001';
    const entered_by = TokenService.getUserId() || '';

    const [formData, setFormData] = useState({
        receipt_date: new Date().toISOString().split('T')[0],
        received_from: '',
        member_name: '',
        account_type: '',
        receipt_details: '',
        amount: '',
        mode_of_payment_received: 'Cash',
        branch_code: branch_code,
        entered_by: entered_by,
    });

    const { data: receiptData, isLoading: loadingReceipt } = useGetReceiptById(receiptId || '', !!receiptId);
    const createMutation = useCreateReceipt();
    const updateMutation = useUpdateReceipt();

    useEffect(() => {
        if (receiptId && receiptData?.success) {
            const receipt = receiptData.data;
            setFormData({
                receipt_date: receipt.receipt_date ? new Date(receipt.receipt_date).toISOString().split('T')[0] : '',
                received_from: receipt.received_from || '',
                member_name: '',
                account_type: '',
                receipt_details: receipt.receipt_details || '',
                amount: receipt.amount?.toString() || '',
                mode_of_payment_received: receipt.mode_of_payment_received || 'Cash',
                branch_code: receipt.branch_code || branch_code,
                entered_by: receipt.entered_by || entered_by,
            });
        } else if (!receiptId) {
            setFormData({
                receipt_date: new Date().toISOString().split('T')[0],
                received_from: '',
                member_name: '',
                account_type: '',
                receipt_details: '',
                amount: '',
                mode_of_payment_received: 'Cash',
                branch_code: branch_code,
                entered_by: entered_by,
            });
        }
    }, [receiptId, receiptData, branch_code, entered_by]);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        // Validation
        if (!formData.received_from || !formData.amount || !formData.receipt_details) {
            toast.error('Please fill all required fields');
            return;
        }

        const submitData = {
            ...formData,
            amount: parseFloat(formData.amount),
        };

        try {
            if (receiptId) {
                await updateMutation.mutateAsync({
                    receiptId: receiptId,
                    data: submitData
                });
                toast.success('Receipt updated successfully');
            } else {
                await createMutation.mutateAsync(submitData);
                toast.success('Receipt created successfully');
            }
            onClose();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || 'Operation failed');
        }
    };

    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                }
            }}
        >
            <DialogTitle sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 2
            }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {receiptId ? 'Modify Receipt Voucher' : 'Add Receipt Voucher'}
                </Typography>
                <IconButton onClick={onClose} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ mt: 3 }}>
                {loadingReceipt ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={2}>

                        <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Date Of Receipt"
                                value={formData.receipt_date}
                                onChange={(e) => handleChange('receipt_date', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Receipt From"
                                value={formData.received_from}
                                onChange={(e) => handleChange('received_from', e.target.value)}
                                placeholder="Enter receipt from"
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Member Name"
                                value={formData.member_name}
                                onChange={(e) => handleChange('member_name', e.target.value)}
                                placeholder="Enter member name"
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Account Type"
                                value={formData.account_type}
                                onChange={(e) => handleChange('account_type', e.target.value)}
                                placeholder="Enter account type"
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Receipt Towards"
                                value={formData.receipt_details}
                                onChange={(e) => handleChange('receipt_details', e.target.value)}
                                placeholder="Enter receipt details"
                                required
                                multiline
                                rows={2}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Amount Paid (Rs.)"
                                value={formData.amount}
                                onChange={(e) => handleChange('amount', e.target.value)}
                                placeholder="0.00"
                                required
                                InputProps={{
                                    startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <FormLabel component="legend" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                                Receipt Mode
                            </FormLabel>
                            <RadioGroup
                                row
                                value={formData.mode_of_payment_received}
                                onChange={(e) => handleChange('mode_of_payment_received', e.target.value)}
                            >
                                <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                                <FormControlLabel value="Cheque" control={<Radio />} label="Cheque" />
                                <FormControlLabel value="Net Banking" control={<Radio />} label="Net Banking" />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                )}
            </DialogContent >

            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    disabled={isSubmitting}
                    sx={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        px: 3,
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={isSubmitting || loadingReceipt}
                    sx={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        px: 3,
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    }}
                >
                    {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Submit'}
                </Button>
            </DialogActions>
        </Dialog >
    );
};

export default ReceiptDialog;
