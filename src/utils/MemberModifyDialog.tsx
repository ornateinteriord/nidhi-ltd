import React, { useState } from 'react';
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

} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface MemberFormData {
  name: string;
  fatherName: string;
  gender: string;
  dateOfBirth: string;
  age: string;
  email: string;
  contactNo: string;
  occupation: string;
  address: string;
  panNo: string;
  aadharCardNo: string;
  voterId: string;
  branchCode: string;
  receiptNo: string;
  nominee: string;
  relation: string;
  introducer: string;
}

interface AgentFormData {
  name: string;
  designation: string;
  gender: string;
  panNo: string;
  dateOfBirth: string;
  aadharCardNo: string;
  email: string;
  contactNo: string;
  branchCode: string;
  introducer: string;
  address: string;
}

interface ModifyDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  type: 'member' | 'agent';
  initialData?: any;
}

const MemberModifyDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onSave: (data: MemberFormData) => void;
  initialData?: any;
}> = ({ open, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<MemberFormData>({
    name: initialData?.name || '',
    fatherName: initialData?.fatherName || '',
    gender: initialData?.gender || 'Male',
    dateOfBirth: initialData?.dateOfBirth || '',
    age: initialData?.age || '',
    email: initialData?.email || '',
    contactNo: initialData?.contactNo || '',
    occupation: initialData?.occupation || '',
    address: initialData?.address || '',
    panNo: initialData?.panNo || '',
    aadharCardNo: initialData?.aadharCardNo || '',
    voterId: initialData?.voterId || '',
    branchCode: initialData?.branchCode || '',
    receiptNo: initialData?.receiptNo || '',
    nominee: initialData?.nominee || '',
    relation: initialData?.relation || '',
    introducer: initialData?.introducer || '',
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
        <Typography variant="h6">Update Member Details</Typography>
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
                label="Pan No"
                name="panNo"
                value={formData.panNo}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Row 2 */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Father Name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Aadhar Card No"
                name="aadharCardNo"
                value={formData.aadharCardNo}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Row 3 */}
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
                label="Voter ID"
                name="voterId"
                value={formData.voterId}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Row 4 */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Date Of Birth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Branch Code"
                name="branchCode"
                value={formData.branchCode}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Row 5 */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Receipt No"
                name="receiptNo"
                value={formData.receiptNo}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Row 6 */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Email ID"
                name="email"
                value={formData.email}
                onChange={handleChange}
                size="small"
              />
            </Grid>
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

            {/* Row 7 */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Contact No"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                size="small"
              />
            </Grid>
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

            {/* Row 8 */}
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
    panNo: initialData?.panNo || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    aadharCardNo: initialData?.aadharCardNo || '',
    email: initialData?.email || '',
    contactNo: initialData?.mobile || '',
    branchCode: initialData?.branchCode || '',
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
                name="panNo"
                value={formData.panNo}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Row 3 */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Date Of Birth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Aadhar Card No"
                name="aadharCardNo"
                value={formData.aadharCardNo}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Row 4 */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Email ID"
                name="email"
                value={formData.email}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Branch Code"
                name="branchCode"
                value={formData.branchCode}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Row 5 */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Contact No"
                name="contactNo"
                value={formData.contactNo}
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

const ModifyDialog: React.FC<ModifyDialogProps> = ({ open, onClose, onSave, type, initialData }) => {
  if (type === 'member') {
    return (
      <MemberModifyDialog
        open={open}
        onClose={onClose}
        onSave={onSave}
        initialData={initialData}
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