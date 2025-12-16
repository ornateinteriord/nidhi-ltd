import { useState } from 'react';
import { Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExportableTable from '../../../utils/ExportableTable';
import { getFreshPlansColumns, getRenewalPlansColumns } from '../../../utils/DataTableColumnsProvider';
import './Plans.scss';

const Plans = () => {
  const [freshPlansSearchQuery, setFreshPlansSearchQuery] = useState('');
  const [renewalPlansSearchQuery, setRenewalPlansSearchQuery] = useState('');

  // Mock data for fresh plans - replace with actual API call
  const freshPlansData: any[] = [
    // Add your fresh plans data here
  ];

  // Mock data for renewal plans - replace with actual API call
  const renewalPlansData: any[] = [
    // Add your renewal plans data here
  ];

  // Filter fresh plans based on search query
  const filteredFreshPlans = freshPlansData.filter((plan: any) => {
    const searchLower = freshPlansSearchQuery.toLowerCase();
    return (
      plan.memberCode?.toLowerCase().includes(searchLower) ||
      plan.accountNo?.toLowerCase().includes(searchLower) ||
      plan.planType?.toLowerCase().includes(searchLower)
    );
  });

  // Filter renewal plans based on search query
  const filteredRenewalPlans = renewalPlansData.filter((plan: any) => {
    const searchLower = renewalPlansSearchQuery.toLowerCase();
    return (
      plan.memberCode?.toLowerCase().includes(searchLower) ||
      plan.accountNo?.toLowerCase().includes(searchLower) ||
      plan.planType?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <Grid className="plans-container" sx={{ margin: '2rem', mt: 12 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          View Advisor Plans (with self)
        </Typography>
      </Grid>

      {/* Fresh Plans Table */}
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
                 LIST OF ALL FRESH PLANS OF CURRENT MONTH
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ExportableTable
                columns={getFreshPlansColumns()}
                data={filteredFreshPlans}
                searchQuery={freshPlansSearchQuery}
                onSearchChange={setFreshPlansSearchQuery}
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
              />
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

      {/* Renewal Plans Table */}
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
                 LIST OF ALL RENEWAL PLANS
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ExportableTable
                columns={getRenewalPlansColumns()}
                data={filteredRenewalPlans}
                searchQuery={renewalPlansSearchQuery}
                onSearchChange={setRenewalPlansSearchQuery}
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

export default Plans;
