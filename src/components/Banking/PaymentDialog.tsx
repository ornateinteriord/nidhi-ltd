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
import { useGetPaymentById, useCreatePayment, useUpdatePayment } from '../../queries/banking';
import TokenService from '../../queries/token/tokenService';

interface PaymentDialogProps {
    open: boolean;
    onClose: () => void;
    paymentId?: string | null;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ open, onClose, paymentId }) => {
    const branch_code = TokenService.getBranchCode() || 'BRN001';
    const entered_by = TokenService.getUserId() || '';

    const [formData, setFormData] = useState({
        payment_date: new Date().toISOString().split('T')[0],
        paid_to: '',
        member_name: '',
        account_type: '',
        payment_details: '',
        amount: '',
        mode_of_payment_paid: 'Cash',
        branch_code: branch_code,
        entered_by: entered_by,
    });

    const { data: paymentData, isLoading: loadingPayment } = useGetPaymentById(paymentId || '', !!paymentId);
    const createMutation = useCreatePayment();
    const updateMutation = useUpdatePayment();

    useEffect(() => {
        if (paymentId && paymentData?.success) {
            const payment = paymentData.data;
            setFormData({
                payment_date: payment.payment_date ? new Date(payment.payment_date).toISOString().split('T')[0] : '',
                paid_to: payment.paid_to || '',
                member_name: '',
                account_type: '',
                payment_details: payment.payment_details || '',
                amount: payment.amount?.toString() || '',
                mode_of_payment_paid: payment.mode_of_payment_paid || 'Cash',
                branch_code: payment.branch_code || branch_code,
                entered_by: payment.entered_by || entered_by,
            });
        } else if (!paymentId) {
            setFormData({
                payment_date: new Date().toISOString().split('T')[0],
                paid_to: '',
                member_name: '',
                account_type: '',
                payment_details: '',
                amount: '',
                mode_of_payment_paid: 'Cash',
                branch_code: branch_code,
                entered_by: entered_by,
            });
        }
    }, [paymentId, paymentData, branch_code, entered_by]);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        // Validation
        if (!formData.paid_to || !formData.amount || !formData.payment_details) {
            toast.error('Please fill all required fields');
            return;
        }

        const submitData = {
            ...formData,
            amount: parseFloat(formData.amount),
        };

        try {
            if (paymentId) {
                await updateMutation.mutateAsync({
                    paymentId: paymentId,
                    data: submitData
                });
                toast.success('Payment updated successfully');
            } else {
                await createMutation.mutateAsync(submitData);
                toast.success('Payment created successfully');
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
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 2
            }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {paymentId ? 'Modify Payment Voucher' : 'Add Payment Voucher'}
                </Typography>
                <IconButton onClick={onClose} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ mt: 3 }}>
                {loadingPayment ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Voucher No"
                                value={paymentId || 'Auto-generated'}
                                disabled
                                sx={{ '& .MuiInputBase-input': { fontWeight: 600, color: '#10b981' } }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Date Of Payment"
                                value={formData.payment_date}
                                onChange={(e) => handleChange('payment_date', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Paid To"
                                value={formData.paid_to}
                                onChange={(e) => handleChange('paid_to', e.target.value)}
                                placeholder="Enter paid to"
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
                                label="Paid Towards"
                                value={formData.payment_details}
                                onChange={(e) => handleChange('payment_details', e.target.value)}
                                placeholder="Enter payment details"
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
                                Payment Mode
                            </FormLabel>
                            <RadioGroup
                                row
                                value={formData.mode_of_payment_paid}
                                onChange={(e) => handleChange('mode_of_payment_paid', e.target.value)}
                            >
                                <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                                <FormControlLabel value="Cheque" control={<Radio />} label="Cheque" />
                                <FormControlLabel value="Net Banking" control={<Radio />} label="Net Banking" />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                )}
            </DialogContent>

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
                    disabled={isSubmitting || loadingPayment}
                    sx={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        px: 3,
                        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                    }}
                >
                    {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Submit'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PaymentDialog;
