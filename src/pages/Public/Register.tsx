import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Card,
    CardContent,
    InputAdornment,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    Checkbox,
    CircularProgress,
    Link as MuiLink,
    Grid
} from '@mui/material';
// import Grid from '@mui/material/Grid2';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetSponsorByRef, usePublicRegister } from '../../queries/Auth';
import Footer from '../../components/Footer/Footer';

const Register = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const refCode = searchParams.get('ref') || '';

    const [formData, setFormData] = useState({
        sponsorCode: refCode,
        sponsorName: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNumber: '',
        pinCode: '',
        gender: 'Male',
        termsAccepted: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Fetch sponsor details
    const { data: sponsorData, isLoading: sponsorLoading, isError: sponsorError } = useGetSponsorByRef(refCode);

    // Register mutation
    const registerMutation = usePublicRegister();

    // Update sponsor name when data is fetched
    useEffect(() => {
        if (sponsorData?.data?.name) {
            setFormData(prev => ({
                ...prev,
                sponsorName: sponsorData.data.name,
            }));
        }
    }, [sponsorData]);

    // Update sponsor code from URL
    useEffect(() => {
        if (refCode) {
            setFormData(prev => ({
                ...prev,
                sponsorCode: refCode,
            }));
        }
    }, [refCode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
        else if (!/^\d{10}$/.test(formData.mobileNumber)) newErrors.mobileNumber = 'Enter valid 10-digit number';
        if (!formData.pinCode.trim()) newErrors.pinCode = 'Pin code is required';
        else if (!/^\d{6}$/.test(formData.pinCode)) newErrors.pinCode = 'Enter valid 6-digit pin code';
        if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept terms and conditions';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await registerMutation.mutateAsync({
                name: formData.fullName,
                emailid: formData.email,
                password: formData.password,
                contactno: formData.mobileNumber,
                pincode: formData.pinCode,
                gender: formData.gender,
                introducer: formData.sponsorCode,
                introducer_name: formData.sponsorName,
            });

            if (response.success) {
                toast.success('Registration successful! Please login.');
                navigate('/login');
            } else {
                toast.error(response.message || 'Registration failed');
            }
        } catch (error: any) {
            toast.error(error?.message || 'Registration failed. Please try again.');
        }
    };

    const isLoading = registerMutation.isPending;

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', mt: { xs: 3, md: 6 } }}>
            {/* Purple Header */}
            {/* <Box
                sx={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                    py: 3,
                    px: 2,
                }}
            >
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                    MSI
                </Typography>
            </Box> */}

            <Container component="main" maxWidth="md" sx={{ flex: 1, py: 4 }}>
                <Card sx={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
                    <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                {/* Left Column */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    {/* Sponsor Code */}
                                    <TextField
                                        fullWidth
                                        label="Sponsor Code"
                                        name="sponsorCode"
                                        value={formData.sponsorCode}
                                        InputProps={{
                                            readOnly: true,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon sx={{ color: '#7c3aed' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ mb: 3, backgroundColor: '#f8fafc' }}
                                    />

                                    {/* Sponsor Name */}
                                    <TextField
                                        fullWidth
                                        label="Sponsor Name"
                                        name="sponsorName"
                                        value={formData.sponsorName}
                                        InputProps={{
                                            readOnly: true,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon sx={{ color: '#7c3aed' }} />
                                                </InputAdornment>
                                            ),
                                            endAdornment: sponsorLoading ? (
                                                <InputAdornment position="end">
                                                    <CircularProgress size={20} />
                                                </InputAdornment>
                                            ) : null,
                                        }}
                                        sx={{ mb: 3, backgroundColor: '#f8fafc' }}
                                        placeholder={sponsorError ? 'Sponsor not found' : 'Sponsor Name'}
                                        error={sponsorError}
                                        helperText={sponsorError ? 'Invalid sponsor code' : ''}
                                    />
                                </Grid>

                                {/* Right Column */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    {/* Full Name */}
                                    <TextField
                                        fullWidth
                                        required
                                        label="Full Name"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        error={!!errors.fullName}
                                        helperText={errors.fullName}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon sx={{ color: '#7c3aed' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        placeholder="Enter your full name"
                                        sx={{ mb: 3 }}
                                    />

                                    {/* Email */}
                                    <TextField
                                        fullWidth
                                        required
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon sx={{ color: '#7c3aed' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ mb: 3 }}
                                    />
                                </Grid>

                                {/* Password Row */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={!!errors.password}
                                        helperText={errors.password}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon sx={{ color: '#7c3aed' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon sx={{ color: '#7c3aed' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        placeholder="Confirm your password"
                                    />
                                </Grid>

                                {/* Mobile & Pin Code Row */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Mobile Number"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                            setFormData(prev => ({ ...prev, mobileNumber: value }));
                                        }}
                                        error={!!errors.mobileNumber}
                                        helperText={errors.mobileNumber}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PhoneIcon sx={{ color: '#7c3aed' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        placeholder="Enter your number"
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Pin Code"
                                        name="pinCode"
                                        value={formData.pinCode}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                            setFormData(prev => ({ ...prev, pinCode: value }));
                                        }}
                                        error={!!errors.pinCode}
                                        helperText={errors.pinCode}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationOnIcon sx={{ color: '#7c3aed' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        placeholder="Enter your pincode"
                                    />
                                </Grid>

                                {/* Gender */}
                                <Grid size={12}>
                                    <FormControl component="fieldset">
                                        <FormLabel sx={{ color: '#7c3aed', fontWeight: 600 }}>Gender:</FormLabel>
                                        <RadioGroup
                                            row
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="Male" control={<Radio sx={{ color: '#7c3aed', '&.Mui-checked': { color: '#7c3aed' } }} />} label="Male" />
                                            <FormControlLabel value="Female" control={<Radio sx={{ color: '#7c3aed', '&.Mui-checked': { color: '#7c3aed' } }} />} label="Female" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                {/* Terms & Conditions */}
                                <Grid size={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="termsAccepted"
                                                checked={formData.termsAccepted}
                                                onChange={handleChange}
                                                sx={{ color: '#7c3aed', '&.Mui-checked': { color: '#7c3aed' } }}
                                            />
                                        }
                                        label={
                                            <Typography variant="body2">
                                                I accept the{' '}
                                                <MuiLink component={Link} to="/terms" sx={{ color: '#7c3aed' }}>
                                                    Terms and Conditions
                                                </MuiLink>
                                            </Typography>
                                        }
                                    />
                                    {errors.termsAccepted && (
                                        <Typography variant="caption" color="error">
                                            {errors.termsAccepted}
                                        </Typography>
                                    )}
                                </Grid>

                                {/* Register Button */}
                                <Grid size={12}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={isLoading || sponsorError}
                                            sx={{
                                                backgroundColor: '#9ca3af',
                                                px: 6,
                                                py: 1.5,
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                '&:hover': {
                                                    backgroundColor: '#7c3aed',
                                                },
                                                '&:disabled': {
                                                    backgroundColor: '#d1d5db',
                                                },
                                            }}
                                        >
                                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'REGISTER'}
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Login Link */}
                        <Typography variant="body2" sx={{ textAlign: 'center', mt: 3 }}>
                            Have an account?{' '}
                            <MuiLink component={Link} to="/login" sx={{ color: '#7c3aed', fontWeight: 600 }}>
                                Login
                            </MuiLink>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>

            <Footer />
        </Box>
    );
};

export default Register;
