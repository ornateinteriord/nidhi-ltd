import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Chip,
    InputAdornment,
    Button,
} from '@mui/material';
import { Edit, Delete, Visibility, Search } from '@mui/icons-material';
import { useGetAccounts, useGetAccountGroups, type Account } from '../../queries/admin';
import TransactionDialog from '../Dialogs/TransactionDialog';

export type AccountType = 'SB' | 'CA' | 'RD' | 'FD' | 'PIGMY' | 'MIS';

interface Props {
    accountType: AccountType;
    title: string;
}

const AccountViewTable: React.FC<Props> = ({ accountType, title }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [accountGroupId, setAccountGroupId] = useState<string>('');
    const [transactionDialogOpen, setTransactionDialogOpen] = useState(false);
    const [selectedMemberId, setSelectedMemberId] = useState('');
    const [selectedAccountType, setSelectedAccountType] = useState('');

    // Fetch account groups to map account type name to ID
    const { data: accountGroupsData } = useGetAccountGroups();

    // Map account type to account_group_id
    useEffect(() => {
        if (accountGroupsData?.data) {
            const matchingGroup = accountGroupsData.data.find(
                (group) => group.account_group_name === accountType
            );
            if (matchingGroup) {
                setAccountGroupId(matchingGroup.account_group_id);
            }
        }
    }, [accountGroupsData, accountType]);

    // Fetch accounts with filters
    const { data: accountsData, isLoading, isError } = useGetAccounts(
        page + 1, // API uses 1-indexed pages
        rowsPerPage,
        searchQuery || undefined,
        statusFilter === 'all' ? undefined : statusFilter,
        accountGroupId || undefined
    );

    const accounts = accountsData?.data || [];
    const totalAccounts = accountsData?.pagination?.total || 0;

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(0); // Reset to first page on search
    };

    const handleStatusFilterChange = (event: any) => {
        setStatusFilter(event.target.value);
        setPage(0); // Reset to first page on filter
    };

    const formatDate = (date: Date | string | undefined) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('en-GB');
    };

    const getStatusColor = (status: string | undefined) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'success';
            case 'pending':
                return 'warning';
            case 'closed':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Box sx={{ mt: 10, px: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a237e', mb: 3 }}>
                {title}
            </Typography>

            <Card>
                <CardContent>
                    {/* Filters Section */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                        <TextField
                            placeholder="Search by Account No, Member ID..."
                            size="small"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            sx={{ minWidth: 300, flexGrow: 1 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FormControl size="small" sx={{ minWidth: 150 }}>
                            <InputLabel>Status</InputLabel>
                            <Select value={statusFilter} onChange={handleStatusFilterChange} label="Status">
                                <MenuItem value="all">All Status</MenuItem>
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="closed">Closed</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Table Section */}
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                            <CircularProgress />
                        </Box>
                    ) : isError ? (
                        <Box sx={{ textAlign: 'center', py: 5 }}>
                            <Typography color="error">Failed to load accounts</Typography>
                        </Box>
                    ) : accounts.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 5 }}>
                            <Typography color="text.secondary">No accounts found</Typography>
                        </Box>
                    ) : (
                        <>
                            <TableContainer component={Paper} variant="outlined">
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                            <TableCell sx={{ fontWeight: 600 }}>Account No</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Account ID</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Member</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Opening Date</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Operation</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }} align="right">Amount</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Interest Rate</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Maturity Date</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }} align="center">Actions</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }} align="center">Transactions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {accounts.map((account: Account) => (
                                            <TableRow key={account._id} hover>
                                                <TableCell>{account.account_no || '-'}</TableCell>
                                                <TableCell>{account.account_id}</TableCell>
                                                <TableCell>
                                                    {account.memberDetails?.name
                                                        ? `${account.memberDetails.name} (${account.member_id})`
                                                        : account.member_id || '-'
                                                    }
                                                </TableCell>
                                                <TableCell>{formatDate(account.date_of_opening)}</TableCell>
                                                <TableCell>{account.account_operation || '-'}</TableCell>
                                                <TableCell align="right">
                                                    {account.account_amount
                                                        ? `₹${account.account_amount.toLocaleString('en-IN')}`
                                                        : '-'}
                                                </TableCell>
                                                <TableCell>
                                                    {account.interest_rate ? `${account.interest_rate}%` : '-'}
                                                </TableCell>
                                                <TableCell>
                                                    {account.duration ? `${account.duration} months` : '-'}
                                                </TableCell>
                                                <TableCell>{formatDate(account.date_of_maturity)}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={account.status || 'unknown'}
                                                        color={getStatusColor(account.status)}
                                                        size="small"
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton size="small" color="primary" title="View">
                                                        <Visibility fontSize="small" />
                                                    </IconButton>
                                                    <IconButton size="small" color="warning" title="Edit">
                                                        <Edit fontSize="small" />
                                                    </IconButton>
                                                    <IconButton size="small" color="error" title="Delete">
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() => {
                                                            setSelectedMemberId(account.member_id || '');
                                                            setSelectedAccountType(accountGroupId); // Use accountGroupId instead of accountType
                                                            setTransactionDialogOpen(true);
                                                        }}
                                                        sx={{
                                                            textTransform: 'none',
                                                            borderColor: '#6366f1',
                                                            color: '#6366f1',
                                                            '&:hover': {
                                                                borderColor: '#4f46e5',
                                                                background: 'rgba(99, 102, 241, 0.04)',
                                                            }
                                                        }}
                                                    >
                                                        View
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* Pagination */}
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                component="div"
                                count={totalAccounts}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>
                    )}
                </CardContent>
            </Card>

            <TransactionDialog
                open={transactionDialogOpen}
                onClose={() => setTransactionDialogOpen(false)}
                memberId={selectedMemberId}
                accountType={selectedAccountType}
            />
        </Box>
    );
};

export default AccountViewTable;
