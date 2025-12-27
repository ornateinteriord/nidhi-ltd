
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Avatar,
    Box,
    CircularProgress,
    Grid,
    Divider,
    Paper
} from '@mui/material';
import { toast } from 'react-toastify';
import TokenService from '../../queries/token/tokenService';
import { useGetMemberById, useUpdateMemberProfile } from '../../queries/Member';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile: React.FC = () => {
    const userId = TokenService.getMemberId();
    const { data: userData, isLoading, isError, error } = useGetMemberById(userId || '');
    const updateProfileMutation = useUpdateMemberProfile();

    const [form, setForm] = useState<any>({
        member_id: '',
        name: '',
        father_name: '',
        gender: 'Male',
        dob: '',
        age: '',
        emailid: '',
        contactno: '',
        address: '',
        occupation: '',
        pan_no: '',
        aadharcard_no: '',
        voter_id: '',
        nominee: '',
        relation: '',
        introducer_name: '',
        branch_id: '',
        date_of_joining: '',
        receipt_no: '',
        member_image: '',
    });

    useEffect(() => {
        if (userData?.data) {
            const member = userData.data;
            setForm({
                member_id: member.member_id || '',
                name: member.name || '',
                father_name: member.father_name || '',
                gender: member.gender || 'Male',
                dob: member.dob ? new Date(member.dob).toISOString().split('T')[0] : '',
                age: member.age || '',
                emailid: member.emailid || '',
                contactno: member.contactno || '',
                address: member.address || '',
                occupation: member.occupation || '',
                pan_no: member.pan_no || '',
                aadharcard_no: member.aadharcard_no || '',
                voter_id: member.voter_id || '',
                nominee: member.nominee || '',
                relation: member.relation || '',
                introducer_name: member.introducer_name || '',
                branch_id: member.branch_id || '',
                date_of_joining: member.date_of_joining ? new Date(member.date_of_joining).toISOString().split('T')[0] : '',
                receipt_no: member.receipt_no || '',
                member_image: member.member_image || '',
            });
        }
    }, [userData]);

    const handleChange = (field: string, value: any) => {
        setForm((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const f = e.target.files[0];
            const url = URL.createObjectURL(f);
            setForm((prev: any) => ({ ...prev, member_image: url }));
        }
    };

    const handleSubmit = async () => {
        if (!userId) {
            toast.error('User ID not found');
            return;
        }

        try {
            const response = await updateProfileMutation.mutateAsync({
                memberId: userId,
                data: {
                    name: form.name,
                    father_name: form.father_name,
                    gender: form.gender,
                    dob: form.dob,
                    age: form.age,
                    address: form.address,
                    occupation: form.occupation,
                    pan_no: form.pan_no,
                    aadharcard_no: form.aadharcard_no,
                    voter_id: form.voter_id,
                    nominee: form.nominee,
                    relation: form.relation,
                    member_image: form.member_image,
                }
            });

            if (response.success) {
                toast.success(response.message || 'Profile updated successfully');
            } else {
                toast.error(response.message || 'Failed to update profile');
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message || err?.message || 'Failed to update profile');
        }
    };

    if (isLoading && userId) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <CircularProgress size={60} />
        </Box>
    );

    if (isError && userId) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <Typography color="error" variant="h6">Error loading profile: {(error as any)?.message}</Typography>
        </Box>
    );

    return (
        <Box sx={{ px: 3, py: 4, mt: 8, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            {/* Header */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#4f46e5', mb: 1 }}>
                    My Profile
                </Typography>
                <Typography variant="body1" sx={{ color: '#6b7280' }}>
                    Manage your personal information
                </Typography>
            </Box>

            {/* Profile Image Section */}
            <Paper sx={{
                p: 4,
                mb: 3,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                textAlign: 'center',
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Avatar
                        src={form.member_image || ''}
                        sx={{
                            width: 120,
                            height: 120,
                            border: '4px solid white',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        }}
                    >
                        <PersonIcon sx={{ fontSize: 60 }} />
                    </Avatar>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            {form.name || 'Member Name'}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            Member ID: {form.member_id}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.3)',
                            }
                        }}
                    >
                        Upload Photo
                        <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                    </Button>
                </Box>
            </Paper>

            {/* Personal Information */}
            <Card sx={{ mb: 3, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                        <AccountCircleIcon sx={{ color: '#6366f1', fontSize: 28 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937' }}>
                            Personal Information
                        </Typography>
                    </Box>
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Full Name"
                                fullWidth
                                value={form.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Father's Name"
                                fullWidth
                                value={form.father_name}
                                onChange={(e) => handleChange('father_name', e.target.value)}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Gender</Typography>
                                <RadioGroup
                                    row
                                    value={form.gender}
                                    onChange={(e) => handleChange('gender', e.target.value)}
                                >
                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Date of Birth"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={form.dob}
                                onChange={(e) => handleChange('dob', e.target.value)}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Age"
                                type="number"
                                fullWidth
                                value={form.age}
                                onChange={(e) => handleChange('age', e.target.value)}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Occupation"
                                fullWidth
                                value={form.occupation}
                                onChange={(e) => handleChange('occupation', e.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Contact Information */}
            <Card sx={{ mb: 3, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                        <HomeIcon sx={{ color: '#6366f1', fontSize: 28 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937' }}>
                            Contact Information
                        </Typography>
                    </Box>
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Email ID"
                                fullWidth
                                value={form.emailid}
                                disabled
                                variant="outlined"
                                helperText="Email cannot be changed"
                                sx={{
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        backgroundColor: '#f3f4f6',
                                        cursor: 'not-allowed',
                                    }
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Contact Number"
                                fullWidth
                                value={form.contactno}
                                disabled
                                variant="outlined"
                                helperText="Contact number cannot be changed"
                                sx={{
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        backgroundColor: '#f3f4f6',
                                        cursor: 'not-allowed',
                                    }
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Address"
                                multiline
                                rows={4}
                                fullWidth
                                value={form.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Identity Documents */}
            <Card sx={{ mb: 3, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                        <BadgeIcon sx={{ color: '#6366f1', fontSize: 28 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937' }}>
                            Identity Documents
                        </Typography>
                    </Box>
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="PAN Number"
                                fullWidth
                                value={form.pan_no}
                                onChange={(e) => handleChange('pan_no', e.target.value)}
                                variant="outlined"
                                inputProps={{ style: { textTransform: 'uppercase' } }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Aadhar Card Number"
                                fullWidth
                                value={form.aadharcard_no}
                                onChange={(e) => handleChange('aadharcard_no', e.target.value)}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Voter ID"
                                fullWidth
                                value={form.voter_id}
                                onChange={(e) => handleChange('voter_id', e.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Nominee & Other Details */}
            <Card sx={{ mb: 3, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937', mb: 3 }}>
                        Nominee & Other Details
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Nominee Name"
                                fullWidth
                                value={form.nominee}
                                onChange={(e) => handleChange('nominee', e.target.value)}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Relation with Nominee"
                                fullWidth
                                value={form.relation}
                                onChange={(e) => handleChange('relation', e.target.value)}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Introducer Name"
                                fullWidth
                                value={form.introducer_name}
                                disabled
                                variant="outlined"
                                sx={{
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        backgroundColor: '#f3f4f6',
                                    }
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Branch ID"
                                fullWidth
                                value={form.branch_id}
                                disabled
                                variant="outlined"
                                sx={{
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        backgroundColor: '#f3f4f6',
                                    }
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Date of Joining"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={form.date_of_joining}
                                disabled
                                variant="outlined"
                                sx={{
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        backgroundColor: '#f3f4f6',
                                    }
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Receipt Number"
                                fullWidth
                                value={form.receipt_no}
                                disabled
                                variant="outlined"
                                sx={{
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        backgroundColor: '#f3f4f6',
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                    variant="outlined"
                    size="large"
                    sx={{
                        borderRadius: '12px',
                        px: 4,
                        borderColor: '#6366f1',
                        color: '#6366f1',
                        '&:hover': {
                            borderColor: '#4f46e5',
                            backgroundColor: 'rgba(99, 102, 241, 0.04)',
                        }
                    }}
                    onClick={() => window.location.reload()}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleSubmit}
                    disabled={updateProfileMutation.isPending}
                    sx={{
                        borderRadius: '12px',
                        px: 4,
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                            boxShadow: '0 6px 16px rgba(99, 102, 241, 0.4)',
                        }
                    }}
                >
                    {updateProfileMutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Update Profile'}
                </Button>
            </Box>
        </Box>
    );
};

export default Profile;
