
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  InputAdornment,
  Grid
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExportableTable from '../../../utils/ExportableTable';

const CompanyBank = () => {
  const [formData, setFormData] = useState({
    bankName: '',
    bankAccountNo: '',
    bankIFSC: '',
    bankAddress: '',
  });

  // Sample data for the table
  const companyBankData = [
    { 
      id: 1, 
      bankName: 'State Bank of India', 
      bankAccountNo: '12345678901234', 
      ifsc: 'SBIN0001234', 
      address: 'Main Branch, New Delhi',
      status: 'active'
    },
    { 
      id: 2, 
      bankName: 'HDFC Bank', 
      bankAccountNo: '50100123456789', 
      ifsc: 'HDFC0001234', 
      address: 'Corporate Branch, Mumbai',
      status: 'active'
    },
    { 
      id: 3, 
      bankName: 'ICICI Bank', 
      bankAccountNo: '98765432109876', 
      ifsc: 'ICIC0001234', 
      address: 'Business Branch, Bangalore',
      status: 'active'
    },
  ];

  // Table columns
  const columns = [
    {
      name: 'S.No',
      selector: (row: any) => row.id,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Bank Name',
      selector: (row: any) => row.bankName,
      sortable: true,
    },
    {
      name: 'Bank Acc. No.',
      selector: (row: any) => row.bankAccountNo,
      sortable: true,
    },
    {
      name: 'IFSC',
      selector: (row: any) => row.ifsc,
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row: any) => row.address,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (_row: any) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="contained"
            sx={{
              backgroundColor: '#ffc107',
              color: '#000',
              fontSize: '10px',
              minWidth: '50px',
              height: '25px',
              '&:hover': {
                backgroundColor: '#ffb300'
              }
            }}
          >
            EDIT
          </Button>
        </Box>
      ),
      width: '100px'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data Submitted:', formData);
    alert('Company Bank Details Added Successfully!');
  };

  const handleReset = () => {
    setFormData({
      bankName: '',
      bankAccountNo: '',
      bankIFSC: '',
      bankAddress: '',
    });
  };

  return (
    <Box sx={{ margin: '2rem', mt: 10 }}>
      {/* Add Company Bank Form */}
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
            🏦 BANK MASTER
          </Typography>
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <TextField
                label="Bank Name"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="Bank Name"
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalanceIcon sx={{ color: '#04112f' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <TextField
                label="Bank Account No."
                name="bankAccountNo"
                value={formData.bankAccountNo}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="Bank Account No."
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCardIcon sx={{ color: '#04112f' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <TextField
                label="Bank IFSC"
                name="bankIFSC"
                value={formData.bankIFSC}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="Bank IFSC"
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalanceIcon sx={{ color: '#04112f' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <TextField
                label="Bank Address"
                name="bankAddress"
                value={formData.bankAddress}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="Bank Address"
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon sx={{ color: '#04112f' }} />
                    </InputAdornment>
                  ),
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

      {/* Company Bank Details Table */}
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
            📋 DETAIL
          </Typography>
          
          <ExportableTable
            columns={columns}
            data={companyBankData}
            isLoading={false}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default CompanyBank;

