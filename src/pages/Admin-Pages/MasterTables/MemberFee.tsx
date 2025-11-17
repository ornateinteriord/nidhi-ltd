
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  InputAdornment
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ExportableTable from '../../../utils/ExportableTable';

const MemberFee = () => {
  const [formData, setFormData] = useState({
    memberFee: '',
  });

  // Sample data for the table
  const memberFeeData = [
    { id: 1, memberFee: '100.00', date: '2025-09-09 16:56:48' },
    { id: 2, memberFee: '150.00', date: '2024-08-15 14:30:22' },
    { id: 3, memberFee: '120.00', date: '2024-06-20 10:15:35' },
    { id: 4, memberFee: '200.00', date: '2024-03-12 09:45:18' },
  ];

  // Table columns
  const columns = [
    {
      name: 'S. No.',
      selector: (row: any) => row.id,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Member Fee',
      selector: (row: any) => row.memberFee,
      sortable: true,
    },
    {
      name: 'Date',
      selector: (row: any) => row.date,
      sortable: true,
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
    alert('Member Fee Added Successfully!');
  };

  const handleReset = () => {
    setFormData({
      memberFee: '',
    });
  };

  return (
    <Box sx={{ margin: '2rem', mt: 10 }}>
      {/* Add Member Fee Form */}
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
            💰 ADD MEMBER FEE
          </Typography>
          
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              label="Member Fee"
              name="memberFee"
              value={formData.memberFee}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              type="number"
              placeholder="Enter member fee"
              sx={{
                maxWidth: '400px',
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
                    <MonetizationOnIcon sx={{ color: '#04112f' }} />
                  </InputAdornment>
                ),
              }}
            />

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
          </Box>
        </CardContent>
      </Card>

      {/* Member Fee Table */}
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
            📋 MEMBER FEE
          </Typography>
          
          <ExportableTable
            columns={columns}
            data={memberFeeData}
            isLoading={false}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default MemberFee;

