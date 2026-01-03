import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import AdminReusableTable, { ColumnDefinition } from '../../../../utils/AdminReusableTable';
import { useGetPreMaturityAccounts } from '../../../../queries/admin';
import { MaturityAccount } from '../../../../types';

const RDPreMaturity: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const { data, isLoading } = useGetPreMaturityAccounts(
        page + 1,
        rowsPerPage,
        'AGP003' // RD account type
    );

    const columns: ColumnDefinition<MaturityAccount>[] = [
        {
            id: 'account_no',
            label: 'Account No',
            minWidth: 120,
            sortable: true,
        },
        {
            id: 'member_id',
            label: 'Member ID',
            minWidth: 100,
            sortable: true,
        },
        {
            id: 'memberDetails',
            label: 'Member Name',
            minWidth: 150,
            renderCell: (row) => row.memberDetails?.name || '-',
        },
        {
            id: 'account_amount',
            label: 'Amount',
            minWidth: 120,
            align: 'right',
            renderCell: (row) => `₹${row.account_amount?.toLocaleString('en-IN') || '0'}`,
        },
        {
            id: 'interest_rate',
            label: 'Interest Rate',
            minWidth: 100,
            align: 'right',
            renderCell: (row) => `${row.interest_rate || 0}%`,
        },
        {
            id: 'date_of_opening',
            label: 'Opening Date',
            minWidth: 120,
            renderCell: (row) =>
                row.date_of_opening
                    ? new Date(row.date_of_opening).toLocaleDateString('en-GB')
                    : '-',
        },
        {
            id: 'date_of_maturity',
            label: 'Maturity Date',
            minWidth: 120,
            renderCell: (row) =>
                row.date_of_maturity
                    ? new Date(row.date_of_maturity).toLocaleDateString('en-GB')
                    : '-',
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 100,
            sortable: true,
        },
        {
            id: 'actions',
            label: 'Actions',
            minWidth: 100,
            renderCell: () => (
                <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    sx={{ textTransform: 'none' }}
                >
                    Close
                </Button>
            ),
        },
    ];

    return (
        <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, mt: { xs: 7, sm: 8 } }}>
            <AdminReusableTable
                title="RD Pre-Maturity Accounts"
                columns={columns}
                data={data?.data || []}
                isLoading={isLoading}
                totalCount={data?.pagination?.total}
                currentPage={page}
                paginationPerPage={rowsPerPage}
                onPageChange={setPage}
                onRowsPerPageChange={setRowsPerPage}
                emptyMessage="No pre-maturity RD accounts found"
            />
        </Box>
    );
};

export default RDPreMaturity;
