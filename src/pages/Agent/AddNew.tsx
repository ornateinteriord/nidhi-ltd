import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  ,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from '@mui/material';
import { toast } from 'react-toastify';

const AddNew: React.FC = () => {
  const [memberId, setMemberId] = useState('');
  const [memberInfo, setMemberInfo] = useState<any>(null);
  const [form, setForm] = useState<any>({
    accountType: 'SB',
    accountOperation: 'Single',
    interestSlab: '',
    interestRate: '',
    duration: '',
    amount: '',
    introducer: '',
    introducerName: '',
    agent: 'A20001',
  });

  const handleGetInfo = () => {
    // Dummy data - fill some member details for preview
    const dummy = {
      memberId: memberId || 'M0001',
      name: 'MANJUNATH',
      introducer: '10512',
      introducerName: 'Introducer Name',
    };
    setMemberInfo(dummy);
    setForm((prev: any) => ({ ...prev, introducer: dummy.introducer, introducerName: dummy.introducerName }));
    toast.info('Fetched dummy member info');
  };

  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      // simulate submit
      await new Promise((res) => setTimeout(res, 600));
      toast.success('Account created (dummy)');
    } catch (err) {
      toast.error('Failed to create account');
    }
  };

  return (
    <Box sx={{ mt: 10,px:3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: '600' }}>Add New Customer</Typography>
      <Card>
        <CardContent>
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: '600' }}>Member Informations</Typography>
              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 8 }}>
                  <TextField placeholder="Member ID" fullWidth value={memberId} onChange={(e) => setMemberId(e.target.value)} />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                  <Button variant="contained" fullWidth onClick={handleGetInfo}>Get Info</Button>
                </Grid2>
                {memberInfo && (
                  <Grid2 size={{ xs: 12 }}>
                    <Typography variant="body2">Name: <strong>{memberInfo.name}</strong></Typography>
                  </Grid2>
                )}
              </Grid2>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: '600' }}>Account Informations</Typography>
              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel id="account-type-label">Account Type</InputLabel>
                    <Select labelId="account-type-label" label="Account Type" value={form.accountType} onChange={(e) => handleChange('accountType', e.target.value)}>
                      <MenuItem value="SB">SB</MenuItem>
                      <MenuItem value="FD">FD</MenuItem>
                      <MenuItem value="RD">RD</MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel id="account-op-label">Account Operation</InputLabel>
                    <Select labelId="account-op-label" label="Account Operation" value={form.accountOperation} onChange={(e) => handleChange('accountOperation', e.target.value)}>
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Joint">Joint</MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel id="interest-slab-label">Interest Slab</InputLabel>
                    <Select labelId="interest-slab-label" label="Interest Slab" value={form.interestSlab} onChange={(e) => handleChange('interestSlab', e.target.value)}>
                      <MenuItem value={''}>Select Interest Slab</MenuItem>
                      <MenuItem value={'slab1'}>Slab 1</MenuItem>
                      <MenuItem value={'slab2'}>Slab 2</MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField label="Interest Rate" fullWidth value={form.interestRate} disabled />
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField label="Duration" fullWidth value={form.duration} disabled />
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField label="Amount" fullWidth value={form.amount} onChange={(e) => handleChange('amount', e.target.value)} />
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField label="Introducer" fullWidth value={form.introducer} onChange={(e) => handleChange('introducer', e.target.value)} />
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField label="Introducer Name" fullWidth value={form.introducerName} disabled />
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField label="Agent" fullWidth value={form.agent} disabled />
                </Grid2>

                <Grid2 size={{ xs: 12 }} className="flex justify-end">
                  <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddNew;
