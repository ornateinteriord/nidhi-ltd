
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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkIcon from '@mui/icons-material/Work';
import ExportableTable from '../../../utils/ExportableTable';

const RankName = () => {
  const [formData, setFormData] = useState({
    advisorDesignation: '',
    rank: '',
    isShownToClient: 'Yes',
  });

  // Sample data for the table
  const rankData = [
    { id: 1, designation: 'ADVISOR', rank: '1', showToClient: 'True', status: 'inactive' },
    { id: 2, designation: 'FIELD MANAGER', rank: '2', showToClient: 'True', status: 'inactive' },
    { id: 3, designation: 'SR.FIELD MANAGER', rank: '3', showToClient: 'True', status: 'inactive' },
    { id: 4, designation: 'SALES MANAGER', rank: '4', showToClient: 'True', status: 'inactive' },
    { id: 5, designation: 'S.S.M', rank: '5', showToClient: 'True', status: 'inactive' },
    { id: 6, designation: 'AREA MANAGER', rank: '6', showToClient: 'True', status: 'inactive' },
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
      name: 'Designation',
      selector: (row: any) => row.designation,
      sortable: true,
    },
    {
      name: 'Rank',
      selector: (row: any) => row.rank,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Show to client',
      selector: (row: any) => row.showToClient,
      sortable: true,
      width: '120px'
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

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      isShownToClient: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data Submitted:', formData);
    alert('Rank Added Successfully!');
  };

  const handleReset = () => {
    setFormData({
      advisorDesignation: '',
      rank: '',
      isShownToClient: 'Yes',
    });
  };

  return (
    <Box sx={{ margin: '2rem', mt: 10 }}>
      {/* Add New Rank Form */}
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
            📊 RANK MASTER
          </Typography>
          
          <Box component="form" sx={{ mt: 2 }}>
            <Grid2 container spacing={3}>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Advisor Designation"
                  name="advisorDesignation"
                  value={formData.advisorDesignation}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter advisor designation"
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
                        <WorkIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Rank"
                  name="rank"
                  value={formData.rank}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter rank"
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
                        <TrendingUpIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, md: 4 }}>
                <FormControl component="fieldset">
                  <FormLabel 
                    component="legend" 
                    sx={{ 
                      color: '#04112f', 
                      fontWeight: 'bold',
                      mb: 1
                    }}
                  >
                    Is shown to client
                  </FormLabel>
                  <RadioGroup
                    row
                    name="isShownToClient"
                    value={formData.isShownToClient}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel 
                      value="Yes" 
                      control={<Radio sx={{ color: '#04112f' }} />} 
                      label="Yes" 
                    />
                    <FormControlLabel 
                      value="No" 
                      control={<Radio sx={{ color: '#04112f' }} />} 
                      label="No" 
                    />
                  </RadioGroup>
                </FormControl>
              </Grid2>
            </Grid2>

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

      {/* Rank Master Table */}
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
            📋 RANK MASTER
          </Typography>
          
          <ExportableTable
            columns={columns}
            data={rankData}
            isLoading={false}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default RankName;

