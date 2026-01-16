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
import { useGetMemberById, useGetAgentById } from '../queries/admin/index';

interface MemberFormData {
  member_id?: string;
  name: string;
  father_name: string;
  gender: string;
  dob: string;
  age: string;
  emailid: string;
  contactno: string;
  occupation: string;
  address: string;
  pan_no: string;
  aadharcard_no: string;
  voter_id: string;
  branch_id: string;
  receipt_no: string;
  nominee: string;
  relation: string;
  introducer: string;
  introducer_name: string;
  member_image: string;
  member_signature: string;
  date_of_joining: string;
  entered_by: string;
}

interface AgentFormData {
  name: string;
  designation: string;
  gender: string;
  pan_no: string;
  dob: string;
  aadharcard_no: string;
  emailid: string;
  contactno: string;
  branch_id: string;
  introducer: string;
  address: string;
}

interface ModifyDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any, isEdit?: boolean) => void;
  type: 'member' | 'agent';
  memberId?: string | null; // member_id for editing
  isLoading?: boolean;
}

const MemberModifyDialog: React.FC<ModifyDialogProps> = ({
  open,
  onClose,
  onSave,
  memberId,
  isLoading: externalLoading
}) => {
  const isEditMode = !!memberId;

  // Fetch member data when editing
  const { data: memberData, isLoading: isFetching, isError } = useGetMemberById(
    memberId || '',
    isEditMode && open
  );

  // State to track introducer code for fetching agent data
  const [introducerCode, setIntroducerCode] = useState<string>('');
  const [shouldFetchAgent, setShouldFetchAgent] = useState<boolean>(false);

  // Fetch agent data when introducer code is entered and onBlur triggered
  const { data: agentData, isLoading: isLoadingAgent, isError: isAgentError } = useGetAgentById(
    introducerCode,
    shouldFetchAgent && !!introducerCode && introducerCode.length > 0
  );

  const [formData, setFormData] = useState<MemberFormData>({
    member_id: '',
    name: '',
    father_name: '',
    gender: 'Male',
    dob: '',
    age: '',
    emailid: '',
    contactno: '',
    occupation: '',
    address: '',
    pan_no: '',
    aadharcard_no: '',
    voter_id: '',
    branch_id: '',
    receipt_no: '',
    nominee: '',
    relation: '',
    introducer: '',
    introducer_name: '',
    member_image: '',
    member_signature: '',
    date_of_joining: '',
    entered_by: '',
  });

  // Update form data when member data is fetched
  useEffect(() => {
    if (isEditMode && memberData?.data) {
      const member = memberData.data;
      setFormData({
        member_id: member.member_id || '',
        name: member.name || '',
        father_name: member.father_name || '',
        gender: member.gender || 'Male',
        dob: member.dob ? new Date(member.dob).toISOString().split('T')[0] : '',
        age: member.age?.toString() || '',
        emailid: member.emailid || '',
        contactno: member.contactno || '',
        occupation: member.occupation || '',
        address: member.address || '',
        pan_no: member.pan_no || '',
        aadharcard_no: member.aadharcard_no || '',
        voter_id: member.voter_id || '',
        branch_id: member.branch_id || '',
        receipt_no: member.receipt_no || '',
        nominee: member.nominee || '',
        relation: member.relation || '',
        introducer: member.introducer || '',
        introducer_name: member.introducer_name || '',
        member_image: member.member_image || '',
        member_signature: member.member_signature || '',
        date_of_joining: member.date_of_joining ? new Date(member.date_of_joining).toISOString().split('T')[0] : '',
        entered_by: member.entered_by || '',
      });
      // Set introducer code for editing mode
      setIntroducerCode(member.introducer || '');
    } else if (!isEditMode || isError || !open) {
      // Reset form for:
      // 1. Create mode
      // 2. When API fails (isError)
      // 3. When dialog closes
      setFormData({
        member_id: '',
        name: '',
        father_name: '',
        gender: 'Male',
        dob: '',
        age: '',
        emailid: '',
        contactno: '',
        occupation: '',
        address: '',
        pan_no: '',
        aadharcard_no: '',
        voter_id: '',
        branch_id: '',
        receipt_no: '',
        nominee: '',
        relation: '',
        introducer: '',
        introducer_name: '',
        member_image: '',
        member_signature: '',
        date_of_joining: '',
        entered_by: '',
      });
      setIntroducerCode('');
    }
  }, [memberData, isEditMode, open, isError]);

  // Auto-populate introducer name when agent data is fetched
  useEffect(() => {
    if (agentData?.data?.name) {
      setFormData(prev => ({
        ...prev,
        introducer_name: agentData.data.name || ''
      }));
      // Reset fetch trigger after successful fetch
      setShouldFetchAgent(false);
    }
  }, [agentData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // If introducer code is changed, update the introducer code state
    if (name === 'introducer') {
      setIntroducerCode(value);
      // Clear introducer name and stop fetching if code is cleared
      if (!value) {
        setShouldFetchAgent(false);
        setFormData(prev => ({
          ...prev,
          introducer_name: ''
        }));
      }
    }
  };

  // Handle onBlur for introducer field to trigger API call
  const handleIntroducerBlur = () => {
    // Use formData.introducer to get the current value directly
    if (formData.introducer && formData.introducer.trim().length > 0) {
      setIntroducerCode(formData.introducer.trim());
      setShouldFetchAgent(true);
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // When updating, remove member_id from formData as it shouldn't be changed
    // The member_id comes from the URL parameter only
    if (isEditMode) {
      const { member_id, ...updateData } = formData;
      onSave(updateData, isEditMode);
    } else {
      onSave(formData, isEditMode);
    }
  };

  const isLoading = isFetching || externalLoading;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
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
          {isEditMode ? 'Update Member Details' : 'Create New Member'}
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

            {/* Name */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Pan No */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Pan No"
                name="pan_no"
                value={formData.pan_no}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Father Name */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Father Name"
                name="father_name"
                value={formData.father_name}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Aadhar Card No */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Aadhar Card No"
                name="aadharcard_no"
                value={formData.aadharcard_no}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Gender */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  label="Gender"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Voter ID */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Voter ID"
                name="voter_id"
                value={formData.voter_id}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Date Of Birth */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Date Of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Branch Code */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Branch Code"
                name="branch_id"
                value={formData.branch_id}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Age */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Receipt No */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Receipt No"
                name="receipt_no"
                value={formData.receipt_no}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Email ID */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Email ID"
                name="emailid"
                type="email"
                value={formData.emailid}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Nominee */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Nominee"
                name="nominee"
                value={formData.nominee}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Contact No */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Contact No"
                name="contactno"
                value={formData.contactno}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Relation */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Relation"
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Occupation */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Introducer */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Introducer Code"
                name="introducer"
                value={formData.introducer}
                onChange={handleChange}
                onBlur={handleIntroducerBlur}
                size="small"
                disabled={isEditMode}
                sx={isEditMode ? { backgroundColor: '#f5f5f5' } : {}}
                InputProps={{
                  endAdornment: isLoadingAgent ? (
                    <InputAdornment position="end">
                      <CircularProgress size={20} />
                    </InputAdornment>
                  ) : null,
                }}
                helperText={isEditMode ? "Introducer cannot be changed after member creation" : ""}
              />
              {isAgentError && <Typography color="error">Introducer not found</Typography>}
            </Grid>

            {/* Introducer Name */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Introducer Name"
                name="introducer_name"
                value={formData.introducer_name}
                onChange={handleChange}
                size="small"
                disabled
                sx={{ backgroundColor: '#f5f5f5' }}
              />
            </Grid>

            {/* Date of Joining */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Date of Joining"
                name="date_of_joining"
                type="date"
                value={formData.date_of_joining}
                onChange={handleChange}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Entered By */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Entered By"
                name="entered_by"
                value={formData.entered_by}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Full width address */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                size="small"
                multiline
                rows={2}
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
          {isEditMode ? 'Update Member' : 'Create Member'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Agent Dialog remains mostly the same, simplified for brevity
const AgentModifyDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onSave: (data: AgentFormData) => void;
  initialData?: any;
}> = ({ open, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<AgentFormData>({
    name: initialData?.member?.split(' (')[0] || '',
    designation: initialData?.designation || 'Director',
    gender: initialData?.gender || 'Male',
    pan_no: initialData?.panNo || '',
    dob: initialData?.dateOfBirth || '',
    aadharcard_no: initialData?.aadharCardNo || '',
    emailid: initialData?.email || '',
    contactno: initialData?.mobile || '',
    branch_id: initialData?.branchCode || '',
    introducer: initialData?.introducer || '',
    address: initialData?.address || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{
        backgroundColor: '#1a237e',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 2,
      }}>
        <Typography variant="h6">Update Agent Details</Typography>
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
            {/* Row 1 */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Row 2 */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  label="Gender"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Pan No"
                name="pan_no"
                value={formData.pan_no}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Row 3 */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Date Of Birth"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Aadhar Card No"
                name="aadharcard_no"
                value={formData.aadharcard_no}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Row 4 */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Email ID"
                name="emailid"
                value={formData.emailid}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Branch Code"
                name="branch_id"
                value={formData.branch_id}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Row 5 */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Contact No"
                name="contactno"
                value={formData.contactno}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Introducer"
                name="introducer"
                value={formData.introducer}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Full width address */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                size="small"
                multiline
                rows={2}
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
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{
            textTransform: 'none',
            backgroundColor: '#1a237e',
            '&:hover': { backgroundColor: '#283593' }
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface MainModifyDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any, isEdit?: boolean) => void;
  type: 'member' | 'agent';
  memberId?: string | null;
  initialData?: any;
  isLoading?: boolean;
}

const ModifyDialog: React.FC<MainModifyDialogProps> = ({
  open,
  onClose,
  onSave,
  type,
  memberId,
  initialData,
  isLoading
}) => {
  if (type === 'member') {
    return (
      <MemberModifyDialog
        open={open}
        onClose={onClose}
        onSave={onSave}
        type={type}
        memberId={memberId}
        isLoading={isLoading}
      />
    );
  }

  return (
    <AgentModifyDialog
      open={open}
      onClose={onClose}
      onSave={onSave}
      initialData={initialData}
    />
  );
};

export default ModifyDialog;