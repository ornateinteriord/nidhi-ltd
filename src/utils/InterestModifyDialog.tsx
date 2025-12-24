import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    IconButton,
    Box,
    Typography,
    Grid,
    CircularProgress,
    Backdrop,
    InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useGetInterestById } from '../queries/admin/index';

interface InterestFormData {
    ref_id: string;
    interest_name: string;
    interest_rate: string;
    duration: string;
    from_date: string;
    to_date: string;
}

interface InterestModifyDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: any, isEdit?: boolean) => void;
    interestId?: string | null;
    isLoading?: boolean;
}

const InterestModifyDialog: React.FC<InterestModifyDialogProps> = ({
    open,
    onClose,
    onSave,
    interestId,
    isLoading: externalLoading
}) => {
    const isEditMode = !!interestId;

    // Fetch interest data when editing
    const { data: interestData, isLoading: isFetching, isError } = useGetInterestById(
        interestId || '',
        isEditMode && open
    );

    const [formData, setFormData] = useState<InterestFormData>({
        ref_id: 'Loans',
        interest_name: '',
        interest_rate: '',
        duration: '',
        from_date: '',
        to_date: '',
    });

    // Account type options
    const accountTypes = ['Loans', 'Deposits'];

    // Interest type options based on account type
    const loanTypes = [
        'Gold Loan',
        'Vehicle Loan',
        'Education Loan',
        'Business Loan',
        'Mortage Loan',
        'OverDraft',
        'Personal Loan',
        'Agriculture Loan'
    ];

    const depositTypes = ['Fixed Deposit', 'Recurring Deposit', 'Savings'];

    const getInterestTypes = () => {
        return formData.ref_id === 'Loans' ? loanTypes : depositTypes;
    };

    // Update form data when interest data is fetched
    useEffect(() => {
        if (isEditMode && interestData?.data) {
            const interest = interestData.data;
            setFormData({
                ref_id: interest.ref_id || 'Loans',
                interest_name: interest.interest_name || '',
                interest_rate: interest.interest_rate?.toString() || '',
                duration: interest.duration?.toString() || '',
                from_date: interest.from_date ? new Date(interest.from_date).toISOString().split('T')[0] : '',
                to_date: interest.to_date ? new Date(interest.to_date).toISOString().split('T')[0] : '',
            });
        } else if (!isEditMode || isError || !open) {
            // Reset form for create mode, error, or dialog close
            setFormData({
                ref_id: 'Loans',
                interest_name: '',
                interest_rate: '',
                duration: '',
                from_date: '',
                to_date: '',
            });
        }
    }, [interestData, isEditMode, open, isError]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            // Reset interest_name if account type changes
            ...(name === 'ref_id' ? { interest_name: '' } : {})
        });
    };

    const handleSave = () => {
        const dataToSend = {
            ...formData,
            interest_rate: parseFloat(formData.interest_rate) || 0,
            duration: parseInt(formData.duration) || 0,
        };
        onSave(dataToSend, isEditMode);
    };

    const isLoading = isFetching || externalLoading;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            {/* Loading Backdrop */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position: 'absolute' }}
                open={!!isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <DialogTitle sx={{
                backgroundColor: '#1a237e',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 2,
            }}>
                <Typography variant="h6">
                    {isEditMode ? 'Update Interest Details' : 'Create New Interest'}
                </Typography>
                <IconButton onClick={onClose} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 3, backgroundColor: '#f8fafc' }}>
                <Box sx={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    p: 3,
                    border: '1px solid #e2e8f0',
                }}>
                    <Grid container spacing={3}>

                        {/* Account Type */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Account Type</InputLabel>
                                <Select
                                    name="ref_id"
                                    value={formData.ref_id}
                                    label="Account Type"
                                    onChange={handleSelectChange}
                                >
                                    {accountTypes.map((type) => (
                                        <MenuItem key={type} value={type}>{type}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Interest Type */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Interest Type</InputLabel>
                                <Select
                                    name="interest_name"
                                    value={formData.interest_name}
                                    label="Interest Type"
                                    onChange={handleSelectChange}
                                >
                                    {getInterestTypes().map((type) => (
                                        <MenuItem key={type} value={type}>{type}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Interest Rate */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Interest Rate"
                                name="interest_rate"
                                type="number"
                                value={formData.interest_rate}
                                onChange={handleChange}
                                size="small"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                                inputProps={{ step: "0.1", min: "0" }}
                            />
                        </Grid>

                        {/* Duration */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Duration"
                                name="duration"
                                type="number"
                                value={formData.duration}
                                onChange={handleChange}
                                size="small"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Months</InputAdornment>,
                                }}
                                inputProps={{ min: "0" }}
                            />
                        </Grid>

                        {/* From Date */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="From Date"
                                name="from_date"
                                type="date"
                                value={formData.from_date}
                                onChange={handleChange}
                                size="small"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        {/* To Date */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="To Date"
                                name="to_date"
                                type="date"
                                value={formData.to_date}
                                onChange={handleChange}
                                size="small"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                    </Grid>
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 3, backgroundColor: '#f8fafc' }}>
                <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={onClose}
                    sx={{ textTransform: 'none' }}
                    disabled={!!isLoading}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={!!isLoading}
                    sx={{
                        textTransform: 'none',
                        backgroundColor: '#1a237e',
                        '&:hover': { backgroundColor: '#283593' }
                    }}
                >
                    {isEditMode ? 'Update Interest' : 'Create Interest'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default InterestModifyDialog;
