import { useState } from 'react';
import { Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExportableTable from '../../../utils/ExportableTable';
import { getCollectedLoanReportColumns } from '../../../utils/DataTableColumnsProvider';
import './CollectedLoanReport.scss';

const CollectedLoanReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('2025-11-20');
  const [toDate, setToDate] = useState('2025-11-20');
  const [loanId, setLoanId] = useState('');
  const [status, setStatus] = useState('');

  // Mock data for collected loan report - replace with actual API call
  const collectedLoanData: any[] = [
    // Add your collected loan data here
  ];

  // Calculate total paid amount
  const totalPaidAmount = collectedLoanData.reduce((sum, row) => sum + (parseFloat(row.paidAmount) || 0), 0);

  // Filter collected loan data based on search query
  const filteredCollectedLoanData = collectedLoanData.filter((loan: any) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      loan.memberId?.toLowerCase().includes(searchLower) ||
      loan.memberName?.toLowerCase().includes(searchLower) ||
      loan.accountNumber?.toLowerCase().includes(searchLower) ||
      loan.status?.toLowerCase().includes(searchLower)
    );
  });

  const handleSearch = () => {
    // Add your logic to fetch collected loan report data based on filters
    console.log('Searching with filters:', { fromDate, toDate, loanId, status });
  };

  const handleCancel = () => {
    setFromDate('2025-11-20');
    setToDate('2025-11-20');
    setLoanId('');
    setStatus('');
  };

  return (
    <>
      <Grid className="collected-loan-report-container" sx={{ margin: '2rem', mt: 12 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Collected Loan Installment
        </Typography>
      </Grid>

      {/* Search Filters */}
      <Card sx={{ margin: '2rem', mt: 2 }}>
        <CardContent>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: '#042f2e ',
                color: '#fff',
                '& .MuiSvgIcon-root': { color: '#fff' }
              }}
            >
              <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                 SEARCH
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, md: 2.5 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    From Date
                  </Typography>
                  <TextField
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    fullWidth
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 2.5 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    To Date
                  </Typography>
                  <TextField
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    fullWidth
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 2.5 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Loan Id
                  </Typography>
                  <TextField
                    value={loanId}
                    onChange={(e) => setLoanId(e.target.value)}
                    fullWidth
                    size="small"
                    placeholder="Enter Loan Id"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 2.5 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      <MenuItem value="paid">Paid</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 2 }} sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{
                      backgroundColor: '#5bc0de',
                      '&:hover': { backgroundColor: '#46b8da' },
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    Search
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleCancel}
                    sx={{
                      backgroundColor: '#d9534f',
                      '&:hover': { backgroundColor: '#c9302c' },
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

      {/* Collected Loan Installment Report Table */}
      <Card sx={{ margin: '2rem', mt: 2 }}>
        <CardContent>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: '#042f2e ',
                color: '#fff',
                '& .MuiSvgIcon-root': { color: '#fff' }
              }}
            >
              <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                COLLECTED LOAN INSTALLMENT REPORT
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ExportableTable
                columns={getCollectedLoanReportColumns()}
                data={filteredCollectedLoanData}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
              />
              
              {/* Total Row */}
              <Grid container sx={{ mt: 2, pt: 2, borderTop: '2px solid #e0e0e0' }}>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Total
                  </Typography>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                    {totalPaidAmount}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
};

export default CollectedLoanReport;
