import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
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
} from '@mui/material';
import { toast } from 'react-toastify';

const Profile: React.FC = () => {
  // Temporary local/dummy data (do not call APIs)
  const dummyMember = {
    Name: 'MANJUNATH',
    Gender: 'Male',
    Date_of_birth: '1980-04-14',
    email: 'manjunath14480@gmail.com',
    Mobile: '9100000000',
    Address: 'magadi road machohalli bangalore',
    Designation: 'Director',
    PAN: 'AKPPN956mm',
    Aadhar: '9100000000',
    BranchCode: 'BRN001',
    Introducer: '10512',
    profile_image: '',
  };

  const [form, setForm] = useState<any>({
    name: dummyMember.Name,
    gender: dummyMember.Gender,
    dob: dummyMember.Date_of_birth,
    email: dummyMember.email,
    contact: dummyMember.Mobile,
    address: dummyMember.Address,
    designation: dummyMember.Designation,
    pan: dummyMember.PAN,
    aadhar: dummyMember.Aadhar,
    branchCode: dummyMember.BranchCode,
    introducer: dummyMember.Introducer,
    profileImage: dummyMember.profile_image,
  });
  // removed file state since we're using a local dummy preview

  useEffect(() => {
    // this effect keeps a default but can be used for any client-side initialization
    setForm((prev: any) => ({ ...prev }));
  }, []);

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
      // simulate API call
      await new Promise((res) => setTimeout(res, 600));
      setSaving(false);
      toast.success('Profile updated (dummy)');
    } catch (err: any) {
      setSaving(false);
      toast.error(err?.message || 'Failed to update profile');
    }
  };

  // No API call - always render the form with dummy data

  return (
    <div className="mt-6 px-3">
      <Typography variant="h5" sx={{ mb: 2, fontWeight: '600',mt:10 }}>My Profile</Typography>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    fullWidth
                    value={form.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
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

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date Of Birth"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={form.dob || ''}
                    onChange={(e) => handleChange('dob', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email ID"
                    fullWidth
                    value={form.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Contact No"
                    fullWidth
                    value={form.contact || ''}
                    onChange={(e) => handleChange('contact', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="designation-label">Designation</InputLabel>
                    <Select
                      labelId="designation-label"
                      label="Designation"
                      value={form.designation || ''}
                      onChange={(e) => handleChange('designation', e.target.value)}
                    >
                      <MenuItem value="Director">Director</MenuItem>
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="Agent">Agent</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Pan No"
                    fullWidth
                    value={form.pan || ''}
                    onChange={(e) => handleChange('pan', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Aadharcard No"
                    fullWidth
                    value={form.aadhar || ''}
                    onChange={(e) => handleChange('aadhar', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Branch Code"
                    fullWidth
                    value={form.branchCode || ''}
                    onChange={(e) => handleChange('branchCode', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField label="Introducer" fullWidth value={form.introducer || ''} InputProps={{ readOnly: true }} />
                </Grid>

                <Grid item xs={12} md={6} className="flex items-center gap-3">
                  <Box>
                    <Typography variant="body2">Profile Image</Typography>
                    <input type="file" onChange={handleFileChange} />
                  </Box>
                  <Avatar src={form.profileImage || ''} sx={{ width: 56, height: 56 }} />
                </Grid>

                <Grid item xs={12} className="flex justify-end">
                  <Button variant="contained" color="success" onClick={handleSubmit} disabled={saving}>
                    {saving ? <CircularProgress size={20} color="inherit" /> : 'Update'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
