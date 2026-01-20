import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Box,
    Grid,
    CircularProgress,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
    useCreateMemberAccount,
    useGetMemberAccountGroups,
    useGetMemberInterestsByAccountGroup,
    useGetMemberById
} from '../../queries/Member';
import TokenService from '../../queries/token/tokenService';

// Modern Input Styles
const inputStyle = {
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'white',
        borderRadius: 2,
        fontWeight: 500,
        '& fieldset': {
            borderColor: 'rgba(79, 70, 229, 0.25)',
            borderWidth: '1.5px',
        },
        '&:hover fieldset': {
            borderColor: '#4f46e5',
            borderWidth: '1.5px',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#4f46e5',
            borderWidth: '2.5px',
            boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)',
        },
    },
    '& .MuiInputLabel-root': {
        fontWeight: 500,
        '&.Mui-focused': {
            color: '#4f46e5',
            fontWeight: 600,
        },
    },
};

const readOnlyInputStyle = {
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#f8fafc',
        borderRadius: 2,
        '& fieldset': {
            borderColor: 'rgba(79, 70, 229, 0.15)',
            borderWidth: '1.5px',
            borderStyle: 'dashed',
        },
    },
    '& .MuiInputLabel-root': {
        fontWeight: 500,
        color: 'rgba(0,0,0,0.5)',
    },
};

const PigmyOpening: React.FC = () => {
    const navigate = useNavigate();
    const memberId = TokenService.getMemberId() || '';
    const [accountGroupId, setAccountGroupId] = useState<string>('');
    const [interestSlab, setInterestSlab] = useState<string>('');
    const [interestRate, setInterestRate] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [maturityDate, setMaturityDate] = useState<string>('');
    const [openingDate] = useState<string>(new Date().toISOString().split('T')[0]);

    // Fetch account groups to get PIGMY group ID
    const { data: accountGroupsData } = useGetMemberAccountGroups();

    // Fetch member info
    const { data: memberData, isLoading: loadingMember } = useGetMemberById(memberId);
    const memberInfo = memberData?.data;

    // Fetch interests based on account group ID
    const { data: interestsData, isLoading: loadingInterests } = useGetMemberInterestsByAccountGroup(
        accountGroupId,
        !!accountGroupId
    );

    const createAccountMutation = useCreateMemberAccount();

    useEffect(() => {
        console.log('Account Groups Data:', accountGroupsData);
        if (accountGroupsData?.data) {
            const pigmyGroup = accountGroupsData.data.find(
                (group: { account_group_name: string; }) => group.account_group_name?.toUpperCase()?.trim() === 'PIGMY'
            );
            console.log('Found Pigmy Group:', pigmyGroup);

            if (pigmyGroup) {
                setAccountGroupId(pigmyGroup.account_group_id);
                console.log('Set Account Group ID:', pigmyGroup.account_group_id);
            } else {
                console.warn('PIGMY account group not found check casing:', accountGroupsData.data);
            }
        }
    }, [accountGroupsData]);

    // Debug Interest Data
    useEffect(() => {
        console.log('Current Account Group ID:', accountGroupId);
        console.log('Interests Data:', interestsData);
        console.log('Loading Interests:', loadingInterests);
    }, [accountGroupId, interestsData, loadingInterests]);

    const calculateAge = (dob: string | Date): number => {
        if (!dob) return 0;
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const isSeniorCitizen = memberInfo?.dob ? calculateAge(memberInfo.dob) >= 60 : false;

    const handleInterestSlabChange = (interestId: string) => {
        setInterestSlab(interestId);

        if (interestsData?.data) {
            const interest = interestsData.data.find((i: { interest_id: string; }) => i.interest_id === interestId);
            if (interest) {
                const rate = isSeniorCitizen
                    ? (interest.interest_rate_senior || interest.interest_rate_general || interest.interest_rate || 0)
                    : (interest.interest_rate_general || interest.interest_rate || 0);
                const dur = interest.duration || 0;

                let matDate = '';
                if (openingDate && dur > 0) {
                    const openDate = new Date(openingDate);
                    openDate.setMonth(openDate.getMonth() + dur);
                    matDate = openDate.toISOString().split('T')[0];
                }

                setInterestRate(rate.toString());
                setDuration(dur.toString());
                setMaturityDate(matDate);
            }
        }
    };

    const handleSubmit = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }

        if (!interestSlab) {
            toast.error('Please select an interest slab');
            return;
        }

        try {
            const accountData = {
                branch_id: memberInfo?.branch_id,
                date_of_opening: openingDate,
                member_id: memberId,
                account_type: accountGroupId,
                account_operation: 'Single',
                introducer: memberInfo?.introducer, // Use member's introducer
                entered_by: memberId, // Self-service
                interest_id: interestSlab,
                interest_rate: parseFloat(interestRate) || 0,
                duration: parseInt(duration) || 0,
                date_of_maturity: maturityDate || null,
                account_amount: parseFloat(amount),
                // assigned_to: null, // Optional, can be left null for self-service
            };

            const result = await createAccountMutation.mutateAsync(accountData);

            if (result?.success) {
                toast.success('Pigmy Account created successfully!');
                navigate('/user/dashboard');
            }
        } catch (error: any) {
            toast.error(error?.message || 'Failed to create account');
        }
    };

    if (loadingMember) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Box sx={{ p: { xs: 2, sm: 3 }, mt: 8 }}> {/* Added margin top to avoid overlap with fixed navbar */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    color: '#4f46e5',
                    mb: 3,
                    textAlign: 'center'
                }}
            >
                Open Pigmy Account
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                <Grid size={{ xs: 12, md: 8 }}>
                    <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <AccountBalanceIcon sx={{ color: '#4f46e5', fontSize: 28 }} />
                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937' }}>
                                    Account Details
                                </Typography>
                            </Box>

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <FormControl fullWidth size="small" sx={readOnlyInputStyle}>
                                        <InputLabel>Account Type</InputLabel>
                                        <Select value="PIGMY" readOnly inputProps={{ readOnly: true }}>
                                            <MenuItem value="PIGMY">Pigmy Deposit</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        label="Broadcasting Date"
                                        type="date"
                                        fullWidth
                                        size="small"
                                        value={openingDate}
                                        InputProps={{ readOnly: true }}
                                        sx={readOnlyInputStyle}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <FormControl fullWidth size="small" sx={inputStyle}>
                                        <InputLabel>Select Plan (Duration)</InputLabel>
                                        <Select
                                            value={interestSlab}
                                            label="Select Plan (Duration)"
                                            onChange={(e) => handleInterestSlabChange(e.target.value)}
                                            disabled={loadingInterests}
                                        >
                                            {interestsData?.data?.map((interest: any) => (
                                                <MenuItem key={interest.interest_id} value={interest.interest_id}>
                                                    {interest.interest_name || `${interest.duration} Months`} - {interest.duration} Months
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        label="Duration (Months)"
                                        fullWidth
                                        size="small"
                                        value={duration}
                                        InputProps={{ readOnly: true }}
                                        sx={readOnlyInputStyle}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        label="Interest Rate"
                                        fullWidth
                                        size="small"
                                        value={interestRate ? `${interestRate}%` : ''}
                                        InputProps={{ readOnly: true }}
                                        sx={readOnlyInputStyle}
                                        helperText={isSeniorCitizen ? "Senior Citizen Rate Applied" : "General Rate Applied"}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        label="Maturity Date"
                                        type="date"
                                        fullWidth
                                        size="small"
                                        value={maturityDate}
                                        InputProps={{ readOnly: true }}
                                        sx={readOnlyInputStyle}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        label="Initial Deposit Amount (₹)"
                                        fullWidth
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        sx={inputStyle}
                                        placeholder="Enter amount"
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                                        <Button
                                            variant="outlined"
                                            onClick={() => navigate('/user/dashboard')}
                                            sx={{ borderRadius: '8px', textTransform: 'none' }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleSubmit}
                                            disabled={createAccountMutation.isPending}
                                            sx={{
                                                background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                px: 4
                                            }}
                                        >
                                            {createAccountMutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Open Account'}
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PigmyOpening;
