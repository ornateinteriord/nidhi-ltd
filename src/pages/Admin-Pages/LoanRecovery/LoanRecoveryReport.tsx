import { useState } from 'react';
import { Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExportableTable from '../../../utils/ExportableTable';
import { getLoanRecoveryReportColumns } from '../../../utils/DataTableColumnsProvider';
import './LoanRecoveryReport.scss';

const LoanRecoveryReport = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Get today's date in format "Today - YYYY-MM-DD"
  const today = new Date();
  const formattedDate = `Today - ${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // Mock data for loan recovery report - replace with actual API call
  const loanRecoveryData: any[] = [
    // Add your loan recovery data here
  ];

  // Calculate totals
  const totalDepositAmount = loanRecoveryData.reduce((sum, row) => sum + (parseFloat(row.totalDepositAmount) || 0), 0);
  const totalInstAmount = loanRecoveryData.reduce((sum, row) => sum + (parseFloat(row.instAmount) || 0), 0);

  // Filter loan recovery data based on search query
  const filteredLoanRecoveryData = loanRecoveryData.filter((loan: any) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      loan.memberId?.toLowerCase().includes(searchLower) ||
      loan.memberName?.toLowerCase().includes(searchLower) ||
      loan.loanId?.toLowerCase().includes(searchLower) ||
      loan.mobileNo?.toLowerCase().includes(searchLower)
    );
  });

  const handlePayAmount = () => {
    // Add your logic to process payment
    console.log('Processing payment for loan recovery');
  };

  return (
    <>
      <Grid className="loan-recovery-report-container" sx={{ margin: '2rem', mt: 12 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Loan Recovery Report
        </Typography>
      </Grid>

      {/* Loan Recovery Table */}
      <Card sx={{ margin: '2rem', mt: 2 }}>
        <CardContent>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: '#7e22ce',
                color: '#fff',
                '& .MuiSvgIcon-root': { color: '#fff' }
              }}
            >
              <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                 COLLECT LOAN INSTALLMENT <span style={{ color: '#ff6b6b', marginLeft: '0.5rem' }}>({formattedDate})</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ExportableTable
                columns={getLoanRecoveryReportColumns()}
                data={filteredLoanRecoveryData}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
              />
              
              {/* Total Row */}
              <Grid container sx={{ mt: 2, pt: 2, borderTop: '2px solid #e0e0e0' }}>
                <Grid size={{ xs: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Total
                  </Typography>
                </Grid>
                <Grid size={{ xs: 2 }}></Grid>
                <Grid size={{ xs: 2 }}></Grid>
                <Grid size={{ xs: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {totalDepositAmount}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {totalInstAmount}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 3 }}></Grid>
              </Grid>

              {/* Pay Amount Button */}
              <Grid container sx={{ mt: 3 }}>
                <Grid size={{ xs: 12 }}>
                  <Button
                    variant="contained"
                    onClick={handlePayAmount}
                    sx={{
                      backgroundColor: '#5bc0de',
                      '&:hover': { backgroundColor: '#46b8da' },
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      padding: '8px 24px',
                    }}
                  >
                    Pay Amount
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
};

export default LoanRecoveryReport;
