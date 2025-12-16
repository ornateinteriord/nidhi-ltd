import { useState } from 'react';
import { Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExportableTable from '../../../utils/ExportableTable';
import { getAdminTeamColumns } from '../../../utils/DataTableColumnsProvider';
import './Team.scss';

const Team = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for team - replace with actual API call
  const teamData: any[] = [
    // Add your team data here
  ];

  // Filter team data based on search query
  const filteredTeamData = teamData.filter((member: any) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      member.memberId?.toLowerCase().includes(searchLower) ||
      member.memberName?.toLowerCase().includes(searchLower) ||
      member.rank?.toLowerCase().includes(searchLower) ||
      member.introducerId?.toLowerCase().includes(searchLower) ||
      member.introducerName?.toLowerCase().includes(searchLower) ||
      member.branchCode?.toLowerCase().includes(searchLower) ||
      member.branchName?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <Grid className="team-container" sx={{ margin: '2rem', mt: 12 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Team of Advisor
        </Typography>
      </Grid>

      {/* Team Table */}
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
                TEAM OF ADVISOR
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ExportableTable
                columns={getAdminTeamColumns()}
                data={filteredTeamData}
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

export default Team;
