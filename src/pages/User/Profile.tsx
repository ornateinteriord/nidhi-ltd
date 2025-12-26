
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
    Grid
} from '@mui/material';
import { toast } from 'react-toastify';
import TokenService from '../../queries/token/tokenService';
import { useGetMemberById } from '../../queries/member';

const Profile: React.FC = () => {
    const userId = TokenService.getMemberId();
    // TODO: Replace with user specific query if available, currently simulating or reusing
    const { data: userData, isLoading, isError, error } = useGetMemberById(userId || '');

    const [form, setForm] = useState<any>({
        name: '',
        gender: '',
        dob: '',
        email: '',
        contact: '',
        address: '',
        designation: '',
        pan: '',
        aadhar: '',
        branchCode: '',
        introducer: '',
        profileImage: '',
    });

    useEffect(() => {
        if (userData?.data) {
            const a = userData.data;
            setForm({
                name: a.name || '',
                gender: a.gender || '',
                dob: a.dob || '',
                email: a.emailid || '',
                contact: a.contactno || '',
                address: a.address || '',
                designation: a.occupation || '', // Defaulting for user
                pan: a.pan_no || '',
                aadhar: a.aadharcard_no || '',
                branchCode: a.branch_id || '',
                introducer: a.introducer || '',
                profileImage: '',
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
            setForm((prev: any) => ({ ...prev, profileImage: url }));
        }
    };

    const [saving, setSaving] = useState(false);
    const handleSubmit = async () => {
        try {
            setSaving(true);
            await new Promise((res) => setTimeout(res, 600));
            setSaving(false);
            toast.success('Profile updated');
        } catch (err: any) {
            setSaving(false);
            toast.error(err?.message || 'Failed to update profile');
        }
    };

    if (isLoading)
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh", // full page height
                    width: "100%",
                }}
            >
                <CircularProgress />
            </Box>
        );
    if (isError && userId) return <Typography color="error" align="center" sx={{ color: "red" }} mt={4}>Error loading profile: {(error as any)?.message}</Typography>;

    return (
        <div className="mt-6 px-3">
            <Typography variant="h5" sx={{ mb: 2, fontWeight: '600', mt: 10 }}>My Profile</Typography>

            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid container size={{ xs: 12, md: 6 }} spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    label="Name"
                                    fullWidth
                                    value={form.name || ''}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <FormControl component="fieldset">
                                    <Typography variant="body2" sx={{ mb: 1 }}>Gender</Typography>
                                    <RadioGroup
                                        row
                                        value={form.gender || 'Male'}
                                        onChange={(e) => handleChange('gender', e.target.value)}
                                    >
                                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Date Of Birth"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={form.dob || ''}
                                    onChange={(e) => handleChange('dob', e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Email ID"
                                    fullWidth
                                    value={form.email || ''}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Contact No"
                                    fullWidth
                                    value={form.contact || ''}
                                    onChange={(e) => handleChange('contact', e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    label="Address"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    value={form.address || ''}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container size={{ xs: 12, md: 6 }} spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Pan No"
                                    fullWidth
                                    value={form.pan || ''}
                                    onChange={(e) => handleChange('pan', e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Aadharcard No"
                                    fullWidth
                                    value={form.aadhar || ''}
                                    onChange={(e) => handleChange('aadhar', e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Branch Code"
                                    fullWidth
                                    value={form.branchCode || ''}
                                    onChange={(e) => handleChange('branchCode', e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField label="Introducer" fullWidth value={form.introducer || ''} InputProps={{ readOnly: true }} />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }} className="flex items-center gap-3">
                                <Box>
                                    <Typography variant="body2">Profile Image</Typography>
                                    <input type="file" onChange={handleFileChange} />
                                </Box>
                                <Avatar src={form.profileImage || ''} sx={{ width: 56, height: 56 }} />
                            </Grid>

                            <Grid size={{ xs: 12 }} className="flex justify-end">
                                <Button variant="contained" color="success" onClick={handleSubmit} disabled={saving}>
                                    {saving ? <CircularProgress size={20} color="inherit" /> : 'Update'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
