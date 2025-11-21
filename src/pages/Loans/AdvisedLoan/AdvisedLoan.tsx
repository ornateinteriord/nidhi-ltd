import { useState } from 'react';
import { Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExportableTable from '../../../utils/ExportableTable';
import { getAdvisedLoanColumns } from '../../../utils/DataTableColumnsProvider';
import './AdvisedLoan.scss';

const AdvisedLoan = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for advised loan - replace with actual API call
  const advisedLoanData: any[] = [
    // Add your advised loan data here
  ];

  // Filter advised loan data based on search query
  const filteredAdvisedLoanData = advisedLoanData.filter((loan: any) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      loan.account?.toLowerCase().includes(searchLower) ||
      loan.memberId?.toLowerCase().includes(searchLower) ||
      loan.memberName?.toLowerCase().includes(searchLower) ||
      loan.mode?.toLowerCase().includes(searchLower) ||
      loan.status?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <Grid className="advised-loan-container" sx={{ margin: '2rem', mt: 12 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Advised Loan
        </Typography>
      </Grid>

      {/* Advised Loan Detail Table */}
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
                 LOAN DETAIL
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ExportableTable
                columns={getAdvisedLoanColumns()}
                data={filteredAdvisedLoanData}
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

export default AdvisedLoan;
