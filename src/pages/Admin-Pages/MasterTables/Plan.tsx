
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
  InputAdornment,
  Grid
} from '@mui/material';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CodeIcon from '@mui/icons-material/Code';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PercentIcon from '@mui/icons-material/Percent';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ExportableTable from '../../../utils/ExportableTable';

const Plan = () => {
  const [formData, setFormData] = useState({
    planType: '',
    planName: '',
    planCode: '',
    depositoryTerms: '',
    reimbursementTerms: '',
    spotIncome: '',
    interestRateGeneral: '',
    interestRateSpecial: '',
    bonus: '',
    preMaturityTerm: '',
    preMaturityRate: '',
    prePreMaturityTerm: '',
    prePreMaturityFine: '',
  });

  // Plan type options
  const planTypes = [
    'Fixed Deposit',
    'Recurring Deposit',
    'Monthly Interest Scheme',
    'Daily Deposit Plan'
  ];

  // Sample data for the table
  const planData = [
    {
      id: 1,
      type: 'Fixed Deposit',
      planCode: 'FD0001',
      planName: 'FD FOR ONE YEAR',
      depositTerm: '12',
      maturityTerm: '12',
      instRateGeneral: '10.0000',
      instRateSpecial: '10.0000',
      preMaturityRate: '0.0000',
      preMaturityTerm: '9',
      spotBonus: '0.00',
      bonus: '0.00',
      fineType: 'Daily',
      fineRate: '0.00'
    },
    {
      id: 2,
      type: 'Daily Deposit Plan',
      planCode: 'DD0001',
      planName: 'DD 12 MONTH',
      depositTerm: '365',
      maturityTerm: '365',
      instRateGeneral: '6.5000',
      instRateSpecial: '6.5000',
      preMaturityRate: '0.0000',
      preMaturityTerm: '0',
      spotBonus: '0.00',
      bonus: '0.00',
      fineType: 'Daily',
      fineRate: '0.00'
    },
    {
      id: 3,
      type: 'Daily Deposit Plan',
      planCode: 'DD0002',
      planName: 'DD 18 MONTHS',
      depositTerm: '547',
      maturityTerm: '548',
      instRateGeneral: '5.1100',
      instRateSpecial: '5.1100',
      preMaturityRate: '0.0000',
      preMaturityTerm: '0',
      spotBonus: '0.00',
      bonus: '0.00',
      fineType: 'Daily',
      fineRate: '0.00'
    },
    {
      id: 4,
      type: 'Recurring Deposit',
      planCode: 'RD0001',
      planName: 'RD FOR 12 MONTHS',
      depositTerm: '12',
      maturityTerm: '12',
      instRateGeneral: '8.0000',
      instRateSpecial: '8.0000',
      preMaturityRate: '0.0000',
      preMaturityTerm: '6',
      spotBonus: '0.00',
      bonus: '0.00',
      fineType: 'Daily',
      fineRate: '0.00'
    }
  ];

  // Table columns
  const columns = [
    {
      name: 'S.N.',
      selector: (row: any) => row.id,
      sortable: true,
      width: '60px'
    },
    {
      name: 'Type',
      selector: (row: any) => row.type,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Plan Code',
      selector: (row: any) => row.planCode,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Plan Name',
      selector: (row: any) => row.planName,
      sortable: true,
      width: '150px'
    },
    {
      name: 'Deposit Term',
      selector: (row: any) => row.depositTerm,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Maturity Term',
      selector: (row: any) => row.maturityTerm,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Inst Rate GEN(%)',
      selector: (row: any) => row.instRateGeneral,
      sortable: true,
      width: '120px'
    },
    {
      name: 'Inst Rate SP(%)',
      selector: (row: any) => row.instRateSpecial,
      sortable: true,
      width: '120px'
    },
    {
      name: 'Pre Maturity Rate',
      selector: (row: any) => row.preMaturityRate,
      sortable: true,
      width: '130px'
    },
    {
      name: 'Pre Maturity Term',
      selector: (row: any) => row.preMaturityTerm,
      sortable: true,
      width: '130px'
    },
    {
      name: 'Spot (%)',
      selector: (row: any) => row.spotBonus,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Bonus',
      selector: (row: any) => row.bonus,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Fine Type',
      selector: (row: any) => row.fineType,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Fine Rate',
      selector: (row: any) => row.fineRate,
      sortable: true,
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

  const handleSelectChange = (e: any) => {
    setFormData((prevData) => ({
      ...prevData,
      planType: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data Submitted:', formData);
    alert('Plan Added Successfully!');
  };

  const handleReset = () => {
    setFormData({
      planType: '',
      planName: '',
      planCode: '',
      depositoryTerms: '',
      reimbursementTerms: '',
      spotIncome: '',
      interestRateGeneral: '',
      interestRateSpecial: '',
      bonus: '',
      preMaturityTerm: '',
      preMaturityRate: '',
      prePreMaturityTerm: '',
      prePreMaturityFine: '',
    });
  };

  return (
    <Box sx={{ margin: '2rem', mt: 10 }}>
      {/* Enter Plan Detail Form */}
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
            📝 ENTER PLAN DETAIL
            <Typography variant="body2" sx={{ color: '#f44336', ml: 2 }}>
              (Note: Please Add Reimbursement Terms Carefully. It affects your Maturity date.)
            </Typography>
          </Typography>
          
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              {/* First Row */}
              <Grid size={{ xs: 12, md: 4 }}>
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
                  <InputLabel>Plan Type</InputLabel>
                  <Select
                    value={formData.planType}
                    label="Plan Type"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="">--</MenuItem>
                    {planTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Plan Name"
                  name="planName"
                  value={formData.planName}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
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
                        <BusinessCenterIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Plan Code"
                  name="planCode"
                  value={formData.planCode}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
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

              {/* Second Row */}
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Depository Terms (In Months)"
                  name="depositoryTerms"
                  value={formData.depositoryTerms}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
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
                        <CalendarTodayIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Reimbursement Terms (In Months)"
                  name="reimbursementTerms"
                  value={formData.reimbursementTerms}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
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
                        <CalendarTodayIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Spot Income (In %)"
                  name="spotIncome"
                  value={formData.spotIncome}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
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
                        <PercentIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Third Row - Interest Rate */}
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Interest Rate (In %) - General"
                  name="interestRateGeneral"
                  value={formData.interestRateGeneral}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
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
                        <PercentIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Special/Senior Citizen"
                  name="interestRateSpecial"
                  value={formData.interestRateSpecial}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
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
                        <PercentIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Bonus (%)(Only In MIS Plan)"
                  name="bonus"
                  value={formData.bonus}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
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
                        <MonetizationOnIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Fourth Row - Pre Maturity */}
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Pre Maturity - Term (In Months)"
                  name="preMaturityTerm"
                  value={formData.preMaturityTerm}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
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
                        <CalendarTodayIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Rate (In %) - (Rate Will be added in your Pre-Matured Amount)"
                  name="preMaturityRate"
                  value={formData.preMaturityRate}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
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
                        <PercentIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ height: '56px' }} /> {/* Spacer */}
              </Grid>

              {/* Fifth Row - Pre Pre Maturity */}
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Pre Pre Maturity - Term (In Months)"
                  name="prePreMaturityTerm"
                  value={formData.prePreMaturityTerm}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
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
                        <CalendarTodayIcon sx={{ color: '#04112f' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Fine (In %) - (Fine Will be Deducted from your Pre-Pre-Matured Amount)"
                  name="prePreMaturityFine"
                  value={formData.prePreMaturityFine}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
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
                        <PercentIcon sx={{ color: '#04112f' }} />
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

      {/* Plan Details Table */}
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
            data={planData}
            isLoading={false}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Plan;

