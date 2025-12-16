import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Chip, 
  Button,
  Avatar,
  Alert,
  Snackbar,
  Typography,
  Stack,

} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import AdminReusableTable from '../../utils/AdminReusableTable';
import ModifyDialog from '../../utils/MemberModifyDialog';

interface Member {
  id: string;
  date: string;
  name: string;
  email: string;
  contact: string;
  status: 'Active' | 'Inactive' | 'Blocked';
  membershipType: string;
  action: string;
}

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' as 'success' | 'error' | 'info' | 'warning' 
  });
  const [modifyDialogOpen, setModifyDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
        const mockData: Member[] = [
          {
            id: '10516',
            date: '15-Dec-2025',
            name: 'john (10516)',
            email: 'john@example.com',
            contact: '9645784541',
            status: 'Active',
            membershipType: 'Basic',
            action: ''
          },
          {
            id: '10517',
            date: '15-Dec-2025',
            name: 'Bhargavi (10517)',
            email: 'bhargavi@example.com',
            contact: '9980615016',
            status: 'Active',
            membershipType: 'Premium',
            action: ''
          },
          {
            id: '10515',
            date: '15-Dec-2025',
            name: 'Tousif (10515)',
            email: 'tousif@example.com',
            contact: '7466254522',
            status: 'Active',
            membershipType: 'Gold',
            action: ''
          },
        ];

        const filtered = searchQuery 
          ? mockData.filter(member => 
              member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
              member.contact.includes(searchQuery)
            )
          : mockData;

        await new Promise(resolve => setTimeout(resolve, 300));
        
        setMembers(filtered);
      } catch (error) {
        console.error('Error fetching members:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load members',
          severity: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [searchQuery]);

  const columns = [
    {
      id: 'date',
      label: 'Date',
      sortable: true,
      minWidth: 120,
    },
    {
      id: 'name',
      label: 'Member',
      sortable: true,
      minWidth: 200,
      renderCell: (row: Member) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: getAvatarColor(row.name),
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {getInitials(row.name.split(' (')[0])}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
              {row.name.split(' (')[0]}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              {row.name.match(/\((.*?)\)/)?.[1] || ''}
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
      renderCell: (row: Member) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <EmailIcon sx={{ color: '#64748b', fontSize: 16 }} />
          <Typography variant="body2" sx={{ color: '#475569' }}>
            {row.email}
          </Typography>
        </Stack>
      ),
    },
    {
      id: 'contact',
      label: 'Contact No',
      minWidth: 150,
      renderCell: (row: Member) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <PhoneIcon sx={{ color: '#64748b', fontSize: 16 }} />
          <Typography variant="body2" sx={{ color: '#475569' }}>
            {row.contact}
          </Typography>
        </Stack>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      sortable: true,
      minWidth: 100,
      align: 'center' as const,
      renderCell: (row: Member) => (
        <Chip 
          label={row.status}
          size="small"
          sx={{
            backgroundColor:
              row.status === 'Active' ? '#d1fae5' :
              row.status === 'Inactive' ? '#f1f5f9' : '#fee2e2',
            color:
              row.status === 'Active' ? '#065f46' :
              row.status === 'Inactive' ? '#64748b' : '#991b1b',
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
      renderCell: (row: Member) => (
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
      renderCell: (row: Member) => (
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
            borderColor: row.status === 'Active' ? '#ef4444' : '#10b981',
            color: row.status === 'Active' ? '#ef4444' : '#10b981',
            fontSize: '0.75rem',
            px: 2,
            '&:hover': {
              backgroundColor: row.status === 'Active' ? '#fef2f2' : '#d1fae5',
            }
          }}
        >
          {row.status === 'Active' ? 'Inactive' : 'Active'}
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

  const handleModifyClick = (member: Member) => {
    setSelectedMember(member);
    setModifyDialogOpen(true);
  };



  const handleActionClick = (member: Member) => {
    const newStatus = member.status === 'Active' ? 'Inactive' : 'Active';
    setMembers(prev => 
      prev.map(m => 
        m.id === member.id ? { ...m, status: newStatus } : m
      )
    );
    
    setSnackbar({
      open: true,
      message: `${member.name.split(' (')[0]} has been ${newStatus.toLowerCase()}`,
      severity: 'info'
    });
  };

  const handleExportMembers = () => {
    setSnackbar({
      open: true,
      message: 'Members data exported successfully',
      severity: 'success'
    });
  };

  const handleModifySave = (data: any) => {
    console.log('Modified member data:', data);
    setSnackbar({
      open: true,
      message: 'Member details updated successfully',
      severity: 'success'
    });
    setModifyDialogOpen(false);
    // Here you would typically update the member data in your state or send it to an API
  };


  // const handleAddMember = () => {
  //   setSnackbar({
  //     open: true,
  //     message: 'Add new member functionality',
  //     severity: 'info'
  //   });
  // };

  const tableActions = (
    <Stack direction="row" spacing={1}>
      <Button
        variant="outlined"
        onClick={handleExportMembers}
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
          List of Member
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Manage and monitor all registered members in the system
        </Typography>
      </Box>

      {/* Main Table */}
      <AdminReusableTable<Member>
        columns={columns}
        data={members}
        title="Member Management"
        isLoading={isLoading}
        onSearchChange={handleSearchChange}
        paginationPerPage={10}
        actions={tableActions}
        // enableExport={true}
        onExport={handleExportMembers}
        emptyMessage="No members found"
      />

      {/* Modify Dialog */}
      <ModifyDialog
        open={modifyDialogOpen}
        onClose={() => setModifyDialogOpen(false)}
        onSave={handleModifySave}
        type="member"
        initialData={selectedMember}
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

export default Members;