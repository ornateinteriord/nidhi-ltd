import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Chip,
  Button,
  Avatar,
  Typography,
  Alert,
  Snackbar,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BlockIcon from '@mui/icons-material/Block';
import AdminReusableTable from '../../utils/AdminReusableTable';
import ModifyDialog from '../../utils/MemberModifyDialog';

interface Agent {
  id: string;
  date: string;
  member: string;
  email: string;
  mobile: string;
  status: 'active' | 'inactive' | 'pending';
  modify: string;
  action: string;
  organization?: string;
}

const Agents: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' as 'success' | 'error' | 'info' | 'warning' 
  });
  const [modifyDialogOpen, setModifyDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      setIsLoading(true);
      try {
        const mockData: Agent[] = [
          {
            id: '1',
            date: '13-Dec-2025',
            member: 'mainpai souharda cooperative society (A3)',
            email: 'mainpalcovhards90@gmail.com',
            mobile: '9004478100',
            status: 'active',
            modify: 'Modify',
            action: 'Ductive',
            organization: 'Souharda Cooperative'
          },
          {
            id: '2',
            date: '30-Jan-2021',
            member: 'MANJUNATH (A20001)',
            email: 'manjunath14480@gmail.com',
            mobile: '9100000000',
            status: 'active',
            modify: 'Modify',
            action: 'Ductive',
            organization: 'Individual'
          },
          {
            id: '3',
            date: '15-Jan-2024',
            member: 'RAJESH KUMAR (A30045)',
            email: 'rajesh.kumar@example.com',
            mobile: '9876543210',
            status: 'pending',
            modify: 'Modify',
            action: 'Ductive',
            organization: 'Corporate'
          },
        ];

        const filtered = searchQuery 
          ? mockData.filter(agent => 
              agent.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
              agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
              agent.mobile.includes(searchQuery)
            )
          : mockData;

        await new Promise(resolve => setTimeout(resolve, 300));
        
        setAgents(filtered);
      } catch (error) {
        console.error('Error fetching agents:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load agents data',
          severity: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgents();
  }, [searchQuery]);

  const columns = [
    {
      id: 'date',
      label: 'Date',
      sortable: true,
      minWidth: 120,
    },
    {
      id: 'member',
      label: 'Member',
      sortable: true,
      minWidth: 250,
      renderCell: (row: Agent) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: getAvatarColor(row.member),
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {getInitials(row.member.split(' (')[0])}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
              {row.member.split(' (')[0]}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              {row.member.match(/\((.*?)\)/)?.[1] || ''}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      id: 'email',
      label: 'Email',
      sortable: true,
      minWidth: 200,
      renderCell: (row: Agent) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <EmailIcon sx={{ color: '#64748b', fontSize: 16 }} />
          <Typography variant="body2" sx={{ color: '#475569' }}>
            {row.email}
          </Typography>
        </Stack>
      ),
    },
    {
      id: 'mobile',
      label: 'Mobile',
      minWidth: 140,
      renderCell: (row: Agent) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <PhoneIcon sx={{ color: '#64748b', fontSize: 16 }} />
          <Typography variant="body2" sx={{ color: '#475569' }}>
            {row.mobile}
          </Typography>
        </Stack>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      sortable: true,
      minWidth: 120,
      align: 'center' as const,
      renderCell: (row: Agent) => (
        <Chip
          label={row.status.toUpperCase()}
          size="small"
          sx={{
            backgroundColor:
              row.status === 'active' ? '#d1fae5' :
              row.status === 'pending' ? '#fef3c7' : '#f1f5f9',
            color:
              row.status === 'active' ? '#065f46' :
              row.status === 'pending' ? '#92400e' : '#64748b',
            fontWeight: 600,
            borderRadius: 1,
          }}
        />
      ),
    },
    {
      id: 'modify',
      label: 'Modify',
      minWidth: 100,
      align: 'center' as const,
      renderCell: (row: Agent) => (
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          onClick={(e) => {
            e.stopPropagation();
            handleModifyClick(row);
          }}
          sx={{
            textTransform: 'none',
            borderRadius: 1,
            borderColor: '#cbd5e1',
            color: '#475569',
            fontSize: '0.75rem',
            px: 2,
            '&:hover': {
              borderColor: '#94a3b8',
              backgroundColor: '#f8fafc',
            }
          }}
        >
          Modify
        </Button>
      ),
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 120,
      align: 'center' as const,
      renderCell: (row: Agent) => (
        <Button
          variant="outlined"
          size="small"
          startIcon={<BlockIcon />}
          onClick={(e) => {
            e.stopPropagation();
            handleActionClick(row);
          }}
          sx={{
            textTransform: 'none',
            borderRadius: 1,
            borderColor: '#cbd5e1',
            color: '#475569',
            fontSize: '0.75rem',
            px: 2,
            '&:hover': {
              borderColor: '#94a3b8',
              backgroundColor: '#f8fafc',
            }
          }}
        >
          {row.status === 'active' ? 'Inactive' : 'Active'}
        </Button>
      ),
    },
  ];

  const getAvatarColor = (name: string) => {
    const colors = ['#1a237e', '#283593', '#311b92', '#4a148c', '#006064'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleModifyClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setModifyDialogOpen(true);
  };

  const handleActionClick = (agent: Agent) => {
    const newStatus = agent.status === 'active' ? 'inactive' : 'active';
    setAgents(prev => 
      prev.map(a => 
        a.id === agent.id ? { ...a, status: newStatus } : a
      )
    );
    
    setSnackbar({
      open: true,
      message: `${agent.member.split(' (')[0]} has been ${newStatus}`,
      severity: 'info'
    });
  };

  const handleExport = () => {
    setSnackbar({
      open: true,
      message: 'Agents data exported successfully',
      severity: 'success'
    });
  };

  const handleModifySave = (_data: any) => {
    setSnackbar({
      open: true,
      message: 'Agent details updated successfully',
      severity: 'success'
    });
    // Update agent data here
  };

  const tableActions = (
    <Stack direction="row" spacing={1}>
      <Button
        variant="outlined"
        onClick={handleExport}
        sx={{ 
          textTransform: 'none',
          borderRadius: 1,
          borderColor: '#cbd5e1',
          color: '#475569',
        }}
      >
        Excel
      </Button>
    </Stack>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4, mt: 8 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a237e', mb: 1 }}>
          List of Agent
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Manage and monitor all registered agents in the system
        </Typography>
      </Box>

      {/* Main Table */}
      <AdminReusableTable<Agent>
        columns={columns}
        data={agents}
        title="Agent Management"
        isLoading={isLoading}
        onSearchChange={handleSearchChange}
        paginationPerPage={10}
        actions={tableActions}
        // enableExport={true}
        onExport={handleExport}
        emptyMessage="No agents found"
      />

      {/* Modify Dialog */}
      <ModifyDialog
        open={modifyDialogOpen}
        onClose={() => setModifyDialogOpen(false)}
        onSave={handleModifySave}
        type="agent"
        initialData={selectedAgent}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            borderRadius: 1,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Agents;