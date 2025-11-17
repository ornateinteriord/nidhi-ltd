
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
import BusinessIcon from '@mui/icons-material/Business';
import CodeIcon from '@mui/icons-material/Code';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HomeIcon from '@mui/icons-material/Home';
import ExportableTable from '../../../utils/ExportableTable';

const Branch = () => {
  const [formData, setFormData] = useState({
    branchName: '',
    branchCode: '',
    contactPersonName: '',
    mobile: '',
    email: '',
    password: '',
    selectedState: '',
    selectedCity: '',
    address: '',
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

  // City options (filtered based on selected state)
  const cityOptions = [
    'Lucknow',
    'Kanpur',
    'Agra',
    'Varanasi',
    'Allahabad',
    'Meerut',
    'Ghaziabad',
    'Noida',
    'Sultanpur'
  ];

  // Sample data for the table
  const branchData = [
    {
      id: 1,
      branchName: 'HEAD OFFICE',
      branchCode: '100',
      address: 'MD 23 SECTOR D KANPUR ROAD LUCKNOW Lucknow UP 226012 IN',
      branchPerson: 'ADMIN',
      mobile: '5229962012',
      email: 'test@gmail.com',
      password: '123456',
      state: 'Uttar Pradesh',
      city: 'Lucknow',
      status: 'inactive'
    },
    {
      id: 2,
      branchName: 'ARLAK NIDHI BRANCH',
      branchCode: '101',
      address: 'MD 23 SECTOR D KANPUR ROAD LUCKNOW Lucknow UP 226071 IN',
      branchPerson: 'Branch Manager',
      mobile: '7704002735',
      email: 'branch@nidhi.com',
      password: '12345',
      state: 'Uttar Pradesh',
      city: 'Lucknow',
      status: 'inactive'
    },
    {
      id: 3,
      branchName: 'Branch2',
      branchCode: '102',
      address: 'Branch2',
      branchPerson: 'Branch2',
      mobile: '7704002735',
      email: 'branch2@GMAIL.COM',
      password: '123',
      state: 'Uttar Pradesh',
      city: 'SULTANPUR',
      status: 'inactive'
    }
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
      name: 'Branch Name/Code',
      selector: (row: any) => `${row.branchName} / ${row.branchCode}`,
      sortable: true,
      width: '150px'
    },
    {
      name: 'Address',
      selector: (row: any) => row.address,
      sortable: true,
      width: '200px'
    },
    {
      name: 'Branch Person',
      selector: (row: any) => row.branchPerson,
      sortable: true,
      width: '120px'
    },
    {
      name: 'Mobile',
      selector: (row: any) => row.mobile,
      sortable: true,
      width: '120px'
    },
    {
      name: 'Email',
      selector: (row: any) => row.email,
      sortable: true,
      width: '150px'
    },
    {
      name: 'Password',
      selector: (row: any) => row.password,
      sortable: true,
      width: '100px'
    },
    {
      name: 'State',
      selector: (row: any) => row.state,
      sortable: true,
      width: '120px'
    },
    {
      name: 'City',
      selector: (row: any) => row.city,
      sortable: true,
      width: '100px'
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (field: string) => (e: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data Submitted:', formData);
    alert('Branch Added Successfully!');
  };

  const handleReset = () => {
    setFormData({
      branchName: '',
      branchCode: '',
      contactPersonName: '',
      mobile: '',
      email: '',
      password: '',
      selectedState: '',
      selectedCity: '',
      address: '',
    });
  };

  return (
    <Box sx={{ margin: '2rem', mt: 10 }}>
      {/* Add New Branch Form */}
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
            🏢 BRANCH MASTER
          </Typography>
          
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Branch Name"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter branch name"
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
                        <BusinessIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Branch Code"
                  name="branchCode"
                  value={formData.branchCode}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter branch code"
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
                        <CodeIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Contact Person Name"
                  name="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter contact person name"
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
                        <PersonIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter mobile number"
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
                        <PhoneIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Email/User Id"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter email address"
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
                        <EmailIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter password"
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
                        <LockIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
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
                    onChange={handleSelectChange('selectedState')}
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

              <Grid item xs={12} md={6}>
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
                  <InputLabel>Select City</InputLabel>
                  <Select
                    value={formData.selectedCity}
                    label="Select City"
                    onChange={handleSelectChange('selectedCity')}
                    startAdornment={
                      <InputAdornment position="start">
                        <LocationCityIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    }
                  >
                    {cityOptions.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  placeholder="Enter address"
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
                        <HomeIcon sx={{ color: '#04112f' }} />
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

      {/* Branch Detail Table */}
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
            📋 BRANCH DETAIL
          </Typography>
          
          <ExportableTable
            columns={columns}
            data={branchData}
            isLoading={false}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Branch;

