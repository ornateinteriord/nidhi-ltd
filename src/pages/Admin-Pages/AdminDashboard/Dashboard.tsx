import DashboardCards from './DashboardCards';
import InterestCard from './interest-card';
// import WalletCard from '../../../components/Dashboard/WalletCard';
// import { useNavigate } from 'react-router-dom';
import { useGetDashboardCounts, useGetRecentData } from '../../../queries/admin';
import { Box, CircularProgress, Typography } from '@mui/material';

const AdminDashboard = () => {
  // const navigate = useNavigate();
  const { data: dashboardData, isLoading: countsLoading, isError: countsError } = useGetDashboardCounts();
  const { data: recentData, isLoading: recentLoading, isError: recentError } = useGetRecentData();

  if (countsLoading || recentLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: "#f8f9fa" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (countsError || recentError || !dashboardData?.success || !recentData?.success) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: "#f8f9fa" }}>
        <Typography color="error">Failed to load dashboard data</Typography>
      </Box>
    );
  }

  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>
      <Box sx={{ mt: { xs: 8, sm: 10, md: 12 } }} />
      <div className="mb-4">
        {/* <WalletCard
          balance="₹ 00.00"
          onClick={() => { }}
        /> */}
      </div>
      <InterestCard />
      <DashboardCards counts={dashboardData.data} recentData={recentData.data} />
    </div>
  )
}

export default AdminDashboard;

