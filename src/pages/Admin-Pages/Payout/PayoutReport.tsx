import { useState } from 'react';
import { Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Typography, Button, TextField, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExportableTable from '../../../utils/ExportableTable';
import { getPayoutReportColumns } from '../../../utils/DataTableColumnsProvider';
import './PayoutReport.scss';

const PayoutReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [payoutDate, setPayoutDate] = useState('2020-09-30');

  // Mock data for payout report - replace with actual API call
  const payoutReportData: any[] = [
    // Add your payout report data here
  ];

  // Filter payout report data based on search query
  const filteredPayoutReportData = payoutReportData.filter((payout: any) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      payout.accountId?.toLowerCase().includes(searchLower) ||
      payout.memberId?.toLowerCase().includes(searchLower) ||
      payout.memberName?.toLowerCase().includes(searchLower) ||
      payout.rank?.toLowerCase().includes(searchLower) ||
      payout.planName?.toLowerCase().includes(searchLower) ||
      payout.planType?.toLowerCase().includes(searchLower)
    );
  });

  const handleGetPayout = () => {
    // Add your logic to fetch payout data based on selected date
    console.log('Fetching payout for date:', payoutDate);
  };

  const handleCancel = () => {
    setPayoutDate('2020-09-30');
  };

  return (
    <>
      <Grid className="payout-report-container" sx={{ margin: '2rem', mt: 12 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Payout Report
        </Typography>
      </Grid>

      {/* Payout Date Selection */}
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
                 PAYOUT REPORT HERE
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, md: 3 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Select Payout Date
                  </Typography>
                  <TextField
                    type="date"
                    value={payoutDate}
                    onChange={(e) => setPayoutDate(e.target.value)}
                    fullWidth
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 9 }} sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={handleGetPayout}
                    sx={{
                      backgroundColor: '#5bc0de',
                      '&:hover': { backgroundColor: '#46b8da' },
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    Get Payout
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

      {/* Payout Report Table */}
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
                 VIEW REPORT
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ExportableTable
                columns={getPayoutReportColumns()}
                data={filteredPayoutReportData}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
              />
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
};

export default PayoutReport;
