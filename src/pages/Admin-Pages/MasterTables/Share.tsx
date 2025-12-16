
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

const Share = () => {
  const [formData, setFormData] = useState({
    sharePrice: '',
  });

  // Sample data for the table
  const shareData = [
    { id: 1, sharePrice: '10', date: '2021-01-16' },
    { id: 2, sharePrice: '12', date: '2022-03-20' },
    { id: 3, sharePrice: '15', date: '2023-06-15' },
    { id: 4, sharePrice: '18', date: '2024-01-10' },
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
      name: 'Share Price',
      selector: (row: any) => row.sharePrice,
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
    alert('Share Price Added Successfully!');
  };

  const handleReset = () => {
    setFormData({
      sharePrice: '',
    });
  };

  return (
    <Box sx={{ margin: '2rem', mt: 10 }}>
      {/* Add Share Price Form */}
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
            📈 ADD SHARE PRICE
          </Typography>
          
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              label="Share Price"
              name="sharePrice"
              value={formData.sharePrice}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              type="number"
              placeholder="Enter share price"
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

      {/* Share Price Table */}
      <Card sx={{ boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <CardContent sx={{ padding: '2rem' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a237e', mb: 1 }}>
            📊 SHARE
          </Typography>
          
          <ExportableTable
            columns={columns}
            data={shareData}
            isLoading={false}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Share;

