import React from 'react';
import { Typography, Box } from '@mui/material';
// import WalletCard from '../../components/Dashboard/WalletCard';
// import { useNavigate } from 'react-router-dom';

const AgentDashboard: React.FC = () => {


  return (
    <div>
      <Box sx={{ mt: 10, px: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a237e', mb: 3 }}>
          Agent Dashboard
        </Typography>
      </Box>
    </div>
  );
}

export default AgentDashboard;