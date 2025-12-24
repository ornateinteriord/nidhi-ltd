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
import { toast } from 'react-toastify';
import {
  useGetAccountGroups,
  useGetInterestsByAccountGroup,
  useGetMemberById,
  useCreateAccount,
} from '../../queries/admin';

export type AccountType = 'SB' | 'CA' | 'RD' | 'FD' | 'PIGMY' | 'MIS' | string;

interface Props {
  defaultAccountType?: AccountType;
  title?: string;
}

const AccountOpeningForm: React.FC<Props> = ({ defaultAccountType = 'SB', title }) => {
  const [memberId, setMemberId] = useState('');
  const [memberInfo, setMemberInfo] = useState<any>(null);
  const [accountGroupId, setAccountGroupId] = useState<string>('');

  const [form, setForm] = useState<any>({
    accountType: defaultAccountType,
    accountOperation: 'Single',
    openingDate: new Date().toISOString().split('T')[0],
    interestSlab: '',
    interestRate: '',
    duration: '',
    amount: '',
    maturityDate: '',
    maturityValue: '',
    introducer: '',
    introducerName: '',
    agent: '',
    jointMember: '',
  });

  // Fetch account groups
  const { data: accountGroupsData } = useGetAccountGroups();

  // Fetch member info when requested
  const { isLoading: loadingMember, refetch: fetchMember } = useGetMemberById(
    memberId,
    false // Don't auto-fetch
  );

  // Fetch interests based on account group ID
  const { data: interestsData, isLoading: loadingInterests } = useGetInterestsByAccountGroup(
    accountGroupId,
    !!accountGroupId
  );

  // Create account mutation
  const createAccountMutation = useCreateAccount();

  // Map account type name to account_group_id
  useEffect(() => {
    if (accountGroupsData?.data) {
      const matchingGroup = accountGroupsData.data.find(
        (group) => group.account_group_name === defaultAccountType
      );
      if (matchingGroup) {
        setAccountGroupId(matchingGroup.account_group_id);
      }
    }
  }, [accountGroupsData, defaultAccountType]);

  // Handle member info fetch
  const handleGetInfo = async () => {
    if (!memberId) {
      toast.error('Please enter a member ID');
      return;
    }

    try {
      const result = await fetchMember();
      if (result.data?.success && result.data.data) {
        const member = result.data.data;
        setMemberInfo(member);

        // Auto-populate fields from member data
        setForm((prev: any) => ({
          ...prev,
          introducer: member.introducer || '',
          introducerName: member.introducer_name || '',
        }));

        toast.success('Member information loaded successfully');
      } else {
        toast.error('Member not found');
        setMemberInfo(null);
      }
    } catch (error) {
      toast.error('Failed to fetch member information');
      setMemberInfo(null);
    }
  };

  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  // Handle interest slab selection
  const handleInterestSlabChange = (interestId: string) => {
    setForm((prev: any) => ({ ...prev, interestSlab: interestId }));

    if (interestsData?.data) {
      const interest = interestsData.data.find((i) => i.interest_id === interestId);
      if (interest) {

        // Auto-populate related fields
        const interestRate = interest.interest_rate || 0;
        const duration = interest.duration || 0;

        // Calculate maturity date (opening date + duration months)
        let maturityDate = '';
        if (form.openingDate && duration > 0) {
          const openDate = new Date(form.openingDate);
          openDate.setMonth(openDate.getMonth() + duration);
          maturityDate = openDate.toISOString().split('T')[0];
        }

        setForm((prev: any) => ({
          ...prev,
          interestRate: interestRate.toString(),
          duration: duration.toString(),
          maturityDate,
          // Maturity value calculation can be added here if formula is known
          maturityValue: '', // Placeholder for now
        }));
      }
    }
  };

  const handleSubmit = async () => {
    if (!memberInfo) {
      toast.error('Please fetch member information first');
      return;
    }

    if (!form.amount || parseFloat(form.amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (form.accountOperation === 'Any two' && !form.jointMember) {
      toast.error('Please enter joint member details');
      return;
    }

    try {
      const accountData = {
        branch_id: memberInfo.branch_id,
        date_of_opening: form.openingDate,
        member_id: memberId,
        account_type: accountGroupId, // Send account_group_id
        account_operation: form.accountOperation,
        introducer: form.introducer,
        entered_by: memberInfo.entered_by || '', // From logged-in user
        ref_id: form.interestSlab, // interest_id
        interest_rate: parseFloat(form.interestRate) || 0,
        duration: parseInt(form.duration) || 0,
        date_of_maturity: form.maturityDate || null,
        assigned_to: form.agent,
        account_amount: parseFloat(form.amount),
        joint_member: form.accountOperation === 'Any two' ? form.jointMember : null,
      };

      const result = await createAccountMutation.mutateAsync(accountData);

      if (result?.success) {
        toast.success('Account created successfully!');
        // Reset form
        setMemberId('');
        setMemberInfo(null);
        setForm({
          accountType: defaultAccountType,
          accountOperation: 'Single',
          openingDate: new Date().toISOString().split('T')[0],
          interestSlab: '',
          interestRate: '',
          duration: '',
          amount: '',
          maturityDate: '',
          maturityValue: '',
          introducer: '',
          introducerName: '',
          agent: '',
          jointMember: '',
        });
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to create account');
    }
  };

  const showInterestFields = ['SB', 'RD', 'FD', 'PIGMY', 'MIS'].includes(form.accountType);
  const interests = interestsData?.data || [];

  return (
    <Box sx={{ mt: 10, px: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a237e', mb: 1 }}>
        {title ?? `${form.accountType} Account Opening`}
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            {/* Member Information Section */}
            <Grid component="div" size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: '600' }}>
                Member Informations
              </Typography>
              <Grid container spacing={2}>
                <Grid component="div" size={{ xs: 12, md: 8 }}>
                  <TextField
                    placeholder="Member ID"
                    size="small"
                    fullWidth
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    label="Member ID"
                  />
                </Grid>
                <Grid component="div" size={{ xs: 12, md: 4 }}>
                  <Button
                    variant="contained"
                    size="medium"
                    fullWidth
                    onClick={handleGetInfo}
                    disabled={loadingMember || !memberId}
                  >
                    {loadingMember ? <CircularProgress size={20} /> : 'Get Info'}
                  </Button>
                </Grid>

                {/* Display member info when loaded */}
                {memberInfo && (
                  <>
                    <Grid component="div" size={{ xs: 12 }}>
                      <TextField
                        label="Member Name"
                        fullWidth
                        size="small"
                        value={memberInfo.name || ''}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f5f5f5' }}
                      />
                    </Grid>
                    <Grid component="div" size={{ xs: 12 }}>
                      <TextField
                        label="Gender"
                        fullWidth
                        size="small"
                        value={memberInfo.gender || ''}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f5f5f5' }}
                      />
                    </Grid>
                    <Grid component="div" size={{ xs: 12 }}>
                      <TextField
                        label="Date Of Birth"
                        fullWidth
                        size="small"
                        value={memberInfo.dob ? new Date(memberInfo.dob).toLocaleDateString('en-GB') : ''}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f5f5f5' }}
                      />
                    </Grid>
                    <Grid component="div" size={{ xs: 12 }}>
                      <TextField
                        label="Email ID"
                        fullWidth
                        size="small"
                        value={memberInfo.emailid || ''}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f5f5f5' }}
                      />
                    </Grid>
                    <Grid component="div" size={{ xs: 12 }}>
                      <TextField
                        label="Contact No"
                        fullWidth
                        size="small"
                        value={memberInfo.contactno || ''}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f5f5f5' }}
                      />
                    </Grid>
                    <Grid component="div" size={{ xs: 12 }}>
                      <TextField
                        label="Address"
                        fullWidth
                        size="small"
                        multiline
                        rows={2}
                        value={memberInfo.address || ''}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f5f5f5' }}
                      />
                    </Grid>
                    <Grid component="div" size={{ xs: 12 }}>
                      <TextField
                        label="Pan No"
                        fullWidth
                        size="small"
                        value={memberInfo.pan_no || ''}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f5f5f5' }}
                      />
                    </Grid>
                    <Grid component="div" size={{ xs: 12 }}>
                      <TextField
                        label="Aadharcard No"
                        fullWidth
                        size="small"
                        value={memberInfo.aadharcard_no || ''}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f5f5f5' }}
                      />
                    </Grid>
                    <Grid component="div" size={{ xs: 12 }}>
                      <TextField
                        label="Branch Code"
                        fullWidth
                        size="small"
                        value={memberInfo.branch_id || ''}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f5f5f5' }}
                      />
                    </Grid>
                    <Grid component="div" size={{ xs: 12 }}>
                      <TextField
                        label="Receipt No"
                        fullWidth
                        size="small"
                        value={memberInfo.receipt_no || ''}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f5f5f5' }}
                      />
                    </Grid>
                    <Grid component="div" size={{ xs: 12 }}>
                      <TextField
                        label="Nominee"
                        fullWidth
                        size="small"
                        value={memberInfo.nominee || ''}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f5f5f5' }}
                      />
                    </Grid>
                    <Grid component="div" size={{ xs: 12 }}>
                      <TextField
                        label="Relation"
                        fullWidth
                        size="small"
                        value={memberInfo.relation || ''}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f5f5f5' }}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>

            {/* Account Information Section */}
            <Grid component="div" size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: '600' }}>
                Account Informations
              </Typography>
              <Grid container spacing={2}>
                <Grid component="div" size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="account-type-label">Account Type</InputLabel>
                    <Select
                      labelId="account-type-label"
                      label="Account Type"
                      value={form.accountType}
                      readOnly // Account type is non-editable but looks normal
                      inputProps={{ readOnly: true }}
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
                  <FormControl fullWidth size="small">
                    <InputLabel id="account-op-label">Account Operation</InputLabel>
                    <Select
                      labelId="account-op-label"
                      label="Account Operation"
                      value={form.accountOperation}
                      onChange={(e) => handleChange('accountOperation', e.target.value)}
                    >
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Any two">Any two</MenuItem>
                      <MenuItem value="Anyone">Anyone</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Conditional Joint Member Field */}
                {form.accountOperation === 'Any two' && (
                  <Grid component="div" size={{ xs: 12 }}>
                    <TextField
                      label="Joint Member"
                      fullWidth
                      size="small"
                      value={form.jointMember}
                      onChange={(e) => handleChange('jointMember', e.target.value)}
                      placeholder="Joint member"
                    />
                  </Grid>
                )}

                <Grid component="div" size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Opening Date"
                    type="date"
                    fullWidth
                    size="small"
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
                      <FormControl fullWidth size="small">
                        <InputLabel id="interest-slab-label">Interest Slab</InputLabel>
                        <Select
                          labelId="interest-slab-label"
                          label="Interest Slab"
                          value={form.interestSlab}
                          onChange={(e) => handleInterestSlabChange(e.target.value)}
                          disabled={loadingInterests || interests.length === 0}
                        >
                          <MenuItem value="">Select Interest Slab</MenuItem>
                          {interests.map((interest) => (
                            <MenuItem key={interest.interest_id} value={interest.interest_id}>
                              {interest.interest_name || `${interest.duration} Months - ${interest.interest_rate}%`}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid component="div" size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Interest Rate"
                        fullWidth
                        size="small"
                        value={form.interestRate}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f5f5f5' }}
                      />
                    </Grid>

                    <Grid component="div" size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Duration"
                        fullWidth
                        size="small"
                        value={form.duration}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f5f5f5' }}
                      />
                    </Grid>
                  </>
                )}

                <Grid component="div" size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Amount"
                    fullWidth
                    size="small"
                    type="number"
                    value={form.amount}
                    onChange={(e) => handleChange('amount', e.target.value)}
                  />
                </Grid>

                {showInterestFields && (
                  <>
                    <Grid component="div" size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Maturity Date"
                        type="date"
                        fullWidth
                        size="small"
                        value={form.maturityDate}
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{ bgcolor: '#f5f5f5' }}
                      />
                    </Grid>

                    <Grid component="div" size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="Maturity Value"
                        fullWidth
                        size="small"
                        value={form.maturityValue}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f5f5f5' }}
                      />
                    </Grid>
                  </>
                )}

                <Grid component="div" size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Introducer"
                    fullWidth
                    size="small"
                    value={form.introducer}
                    onChange={(e) => handleChange('introducer', e.target.value)}
                  />
                </Grid>

                <Grid component="div" size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Introducer Name"
                    fullWidth
                    size="small"
                    value={form.introducerName}
                    InputProps={{ readOnly: true }}
                    sx={{ bgcolor: '#f5f5f5' }}
                  />
                </Grid>

                <Grid component="div" size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Agent"
                    fullWidth
                    size="small"
                    value={form.agent}
                    onChange={(e) => handleChange('agent', e.target.value)}
                    placeholder="Select Agent"
                  />
                </Grid>

                <Grid component="div" size={{ xs: 12 }} className="flex justify-end">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                    disabled={!memberInfo || createAccountMutation.isPending}
                  >
                    {createAccountMutation.isPending ? <CircularProgress size={20} /> : 'Submit'}
                  </Button>
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