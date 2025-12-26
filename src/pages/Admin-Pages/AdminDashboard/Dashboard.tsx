import DashboardCards from './DashboardCards';
import InterestCard from './interest-card';
import { useGetDashboardCounts, useGetRecentData } from '../../../queries/admin';
import { Box, CircularProgress, Typography } from '@mui/material';

const AdminDashboard = () => {
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
      <div className="my-20" />
      <InterestCard />
      <DashboardCards counts={dashboardData.data} recentData={recentData.data} />
    </div>
  )
}

export default AdminDashboard;

