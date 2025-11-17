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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExportableTable from '../../../utils/ExportableTable';

const State = () => {
  const [formData, setFormData] = useState({
    stateName: '',
  });

  // Sample data for the table
  const stateData = [
    { id: 1, state: 'Andaman and Nicobar Island', status: 'inactive' },
    { id: 2, state: 'Andhra Pradesh', status: 'inactive' },
    { id: 3, state: 'Arunachal Pradesh', status: 'inactive' },
    { id: 4, state: 'Assam', status: 'inactive' },
    { id: 5, state: 'Bihar', status: 'active' },
    { id: 6, state: 'Bihar', status: 'active' },
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
      name: 'State',
      selector: (row: any) => row.state,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row: any) => (
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
              color: row.status === 'active' ? '#4caf50' : '#f44336',
              '&:hover': {
                backgroundColor: row.status === 'active' ? '#e8f5e8' : '#ffebee'
              }
            }}
          >
            {row.status === 'active' ? '✓' : '✗'}
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

  const handleSubmit = () => {
    console.log('Form Data Submitted:', formData);
    alert('State Added Successfully!');
  };

  const handleReset = () => {
    setFormData({
      stateName: '',
    });
  };

  return (
    <Box sx={{ margin: '2rem', mt: 10 }}>
      {/* Add New State Form */}
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
            📍 ADD NEW STATE
          </Typography>
          
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              label="State Name"
              name="stateName"
              value={formData.stateName}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter state name"
              sx={{
                mb: 3,
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

            <Box sx={{ display: 'flex', gap: 2 }}>
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

      {/* State List Table */}
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
            📋 STATE LIST
          </Typography>
          
          <ExportableTable
            columns={columns}
            data={stateData}
            isLoading={false}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default State;
