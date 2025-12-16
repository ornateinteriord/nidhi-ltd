import { useState } from 'react';
import { Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExportableTable from '../../../utils/ExportableTable';
import { getSelfLoanColumns } from '../../../utils/DataTableColumnsProvider';
import './SelfLoan.scss';

const SelfLoan = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for self loan - replace with actual API call
  const selfLoanData: any[] = [
    // Add your self loan data here
  ];

  // Filter self loan data based on search query
  const filteredSelfLoanData = selfLoanData.filter((loan: any) => {
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
      <Grid className="self-loan-container" sx={{ margin: '2rem', mt: 12 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Self Loan
        </Typography>
      </Grid>

      {/* Self Loan Detail Table */}
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
                 LOAN DETAIL
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ExportableTable
                columns={getSelfLoanColumns()}
                data={filteredSelfLoanData}
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

export default SelfLoan;
