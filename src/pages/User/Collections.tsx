
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    TextField,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    TableFooter,
    TablePagination,
} from '@mui/material';

// Dummy data for User collections (can be replaced with API data)
const dummyRows = [
    {
        id: 1,
        openingDate: '02-Feb-2021',
        accountNo: '105600002',
        accountHolder: 'User Name',
        maturityDate: '-',
        balance: 'Rs. 0.0',
        status: 'Active',
    },
];

const Collections: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5);
    const [search, setSearch] = useState('');

    const filtered = dummyRows.filter((r) =>
        [r.openingDate, r.accountNo, r.accountHolder, r.balance, r.status]
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <Box sx={{ mt: 10, px: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: '600' }}>My Collections</Typography>

            <Card>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box>
                            <Button variant="outlined">Excel</Button>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField size="small" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </Box>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date Of Opening</TableCell>
                                    <TableCell>Account No</TableCell>
                                    <TableCell>Account Holder</TableCell>
                                    <TableCell>Date Of Maturity</TableCell>
                                    <TableCell>Balance</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.openingDate}</TableCell>
                                        <TableCell>{row.accountNo}</TableCell>
                                        <TableCell>{row.accountHolder}</TableCell>
                                        <TableCell>{row.maturityDate}</TableCell>
                                        <TableCell>{row.balance}</TableCell>
                                        <TableCell>
                                            <Box component="span" sx={{ px: 1, py: 0.5, bgcolor: '#e6f4ea', color: '#1f8f3a', borderRadius: '6px', fontSize: '0.8rem' }}>{row.status}</Box>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" size="small">Transactions</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[rowsPerPage]}
                                        colSpan={7}
                                        count={filtered.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={(_e, newPage) => setPage(newPage)}
                                        ActionsComponent={() => null}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Collections;
