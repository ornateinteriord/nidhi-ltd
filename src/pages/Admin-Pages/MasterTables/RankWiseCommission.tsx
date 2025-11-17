
import { useState } from 'react';
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
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import ExportableTable from '../../../utils/ExportableTable';

const RankWiseCommission = () => {
  const [formData, setFormData] = useState({
    planType: '',
    plan: '',
    commissionData: {}
  });

  // Plan type options
  const planTypes = [
    'Fixed Deposit',
    'Recurring Deposit',
    'Monthly Interest Scheme',
    'Daily Deposit Plan'
  ];

  // Plan options based on plan type
  const planOptions = {
    'Fixed Deposit': [
      'FD FOR ONE YEAR (12)',
      'FD 24 MONTH (24)',
      'FD 72 MONTHS (72)',
      'FD 60MONTHS (60)',
      'FD FOR 84 MONTHS (84)',
      'FD FOR 5 YEARS (60)',
      'FD FOR 6 YEARS (72)',
      'FD FOR 7.5 YEARS (90)',
      'FD FOR 9 YEARS (108)',
      'FD FOR 18 YEARS (216)'
    ],
    'Recurring Deposit': [
      'RD FOR 12 MONTHS (12)',
      'RD FOR 24 MONTHS (24)',
      'RD FOR 36 MONTHS (36)',
      'RD FOR 84 MONTHS (84)',
      'RD 60MONTHS (60)'
    ],
    'Monthly Interest Scheme': [
      'M.I.S FOR 60 MONTHS (60)',
      'MIS FOR 84 MONTHS (84)',
      'MIS FOR 120 MONTHS (120)'
    ],
    'Daily Deposit Plan': [
      'DD 12 MONTH (365)',
      'DD 18 MONTHS (548)'
    ]
  };

  // Designation list for commission percentage
  const designations = [
    'ADVISOR',
    'FIELD MANAGER',
    'SR.FIELD MANAGER',
    'SALES MANAGER',
    'S.S.M',
    'AREA MANAGER',
    'S.A.MANAGER',
    'Division Manager(DM)',
    'Sr.Divisional Manager(SDM)',
    'Reg.Manager',
    'Sr.Reg.Manager(SRM)',
    'ZONAL MANAGER',
    'SR. ZONAL MANAGER',
    'Field Manager Director'
  ];

  // Sample data for the table
  const commissionData = [
    { id: 1, planType: 'Fixed Deposit', planName: 'FD FOR ONE YEAR (12 months)', status: 'active' },
    { id: 2, planType: 'Daily Deposit Plan', planName: 'DD 12 MONTH (365 months)', status: 'active' },
    { id: 3, planType: 'Recurring Deposit', planName: 'RD FOR 12 MONTHS (12 months)', status: 'active' },
    { id: 4, planType: 'Daily Deposit Plan', planName: 'DD 365 DAYS (365 months)', status: 'active' },
    { id: 5, planType: 'Daily Deposit Plan', planName: 'DD 730 DAYS (730 months)', status: 'active' },
    { id: 6, planType: 'Daily Deposit Plan', planName: 'DD 1095 DAYS (1095 months)', status: 'active' },
    { id: 7, planType: 'Daily Deposit Plan', planName: 'DD 1825 DAYS (1825 months)', status: 'active' },
    { id: 8, planType: 'Recurring Deposit', planName: 'RD FOR 24 MONTHS (24 months)', status: 'active' },
    { id: 9, planType: 'Recurring Deposit', planName: 'RD FOR 36 MONTHS (36 months)', status: 'active' },
    { id: 10, planType: 'Recurring Deposit', planName: 'RD FOR 84 MONTHS (84 months)', status: 'active' }
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
      name: 'Plan Type',
      selector: (row: any) => row.planType,
      sortable: true,
    },
    {
      name: 'Plan Name',
      selector: (row: any) => row.planName,
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
            📊
          </Button>
        </Box>
      ),
      width: '120px'
    }
  ];

  const handlePlanTypeChange = (e: any) => {
    setFormData({
      ...formData,
      planType: e.target.value,
      plan: '', // Reset plan when plan type changes
      commissionData: {}
    });
  };

  const handlePlanChange = (e: any) => {
    setFormData({
      ...formData,
      plan: e.target.value,
      commissionData: {}
    });
  };

  const handleCommissionChange = (designation: string, value: string) => {
    setFormData({
      ...formData,
      commissionData: {
        ...formData.commissionData,
        [designation]: value
      }
    });
  };

  const handleSubmit = () => {
    console.log('Form Data Submitted:', formData);
    alert('Commission Data Saved Successfully!');
  };

  const handleReset = () => {
    setFormData({
      planType: '',
      plan: '',
      commissionData: {}
    });
  };

  return (
    <Box sx={{ margin: '2rem', mt: 10 }}>
      {/* Plan Selection Form */}
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
            📊 CLOSING MASTER (COMMISSION CHARGE)
          </Typography>
          
          <Grid container spacing={3}>
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
                <InputLabel>Plan Type *</InputLabel>
                <Select
                  value={formData.planType}
                  label="Plan Type *"
                  onChange={handlePlanTypeChange}
                >
                  <MenuItem value="">-- Select --</MenuItem>
                  {planTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl 
                fullWidth
                disabled={!formData.planType}
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
                <InputLabel>Plan *</InputLabel>
                <Select
                  value={formData.plan}
                  label="Plan *"
                  onChange={handlePlanChange}
                >
                  <MenuItem value="">-- Select --</MenuItem>
                  {formData.planType && planOptions[formData.planType as keyof typeof planOptions]?.map((plan) => (
                    <MenuItem key={plan} value={plan}>
                      {plan}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Commission Percentage Form */}
      {formData.planType && formData.plan && (
        <Card sx={{ boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', mb: 3 }}>
          <CardContent sx={{ padding: '2rem' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#fff', 
                mb: 3, 
                fontWeight: 'bold',
                backgroundColor: '#04112f',
                padding: '1rem',
                borderRadius: '4px'
              }}
            >
              Set Closing Percentage (%)
            </Typography>
            
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Designation</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>0-18</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {designations.map((designation) => (
                    <TableRow key={designation}>
                      <TableCell>{designation}</TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          type="number"
                          value={formData.commissionData[designation as keyof typeof formData.commissionData] || ''}
                          onChange={(e) => handleCommissionChange(designation, e.target.value)}
                          placeholder="0"
                          sx={{ width: '100px' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

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
      )}

      {/* Commission Data Table */}
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
            📋 CLOSING MASTER (COMMISSION CHARGE)
          </Typography>
          
          <ExportableTable
            columns={columns}
            data={commissionData}
            isLoading={false}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default RankWiseCommission;

