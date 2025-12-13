
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
// import DescriptionIcon from '@mui/icons-material/Description';
import ExportableTable from '../../../utils/ExportableTable';

const Proof = () => {
  const [formData, setFormData] = useState({
    proofType: '',
    proofName: '',
  });

  // Proof type options
  const proofTypes = [
    'Id Proof',
    'Address Proof'
  ];

  // Sample data for the table
  const proofData = [
    { id: 1, proofType: 'ID Proof', proofName: 'Aadhar Card', status: 'active' },
    { id: 2, proofType: 'Address Proof', proofName: 'Electric Bill', status: 'active' },
    { id: 3, proofType: 'ID Proof', proofName: 'Driving Licence', status: 'active' },
    { id: 4, proofType: 'ID Proof', proofName: 'Voter Card', status: 'active' },
    { id: 5, proofType: 'ID Proof', proofName: 'Passport', status: 'active' },
    { id: 6, proofType: 'ID Proof', proofName: 'Pan Card', status: 'active' },
    { id: 7, proofType: 'Address Proof', proofName: 'Aadhar card', status: 'active' },
    { id: 8, proofType: 'Address Proof', proofName: 'Voter card', status: 'active' },
    { id: 9, proofType: 'Address Proof', proofName: 'Telephone Bill', status: 'active' },
    { id: 10, proofType: 'ID Proof', proofName: 'BANK PASSBOOK', status: 'active' },
  ];

  // Table columns
  const columns = [
    {
      name: 'S. No.',
      selector: (row: any) => row.id,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Proof Type',
      selector: (row: any) => row.proofType,
      sortable: true,
    },
    {
      name: 'Proof name',
      selector: (row: any) => row.proofName,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (_row: any) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            sx={{
              minWidth: '30px',
              width: '30px',
              height: '30px',
              color: '#2196f3',
              '&:hover': {
                backgroundColor: '#e3f2fd'
              }
            }}
          >
            ✏️
          </Button>
          <Button
            size="small"
            sx={{
              minWidth: '30px',
              width: '30px',
              height: '30px',
              color: '#f44336',
              '&:hover': {
                backgroundColor: '#ffebee'
              }
            }}
          >
            ✗
          </Button>
        </Box>
      ),
      width: '120px'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: any) => {
    setFormData((prevData) => ({
      ...prevData,
      proofType: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data Submitted:', formData);
    alert('Proof Added Successfully!');
  };

  const handleReset = () => {
    setFormData({
      proofType: '',
      proofName: '',
    });
  };

  return (
    <Box sx={{ margin: '2rem', mt: 10 }}>
      {/* Add New Proof Form */}
      <Card sx={{ boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', mb: 3 }}>
        <CardContent sx={{ padding: '2rem' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#04112f', 
              mb: 3, 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            📄 ADD NEW PROOF
          </Typography>
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Proof Type</InputLabel>
                <Select
                  value={formData.proofType}
                  onChange={handleSelectChange}
                  label="Proof Type"
                  sx={{
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#04112f',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#04112f',
                    }
                  }}
                >
                  {proofTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Proof Name"
                name="proofName"
                value={formData.proofName}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="Enter proof name"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#04112f',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#04112f',
                    }
                  }
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#2196f3',
                '&:hover': {
                  backgroundColor: '#1976d2'
                }
              }}
            >
              SUBMIT
            </Button>
            <Button
              variant="contained"
              onClick={handleReset}
              sx={{
                backgroundColor: '#f44336',
                '&:hover': {
                  backgroundColor: '#d32f2f'
                }
              }}
            >
              RESET
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* ID and Address Proof Table */}
      <Card sx={{ boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <CardContent sx={{ padding: '2rem' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#04112f', 
              mb: 3, 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            📄 ID AND ADDRESS PROOF
          </Typography>
          
          <ExportableTable
            columns={columns}
            data={proofData}
            isLoading={false}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Proof;

