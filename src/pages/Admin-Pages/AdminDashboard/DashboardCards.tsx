import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import DashboardCard from './DashboardCard';
import ShieldIcon from '@mui/icons-material/Shield';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StorageIcon from '@mui/icons-material/Storage';
import DashboardTable from '../../../pages/Dashboard/DashboardTable';

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
        color: '#4f46e5',
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
            px: 3,
            py: 0.5,
            borderRadius: 1,
            border: '1px solid #86efac',
            backgroundColor: '#f0fdf4',
            color: '#16a34a',
            fontWeight: '500',
            fontSize: '0.875rem',
            textAlign: 'center',
            minWidth: '80px',
          }}
        >
          {row.status}
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Stats Cards Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Total Members Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardCard
            icon={<ShieldIcon />}
            title="Total Members"
            status="Active"
            description="48 Members"
          />
        </Grid>

        {/* Total Accounts Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardCard
            icon={<DescriptionIcon />}
            title="Total Accounts"
            status="Active"
            description="1 Accounts"
          />
        </Grid>

        {/* Cash Balance Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardCard
            icon={<AccountBalanceWalletIcon />}
            title="Cash balance"
            description="₹ 200.0"
          />
        </Grid>
      </Grid>

      {/* Members Card with Table as Footer */}
      <DashboardCard
        icon={<StorageIcon />}
        title="Members"
        status="Summary of recent members"
        showActionButton={true}
        actionButtonLabel="More Information"
        showFooterContent={true}
        footerContent={
          <Box sx={{ backgroundColor: 'white', borderRadius: 2, mt: 2, overflow: 'hidden' }}>
            <DashboardTable data={membersData} columns={membersColumns} />
          </Box>
        }
        sx={{
          background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
        }}
      />
    </Box>
  );
};

export default DashboardCards;