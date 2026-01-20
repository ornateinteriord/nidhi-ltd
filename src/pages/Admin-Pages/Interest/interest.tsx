import React, { useState } from 'react';
import {
    Box,
    Container,
    Chip,
    Button,
    Alert,
    Snackbar,
    Typography,
    Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AdminReusableTable from '../../../utils/AdminReusableTable';
import InterestModifyDialog from '../../../utils/InterestModifyDialog';
import {
    useGetInterests,
    useCreateInterest,
    useUpdateInterest,
    Interest as InterestType
} from '../../../queries/admin/index';

interface Interest {
    id: string;
    planType: string;
    interestName: string;
    interestRateGeneral: number;
    interestRateSenior: number;
    minimumDeposit: number;
    duration: number;
    date: string;
    status: 'Active' | 'Inactive';
    interest_id: string;
}

const Interests: React.FC = () => {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [searchQuery, setSearchQuery] = useState('');
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error' | 'info' | 'warning'
    });
    const [modifyDialogOpen, setModifyDialogOpen] = useState(false);
    const [selectedInterestId, setSelectedInterestId] = useState<string | null>(null);

    // React Query Hooks
    const { data: interestsData, isLoading } = useGetInterests(page, rowsPerPage, searchQuery);
    const createInterestMutation = useCreateInterest();
    const updateInterestMutation = useUpdateInterest();

    // Transform API data to table format
    const interests: Interest[] = interestsData?.data?.map((interest: InterestType) => ({
        id: interest._id || '',
        interest_id: interest.interest_id,
        planType: interest.plan_type || interest.ref_id || 'N/A',
        interestName: interest.interest_name || 'N/A',
        interestRateGeneral: interest.interest_rate_general || interest.interest_rate || 0,
        interestRateSenior: interest.interest_rate_senior || 0,
        minimumDeposit: interest.minimum_deposit || 0,
        duration: interest.duration || 0,
        date: interest.from_date && interest.to_date
            ? `${new Date(interest.from_date).toISOString().split('T')[0]} to ${new Date(interest.to_date).toISOString().split('T')[0]}`
            : '-',
        status: (interest.status === 'active' ? 'Active' : 'Inactive') as 'Active' | 'Inactive',
    })) || [];

    const columns = [
        {
            id: 'planType',
            label: 'Plan Type',
            sortable: true,
            minWidth: 100,
            renderCell: (row: Interest) => (
                <Typography variant="body2" sx={{ color: '#1e40af', fontWeight: 500 }}>
                    {row.planType}
                </Typography>
            ),
        },
        {
            id: 'interestName',
            label: 'Interest Name',
            sortable: true,
            minWidth: 120,
            renderCell: (row: Interest) => (
                <Typography variant="body2" sx={{ color: '#7c3aed', fontWeight: 500 }}>
                    {row.interestName}
                </Typography>
            ),
        },
        {
            id: 'interestRateGeneral',
            label: 'Rate (General)',
            sortable: true,
            minWidth: 120,
            align: 'center' as const,
            renderCell: (row: Interest) => (
                <Typography variant="body2" sx={{ color: '#059669', fontWeight: 600 }}>
                    {row.interestRateGeneral}%
                </Typography>
            ),
        },
        {
            id: 'interestRateSenior',
            label: 'Rate (Senior)',
            sortable: true,
            minWidth: 120,
            align: 'center' as const,
            renderCell: (row: Interest) => (
                <Typography variant="body2" sx={{ color: '#0284c7', fontWeight: 600 }}>
                    {row.interestRateSenior}%
                </Typography>
            ),
        },
        {
            id: 'duration',
            label: 'Duration',
            sortable: true,
            minWidth: 100,
            align: 'center' as const,
            renderCell: (row: Interest) => (
                <Typography variant="body2" sx={{ color: '#475569' }}>
                    {row.duration} months
                </Typography>
            ),
        },
        {
            id: 'date',
            label: 'Date',
            sortable: true,
            minWidth: 200,
            renderCell: (row: Interest) => (
                <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.813rem' }}>
                    {row.date}
                </Typography>
            ),
        },
        {
            id: 'status',
            label: 'Status',
            sortable: true,
            minWidth: 100,
            align: 'center' as const,
            renderCell: (row: Interest) => (
                <Chip
                    label={row.status}
                    size="small"
                    sx={{
                        backgroundColor:
                            row.status === 'Active' ? '#d1fae5' : '#f1f5f9',
                        color:
                            row.status === 'Active' ? '#065f46' : '#64748b',
                        fontWeight: 600,
                        borderRadius: 1,
                    }}
                />
            ),
        },
        {
            id: 'modify',
            label: 'Edit',
            minWidth: 100,
            align: 'center' as const,
            renderCell: (row: Interest) => (
                <Button
                    variant="contained"
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleModifyClick(row.interest_id);
                    }}
                    sx={{
                        textTransform: 'none',
                        borderRadius: 1,
                        backgroundColor: '#fbbf24',
                        color: '#78350f',
                        fontSize: '0.75rem',
                        px: 2,
                        fontWeight: 600,
                        '&:hover': {
                            backgroundColor: '#f59e0b',
                        }
                    }}
                >
                    Edit
                </Button>
            ),
        },
        {
            id: 'action',
            label: 'Action',
            minWidth: 120,
            align: 'center' as const,
            renderCell: (row: Interest) => (
                <Button
                    variant="contained"
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleActionClick(row);
                    }}
                    sx={{
                        textTransform: 'none',
                        borderRadius: 1,
                        backgroundColor: row.status === 'Active' ? '#dc2626' : '#10b981',
                        color: 'white',
                        fontSize: '0.75rem',
                        px: 2,
                        fontWeight: 600,
                        '&:hover': {
                            backgroundColor: row.status === 'Active' ? '#b91c1c' : '#059669',
                        }
                    }}
                >
                    {row.status === 'Active' ? 'Inactive' : 'Active'}
                </Button>
            ),
        },
    ];

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setPage(1); // Reset to first page on search
    };

    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setPage(1); // Reset to first page when changing rows per page
    };

    const handleModifyClick = (interestId: string) => {
        setSelectedInterestId(interestId);
        setModifyDialogOpen(true);
    };

    const handleAddInterest = () => {
        setSelectedInterestId(null); // null = create mode
        setModifyDialogOpen(true);
    };

    const handleActionClick = (interest: Interest) => {
        const newStatus = interest.status === 'Active' ? 'Inactive' : 'Active';

        // Call update API to change status
        updateInterestMutation.mutate(
            {
                interestId: interest.interest_id,
                data: { status: newStatus.toLowerCase() }
            },
            {
                onSuccess: () => {
                    setSnackbar({
                        open: true,
                        message: `${interest.interestName} has been ${newStatus.toLowerCase()}`,
                        severity: 'info'
                    });
                },
                onError: (error: any) => {
                    setSnackbar({
                        open: true,
                        message: error?.message || 'Failed to update interest status',
                        severity: 'error'
                    });
                }
            }
        );
    };

    const handleExportInterests = () => {
        setSnackbar({
            open: true,
            message: 'Interests data exported successfully',
            severity: 'success'
        });
    };

    const handleModifySave = (data: any, isEdit?: boolean) => {
        if (isEdit && selectedInterestId) {
            // Update existing interest
            updateInterestMutation.mutate(
                {
                    interestId: selectedInterestId,
                    data: data
                },
                {
                    onSuccess: () => {
                        setSnackbar({
                            open: true,
                            message: 'Interest updated successfully',
                            severity: 'success'
                        });
                        setModifyDialogOpen(false);
                    },
                    onError: (error: any) => {
                        setSnackbar({
                            open: true,
                            message: error?.message || 'Failed to update interest',
                            severity: 'error'
                        });
                    }
                }
            );
        } else {
            // Create new interest
            createInterestMutation.mutate(data, {
                onSuccess: () => {
                    setSnackbar({
                        open: true,
                        message: 'Interest created successfully',
                        severity: 'success'
                    });
                    setModifyDialogOpen(false);
                },
                onError: (error: any) => {
                    setSnackbar({
                        open: true,
                        message: error?.message || 'Failed to create interest',
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
                onClick={handleAddInterest}
                sx={{
                    textTransform: 'none',
                    borderRadius: 1,
                    backgroundColor: '#1a237e',
                    '&:hover': { backgroundColor: '#283593' }
                }}
            >
                Add Interest
            </Button>
            <Button
                variant="outlined"
                onClick={handleExportInterests}
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
                    Interest Management
                </Typography>
                <Typography variant="body1" sx={{ color: '#64748b' }}>
                    Manage and monitor all interest rates for loans and deposits
                </Typography>
            </Box>

            {/* Main Table */}
            <AdminReusableTable<Interest>
                columns={columns}
                data={interests}
                title="Interest Management"
                isLoading={isLoading}
                onSearchChange={handleSearchChange}
                paginationPerPage={rowsPerPage}
                actions={tableActions}
                onExport={handleExportInterests}
                emptyMessage="No interests found"
                totalCount={interestsData?.pagination?.total}
                currentPage={page - 1}
                onPageChange={(newPage) => setPage(newPage + 1)}
                onRowsPerPageChange={handleRowsPerPageChange}
            />

            {/* Modify Dialog */}
            <InterestModifyDialog
                open={modifyDialogOpen}
                onClose={() => {
                    setModifyDialogOpen(false);
                    setSelectedInterestId(null);
                }}
                onSave={handleModifySave}
                interestId={selectedInterestId}
                isLoading={createInterestMutation.isPending || updateInterestMutation.isPending}
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

export default Interests;
