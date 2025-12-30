import React, { useState } from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import AdminReusableTable from '../../utils/AdminReusableTable';
import ModifyDialog from '../../utils/MemberModifyDialog';
import {
  useGetMembers,
  useCreateMember,
  useUpdateMember,
  Member as MemberType
} from '../../queries/admin/index';

interface Member {
  id: string;
  date: string;
  name: string;
  email: string;
  contact: string;
  status: 'Active' | 'Inactive' | 'Blocked';
  membershipType: string;
  action: string;
  member_id: string;
  father_name: string;
  gender: string;
  dob: string;
  age: string;
  address: string;
  pan_no: string;
  aadharcard_no: string;
  voter_id: string;
  nominee: string;
  relation: string;
  occupation: string;
  introducer: string;
  introducer_name: string;
  branch_id: string;
}

const Members: React.FC = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });
  const [modifyDialogOpen, setModifyDialogOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  // React Query Hooks
  const { data: membersData, isLoading } = useGetMembers(page, rowsPerPage, searchQuery);
  const createMemberMutation = useCreateMember();
  const updateMemberMutation = useUpdateMember();

  // Transform API data to table format
  const members: Member[] = membersData?.data?.map((member: MemberType) => ({
    id: member._id || '',
    member_id: member.member_id,
    date: member.date_of_joining
      ? new Date(member.date_of_joining).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
      : '-',
    name: `${member.name || '-'} (${member.member_id})`,
    email: member.emailid || '-',
    contact: member.contactno || '-',
    status: (member.status === 'active' ? 'Active' : 'Inactive') as 'Active' | 'Inactive' | 'Blocked',
    membershipType: 'Basic',
    action: '',
    father_name: member.father_name || '-',
    gender: member.gender || '-',
    dob: member.dob
      ? new Date(member.dob).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
      : '-',
    age: member.age ? member.age.toString() : '-',
    address: member.address || '-',
    pan_no: member.pan_no || '-',
    aadharcard_no: member.aadharcard_no || '-',
    voter_id: member.voter_id || '-',
    nominee: member.nominee || '-',
    relation: member.relation || '-',
    occupation: member.occupation || '-',
    introducer: member.introducer || '-',
    introducer_name: member.introducer_name || '-',
    branch_id: member.branch_id || '-'
  })) || [];

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
      id: 'father_name',
      label: 'Father Name',
      sortable: true,
      minWidth: 150,
      align: 'center' as const,
      renderCell: (row: Member) => (
        <Typography variant="body2" sx={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 500 }}>
          {row.father_name}
        </Typography>
      ),
    },
    {
      id: 'gender',
      label: 'Gender',
      sortable: true,
      minWidth: 100,
      align: 'center' as const,
      renderCell: (row: Member) => (
        <Typography variant="body2" sx={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 500 }}>
          {row.gender}
        </Typography>
      ),
    },
    {
      id: 'dob',
      label: 'Date of Birth',
      sortable: true,
      minWidth: 120,
      align: 'center' as const,
      renderCell: (row: Member) => (
        <Typography variant="body2" sx={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 500 }}>
          {row.dob}
        </Typography>
      ),
    },
    {
      id: 'age',
      label: 'Age',
      sortable: true,
      minWidth: 80,
      align: 'center' as const,
      renderCell: (row: Member) => (
        <Typography variant="body2" sx={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 500 }}>
          {row.age}
        </Typography>
      ),
    },
    {
      id: 'address',
      label: 'Address',
      minWidth: 200,
    },
    {
      id: 'pan_no',
      label: 'PAN No',
      minWidth: 120,
      align: 'center' as const,
      renderCell: (row: Member) => (
        <Typography variant="body2" sx={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 500 }}>
          {row.pan_no}
        </Typography>
      ),
    },
    {
      id: 'aadharcard_no',
      label: 'Aadhar No',
      minWidth: 130,
      align: 'center' as const,
      renderCell: (row: Member) => (
        <Typography variant="body2" sx={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 500 }}>
          {row.aadharcard_no}
        </Typography>
      ),
    },
    {
      id: 'voter_id',
      label: 'Voter ID',
      minWidth: 120,
      align: 'center' as const,
      renderCell: (row: Member) => (
        <Typography variant="body2" sx={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 500 }}>
          {row.voter_id}
        </Typography>
      ),
    },
    {
      id: 'nominee',
      label: 'Nominee',
      minWidth: 150,
      renderCell: (row: Member) => (
        <Typography variant="body2" sx={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 500 }}>
          {row.nominee}
        </Typography>
      ),
    },
    {
      id: 'relation',
      label: 'Relation',
      minWidth: 120,
      align: 'center' as const,
      renderCell: (row: Member) => (
        <Typography variant="body2" sx={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 500 }}>
          {row.relation}
        </Typography>
      ),
    },
    {
      id: 'occupation',
      label: 'Occupation',
      minWidth: 150,
      renderCell: (row: Member) => (
        <Typography variant="body2" sx={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 500 }}>
          {row.occupation}
        </Typography>
      ),
    },
    {
      id: 'introducer',
      label: 'Introducer ID',
      minWidth: 130,
      align: 'center' as const,
      renderCell: (row: Member) => (
        <Typography variant="body2" sx={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 500 }}>
          {row.introducer}
        </Typography>
      ),
    },
    {
      id: 'introducer_name',
      label: 'Introducer Name',
      minWidth: 150,
      renderCell: (row: Member) => (
        <Typography variant="body2" sx={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 500 }}>
          {row.introducer_name}
        </Typography>
      ),
    },
    {
      id: 'branch_id',
      label: 'Branch ID',
      minWidth: 120,
      align: 'center' as const,
      renderCell: (row: Member) => (
        <Typography variant="body2" sx={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 500 }}>
          {row.branch_id}
        </Typography>
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
            handleModifyClick(row.member_id);
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
    setPage(1); // Reset to first page on search
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1); // Reset to first page when changing rows per page
  };

  const handleModifyClick = (memberId: string) => {
    setSelectedMemberId(memberId);
    setModifyDialogOpen(true);
  };

  const handleAddMember = () => {
    setSelectedMemberId(null); // null = create mode
    setModifyDialogOpen(true);
  };

  const handleActionClick = (member: Member) => {
    const newStatus = member.status === 'Active' ? 'Inactive' : 'Active';

    // Call update API to change status
    updateMemberMutation.mutate(
      {
        memberId: member.member_id,
        data: { status: newStatus.toLowerCase() }
      },
      {
        onSuccess: () => {
          setSnackbar({
            open: true,
            message: `${member.name.split(' (')[0]} has been ${newStatus.toLowerCase()}`,
            severity: 'info'
          });
        },
        onError: (error: any) => {
          setSnackbar({
            open: true,
            message: error?.message || 'Failed to update member status',
            severity: 'error'
          });
        }
      }
    );
  };

  const handleExportMembers = () => {
    setSnackbar({
      open: true,
      message: 'Members data exported successfully',
      severity: 'success'
    });
  };

  const handleModifySave = (data: any, isEdit?: boolean) => {
    if (isEdit && selectedMemberId) {
      // Update existing member
      updateMemberMutation.mutate(
        {
          memberId: selectedMemberId,
          data: data
        },
        {
          onSuccess: () => {
            setSnackbar({
              open: true,
              message: 'Member updated successfully',
              severity: 'success'
            });
            setModifyDialogOpen(false);
          },
          onError: (error: any) => {
            setSnackbar({
              open: true,
              message: error?.message || 'Failed to update member',
              severity: 'error'
            });
          }
        }
      );
    } else {
      // Create new member
      createMemberMutation.mutate(data, {
        onSuccess: () => {
          setSnackbar({
            open: true,
            message: 'Member created successfully',
            severity: 'success'
          });
          setModifyDialogOpen(false);
        },
        onError: (error: any) => {
          setSnackbar({
            open: true,
            message: error?.message || 'Failed to create member',
            severity: 'error'
          });
        }
      });
    }
  };

  const tableActions = (
    <Stack direction="row" spacing={1}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddMember}
        sx={{
          textTransform: 'none',
          borderRadius: 1,
          backgroundColor: '#1a237e',
          '&:hover': { backgroundColor: '#283593' }
        }}
      >
        Add Member
      </Button>
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
        paginationPerPage={rowsPerPage}
        actions={tableActions}
        onExport={handleExportMembers}
        emptyMessage="No members found"
        totalCount={membersData?.pagination?.total}
        currentPage={page - 1}
        onPageChange={(newPage) => setPage(newPage + 1)}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* Modify Dialog */}
      <ModifyDialog
        open={modifyDialogOpen}
        onClose={() => {
          setModifyDialogOpen(false);
          setSelectedMemberId(null);
        }}
        onSave={handleModifySave}
        type="member"
        memberId={selectedMemberId}
        isLoading={createMemberMutation.isPending || updateMemberMutation.isPending}
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