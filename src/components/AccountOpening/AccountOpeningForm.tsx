import React, { useState } from 'react';
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
  
} from '@mui/material';
import { toast } from 'react-toastify';

export type AccountType = 'SB' | 'CA' | 'RD' | 'FD' | 'PIGMY' | 'MIS' | string;

interface Props {
  defaultAccountType?: AccountType;
  title?: string;
}

const AccountOpeningForm: React.FC<Props> = ({ defaultAccountType = 'SB', title }) => {
  const [memberId, setMemberId] = useState('');
  const [memberInfo, setMemberInfo] = useState<any>(null);
  const [form, setForm] = useState<any>({
    accountType: defaultAccountType,
    accountOperation: 'Single',
    openingDate: new Date().toISOString().split('T')[0], // Today's date by default
    interestSlab: '',
    interestRate: '',
    duration: '',
    amount: '',
    maturityDate: '',
    maturityValue: '',
    introducer: '',
    introducerName: '',
    agent: '',
  });

  const handleGetInfo = () => {
    // Dummy data - fill some member details for preview
    const dummy = {
      memberId: memberId || 'M0001',
      name: 'MANJUNATH',
      introducer: '10512',
      introducerName: 'Introducer Name',
      agent: 'A20001',
    };
    setMemberInfo(dummy);
    setForm((prev: any) => ({ ...prev, introducer: dummy.introducer, introducerName: dummy.introducerName, agent: dummy.agent }));
    toast.info('Fetched dummy member info');
  };

  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      // simulate submit
      await new Promise((res) => setTimeout(res, 600));
      toast.success(`${form.accountType} account created (dummy)`);
    } catch (err) {
      toast.error('Failed to create account');
    }
  };

  const showInterestFields = ['SB', 'RD', 'FD', 'PIGMY', 'MIS'].includes(form.accountType);

  return (
    <Box sx={{ mt: 10, px: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: '600' }}>{title ?? `${form.accountType} Account Opening`}</Typography>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid component="div" size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: '600' }}>Member Informations</Typography>
              <Grid container spacing={2}>
                <Grid component="div" size={{ xs: 12, md: 8 }}>
                  <TextField 
                    placeholder="Member ID" 
                    size='small' 
                    fullWidth 
                    value={memberId} 
                    onChange={(e) => setMemberId(e.target.value)} 
                    label="Member ID"
                  />
                </Grid>
                <Grid component="div" size={{ xs: 12, md: 4 }}>
                  <Button variant="contained" size='medium' fullWidth onClick={handleGetInfo}>Get Info</Button>
                </Grid>
                {memberInfo && (
                  <Grid component="div" size={{ xs: 12 }}>
                    <Typography variant="body2">Name: <strong>{memberInfo.name}</strong></Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Grid component="div" size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: '600' }}>Account Informations</Typography>
              <Grid container spacing={2}>
                <Grid component="div" size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel id="account-type-label">Account Type</InputLabel>
                    <Select 
                      labelId="account-type-label" 
                      label="Account Type" 
                      value={form.accountType} 
                      onChange={(e) => handleChange('accountType', e.target.value)}
                    >
                      <MenuItem value="SB">SB</MenuItem>
                      <MenuItem value="CA">CA</MenuItem>
                      <MenuItem value="RD">RD</MenuItem>
                      <MenuItem value="FD">FD</MenuItem>
                      <MenuItem value="PIGMY">PIGMY</MenuItem>
                      <MenuItem value="MIS">MIS</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid component="div" size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel id="account-op-label">Account Operation</InputLabel>
                    <Select 
                      labelId="account-op-label" 
                      label="Account Operation" 
                      value={form.accountOperation} 
                      onChange={(e) => handleChange('accountOperation', e.target.value)}
                    >
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Joint">Joint</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid component="div" size={{ xs: 12, md: 6 }}>
                  <TextField 
                    label="Opening Date" 
                    type="date" 
                    fullWidth 
                    value={form.openingDate} 
                    onChange={(e) => handleChange('openingDate', e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                {showInterestFields && (
                  <>
                    <Grid component="div" size={{ xs: 12, md: 6 }}>
                      <FormControl fullWidth>
                        <InputLabel id="interest-slab-label">Interest Slab</InputLabel>
                        <Select 
                          labelId="interest-slab-label" 
                          label="Interest Slab" 
                          value={form.interestSlab} 
                          onChange={(e) => handleChange('interestSlab', e.target.value)}
                        >
                          <MenuItem value={''}>Select Interest Slab</MenuItem>
                          <MenuItem value={'slab1'}>Slab 1</MenuItem>
                          <MenuItem value={'slab2'}>Slab 2</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid component="div" size={{ xs: 12, md: 6 }}>
                      <TextField 
                        label="Interest Rate" 
                        fullWidth 
                        value={form.interestRate} 
                        onChange={(e) => handleChange('interestRate', e.target.value)} 
                      />
                    </Grid>

                    <Grid component="div" size={{ xs: 12, md: 6 }}>
                      <TextField 
                        label="Duration" 
                        fullWidth 
                        value={form.duration} 
                        onChange={(e) => handleChange('duration', e.target.value)} 
                      />
                    </Grid>
                  </>
                )}

                <Grid component="div" size={{ xs: 12, md: 6 }}>
                  <TextField 
                    label="Amount" 
                    fullWidth 
                    value={form.amount} 
                    onChange={(e) => handleChange('amount', e.target.value)} 
                  />
                </Grid>

                <Grid component="div" size={{ xs: 12, md: 6 }}>
                  <TextField 
                    label="Maturity Date" 
                    type="date" 
                    fullWidth 
                    value={form.maturityDate} 
                    onChange={(e) => handleChange('maturityDate', e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid component="div" size={{ xs: 12, md: 6 }}>
                  <TextField 
                    label="Maturity Value" 
                    fullWidth 
                    value={form.maturityValue} 
                    onChange={(e) => handleChange('maturityValue', e.target.value)} 
                  />
                </Grid>

                <Grid component="div" size={{ xs: 12, md: 6 }}>
                  <TextField 
                    label="Introducer" 
                    fullWidth 
                    value={form.introducer} 
                    onChange={(e) => handleChange('introducer', e.target.value)} 
                  />
                </Grid>

                <Grid component="div" size={{ xs: 12, md: 6 }}>
                  <TextField 
                    label="Introducer Name" 
                    fullWidth 
                    value={form.introducerName} 
                    onChange={(e) => handleChange('introducerName', e.target.value)} 
                  />
                </Grid>

                <Grid component="div" size={{ xs: 12, md: 6 }}>
                  <TextField 
                    label="Agent" 
                    fullWidth 
                    value={form.agent} 
                    onChange={(e) => handleChange('agent', e.target.value)} 
                  />
                </Grid>

                <Grid component="div" size={{ xs: 12 }} className="flex justify-end">
                  <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AccountOpeningForm;