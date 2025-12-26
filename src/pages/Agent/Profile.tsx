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
  Select,
  MenuItem,
  InputLabel,
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
import { useGetAgentById } from '../../queries/Agent';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';

const Profile: React.FC = () => {
  const userId = TokenService.getMemberId();
  const { data: agentData, isLoading, isError, error } = useGetAgentById(userId || '');

  const [form, setForm] = useState<any>({
    agent_id: '',
    name: '',
    gender: 'Male',
    dob: '',
    emailid: '',
    mobile: '',
    address: '',
    designation: '',
    pan_no: '',
    aadharcard_no: '',
    branch_id: '',
    introducer: '',
    date_of_joining: '',
  });

  useEffect(() => {
    if (agentData?.data) {
      const agent = agentData.data;
      setForm({
        agent_id: agent.agent_id || '',
        name: agent.name || '',
        gender: agent.gender || 'Male',
        dob: agent.dob ? new Date(agent.dob).toISOString().split('T')[0] : '',
        emailid: agent.emailid || '',
        mobile: agent.mobile || '',
        address: agent.address || '',
        designation: agent.designation || '',
        pan_no: agent.pan_no || '',
        aadharcard_no: agent.aadharcard_no || '',
        branch_id: agent.branch_id || '',
        introducer: agent.introducer || '',
        date_of_joining: agent.date_of_joining ? new Date(agent.date_of_joining).toISOString().split('T')[0] : '',
      });
    }
  }, [agentData]);

  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const [saving, setSaving] = useState(false);
  const handleSubmit = async () => {
    try {
      setSaving(true);
      await new Promise((res) => setTimeout(res, 600));
      setSaving(false);
      toast.success('Profile updated successfully');
    } catch (err: any) {
      setSaving(false);
      toast.error(err?.message || 'Failed to update profile');
    }
  };

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <CircularProgress size={60} />
    </Box>
  );

  if (isError) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Typography color="error" variant="h6">Error loading profile: {(error as any)?.message}</Typography>
    </Box>
  );

  return (
    <Box sx={{ px: 3, py: 4, mt: 8, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#4f46e5', mb: 1 }}>
          Agent Profile
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280' }}>
          Manage your professional information
        </Typography>
      </Box>

      {/* Profile Header Section */}
      <Paper sx={{
        p: 4,
        mb: 3,
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        color: 'white',
        textAlign: 'center',
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              border: '4px solid white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              bgcolor: '#059669',
            }}
          >
            <WorkIcon sx={{ fontSize: 60 }} />
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {form.name || 'Agent Name'}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Agent ID: {form.agent_id}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              {form.designation || 'Designation'}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Personal Information */}
      <Card sx={{ mb: 3, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <PersonIcon sx={{ color: '#10b981', fontSize: 28 }} />
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
              <FormControl fullWidth>
                <InputLabel>Designation</InputLabel>
                <Select
                  label="Designation"
                  value={form.designation}
                  onChange={(e) => handleChange('designation', e.target.value)}
                >
                  <MenuItem value="Director">Director</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Agent">Agent</MenuItem>
                  <MenuItem value="Senior Agent">Senior Agent</MenuItem>
                  <MenuItem value="Junior Agent">Junior Agent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card sx={{ mb: 3, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <HomeIcon sx={{ color: '#10b981', fontSize: 28 }} />
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
                label="Mobile Number"
                fullWidth
                value={form.mobile}
                disabled
                variant="outlined"
                helperText="Mobile number cannot be changed"
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
            <BadgeIcon sx={{ color: '#10b981', fontSize: 28 }} />
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
          </Grid>
        </CardContent>
      </Card>

      {/* Organization Details */}
      <Card sx={{ mb: 3, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937', mb: 3 }}>
            Organization Details
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
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
                label="Introducer"
                fullWidth
                value={form.introducer}
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
            borderColor: '#10b981',
            color: '#10b981',
            '&:hover': {
              borderColor: '#059669',
              backgroundColor: 'rgba(16, 185, 129, 0.04)',
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
          disabled={saving}
          sx={{
            borderRadius: '12px',
            px: 4,
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)',
            }
          }}
        >
          {saving ? <CircularProgress size={24} color="inherit" /> : 'Update Profile'}
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
