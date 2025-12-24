import { Box, Grid } from '@mui/material';
import DashboardCard from './DashboardCard';
import ShieldIcon from '@mui/icons-material/Shield';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StorageIcon from '@mui/icons-material/Storage';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DashboardTable from './DashboardTable';
import TimelineComponent from '../../../utils/TimeLineComponent';

const DashboardCards = () => {
  // Sample members data
  const membersData = [
    {
      name: 'MANJUNATH N',
      memberNum: '10512',
      dateOfJoining: '30-01-2021',
      emailId: 'manjunath14480@gmail.com',
      mobileNo: '8867460399',
      status: 'active',
    },
    {
      name: 'SUBRAMANI K V',
      memberNum: '10515',
      dateOfJoining: '05-02-2021',
      emailId: 'manjunath14480@gmail.com',
      mobileNo: '7899745970',
      status: 'active',
    },
    {
      name: 'MANJUNATH N',
      memberNum: '10516',
      dateOfJoining: '05-02-2021',
      emailId: 'manjunath14480@gmail.com',
      mobileNo: '8867460399',
      status: 'active',
    },
    {
      name: 'D N VENKATESH BABU',
      memberNum: '10517',
      dateOfJoining: '05-02-2021',
      emailId: 'manjunath14480@gmail.com',
      mobileNo: '8197543569',
      status: 'active',
    },
    {
      name: 'K RAJAGOPAL',
      memberNum: '10518',
      dateOfJoining: '05-02-2021',
      emailId: '',
      mobileNo: '9945136349',
      status: 'active',
    },
    {
      name: 'B J VANAJAKSHI',
      memberNum: '10519',
      dateOfJoining: '05-02-2021',
      emailId: 'VANASIRIJ@GMAIL.COM',
      mobileNo: '9341252396',
      status: 'active',
    },
    {
      name: 'T G RAMACHANDRA GUPTHA',
      memberNum: '105110',
      dateOfJoining: '05-02-2021',
      emailId: 'RAMACHANDRAGUPTHA123@GMAIL.COM',
      mobileNo: '6363551105',
      status: 'active',
    },
  ];

  // Sample accounts timeline data
  const accountsTimelineData = [
    {
      title: 'Account',
      highlight: '105600002',
      date: 'Created On 02-02-2021',
    },
    {
      title: 'Account',
      highlight: '105600003',
      date: 'Created On 02-02-2021',
    },
  ];

  // Table columns configuration
  const membersColumns = [
    {
      name: 'Name',
      selector: (row: any) => row.name,
      sortable: true,
      style: {
        fontWeight: '600',
        color: '#1a202c',
      },
    },
    {
      name: 'Member Num',
      selector: (row: any) => row.memberNum,
      sortable: true,
      center: true,
      style: {
        color: '#6366f1',
        fontWeight: '500',
      },
    },
    {
      name: 'Date Of Joining',
      selector: (row: any) => row.dateOfJoining,
      sortable: true,
      center: true,
    },
    {
      name: 'Email id',
      selector: (row: any) => row.emailId,
      sortable: true,
    },
    {
      name: 'Mobile no',
      selector: (row: any) => row.mobileNo,
      sortable: true,
      center: true,
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
      sortable: true,
      center: true,
      cell: (row: any) => (
        <Box
          sx={{
            px: 2,
            py: 0.75,
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.75rem',
            textAlign: 'center',
            minWidth: '70px',
            boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)',
          }}
        >
          {row.status.toUpperCase()}
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Stats Cards Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Total Members Card */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardCard
            icon={<ShieldIcon sx={{ color: 'white' }} />}
            title="Total Members"
            status="Active"
            description="48 Members"
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />
        </Grid>

        {/* Total Accounts Card */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardCard
            icon={<DescriptionIcon sx={{ color: 'white' }} />}
            title="Total Accounts"
            status="Active"
            description="1 Accounts"
            sx={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />
        </Grid>

        {/* Cash Balance Card */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardCard
            icon={<AccountBalanceWalletIcon sx={{ color: 'white' }} />}
            title="Cash balance"
            description="₹ 200.0"
            sx={{
              background: 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(168, 85, 247, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />
        </Grid>

        {/* Bank Balance Card - No Footer */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardCard
            icon={<AccountBalanceIcon sx={{ color: 'white' }} />}
            title="Bank balance"
            description="₹"
            sx={{
              background: 'linear-gradient(135deg, #d946ef 0%, #ec4899 100%)',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(236, 72, 153, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />
        </Grid>
      </Grid>

      {/* Second Row with Two Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Members Card with Table as Footer */}
        <Grid size={{ xs: 12, md: 6 }}>
          <DashboardCard
            icon={<StorageIcon sx={{ color: 'white' }} />}
            title="Members"
            status="Summary of recent members"
            showActionButton={true}
            actionButtonLabel="More Information"
            showFooterContent={true}
            footerContent={
              <Box sx={{
                backgroundColor: 'white',
                borderRadius: '12px',
                mt: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.1)',
              }}>
                <DashboardTable
                  data={membersData}
                  columns={membersColumns}
                  sx={{
                    '& .rdt_Table': {
                      borderRadius: '12px',
                    },
                    '& .rdt_TableHead': {
                      background: 'linear-gradient(135deg, #f3f4f6 0%, #f9fafb 100%)',
                      '& .rdt_TableCol': {
                        color: '#4b5563',
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        borderBottom: '2px solid rgba(99, 102, 241, 0.2)',
                      }
                    },
                    '& .rdt_TableRow': {
                      '&:nth-of-type(even)': {
                        background: 'rgba(99, 102, 241, 0.02)',
                      },
                      '&:hover': {
                        background: 'rgba(99, 102, 241, 0.04)',
                      }
                    }
                  }}
                />
              </Box>
            }
            sx={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(79, 70, 229, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />
        </Grid>

        {/* Accounts Card with Timeline as Footer */}
        <Grid size={{ xs: 12, md: 6 }}>
          <DashboardCard
            icon={<DescriptionIcon sx={{ color: 'white' }} />}
            title="Accounts"
            status="Latest created accounts"
            showFooterContent={true}
            footerContent={
              <Box sx={{
                backgroundColor: 'white',
                borderRadius: '12px',
                mt: 2,
                p: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.1)',
              }}>
                <TimelineComponent
                  data={accountsTimelineData}
                  sx={{
                    '& .timeline-item': {
                      borderLeft: '3px solid #6366f1',
                      paddingLeft: '16px',
                      '&:hover': {
                        background: 'rgba(99, 102, 241, 0.04)',
                        borderRadius: '8px',
                      }
                    }
                  }}
                />
              </Box>
            }
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardCards;