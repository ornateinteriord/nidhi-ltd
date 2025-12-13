import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ExportableTable from '../../../utils/ExportableTable';

const City = () => {
  const [formData, setFormData] = useState({
    selectedState: '',
    cityName: '',
  });

  // State options
  const stateOptions = [
    'Andaman and Nicobar Island',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
  ];

  // Sample data for the table
  const cityData = [
    { id: 1, state: 'Bihar', city: 'Araria', status: 'inactive' },
    { id: 2, state: 'Bihar', city: 'Arrah', status: 'inactive' },
    { id: 3, state: 'Bihar', city: 'Bagaha', status: 'inactive' },
    { id: 4, state: 'Bihar', city: 'Begusarai', status: 'inactive' },
    { id: 5, state: 'Bihar', city: 'Bettiah', status: 'active' },
    { id: 6, state: 'Bihar', city: 'Bhagalpur', status: 'inactive' },
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
      name: 'City',
      selector: (row: any) => row.city,
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

  const handleSelectChange = (e: any) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedState: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data Submitted:', formData);
    alert('City Added Successfully!');
  };

  const handleReset = () => {
    setFormData({
      selectedState: '',
      cityName: '',
    });
  };

  return (
    <Box sx={{ margin: '2rem', mt: 10 }}>
      {/* Add New City Form */}
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
            🏙️ ADD NEW CITY
          </Typography>
          
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl 
                  fullWidth
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
                >
                  <InputLabel>Select State</InputLabel>
                  <Select
                    value={formData.selectedState}
                    label="Select State"
                    onChange={handleSelectChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <LocationOnIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    }
                  >
                    {stateOptions.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="City Name"
                  name="cityName"
                  value={formData.cityName}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter city name"
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
                        <LocationCityIcon sx={{ color: '#04112f' }} />
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
          </Box>
        </CardContent>
      </Card>

      {/* City List Table */}
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
            📋 CITY LIST
          </Typography>
          
          <ExportableTable
            columns={columns}
            data={cityData}
            isLoading={false}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default City;
