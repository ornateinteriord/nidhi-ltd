
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

const AdvisorFee = () => {
  const [formData, setFormData] = useState({
    advisorFee: '',
  });

  // Sample data for the table
  const advisorFeeData = [
    { id: 1, advisorFee: '200.00', date: '2021-09-08 18:19:27' },
    { id: 2, advisorFee: '250.00', date: '2022-03-15 14:30:45' },
    { id: 3, advisorFee: '300.00', date: '2023-06-20 10:15:30' },
    { id: 4, advisorFee: '275.00', date: '2024-01-12 16:45:22' },
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
      name: 'Advisor Fee',
      selector: (row: any) => row.advisorFee,
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
    alert('Advisor Fee Added Successfully!');
  };

  const handleReset = () => {
    setFormData({
      advisorFee: '',
    });
  };

  return (
    <Box sx={{ margin: '2rem', mt: 10 }}>
      {/* Add Advisor Fee Form */}
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
            💼 ADD ADVISOR FEE
          </Typography>
          
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              label="Advisor Fee"
              name="advisorFee"
              value={formData.advisorFee}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              type="number"
              placeholder="Enter advisor fee"
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

      {/* Advisor Fee Table */}
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
            📋 ADVISOR FEE
          </Typography>
          
          <ExportableTable
            columns={columns}
            data={advisorFeeData}
            isLoading={false}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdvisorFee;

