import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TableFooter,
  TablePagination,
  Grid
} from '@mui/material';

const Report: React.FC = () => {
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);

  // Dummy: no transactions
  const transactions: any[] = [];

  const filtered = transactions.filter((t) =>
    [t.tranDate, t.tranNo, t.details, t.refNo, t.withdrawal, t.deposits, t.balance]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleSearch = () => {
    // For dummy page, no op — in real use would trigger fetch/filter
  };

  return (
    <Box sx={{ mt: 10,px:3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Agent &gt; Report</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField size="small" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <TextField size="small" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          <Button variant="contained" color="success" onClick={handleSearch}>Search</Button>
        </Box>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6">₹ 0.0</Typography>
                <Typography variant="caption">Opening Balance</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6">₹ 0.0</Typography>
                <Typography variant="caption">Debit Amount</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6">₹ 0.0</Typography>
                <Typography variant="caption">Credit Amount</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6">₹ 0.0</Typography>
                <Typography variant="caption">Closing Balance</Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Button variant="outlined">Excel</Button>
            <TextField size="small" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tran. Date</TableCell>
                  <TableCell>Tran. No</TableCell>
                  <TableCell>Transaction Details</TableCell>
                  <TableCell>Ref. No</TableCell>
                  <TableCell>Withdrawal</TableCell>
                  <TableCell>Deposits</TableCell>
                  <TableCell>Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">No data available in table</TableCell>
                  </TableRow>
                ) : (
                  filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.tranDate}</TableCell>
                      <TableCell>{row.tranNo}</TableCell>
                      <TableCell>{row.details}</TableCell>
                      <TableCell>{row.refNo}</TableCell>
                      <TableCell>{row.withdrawal}</TableCell>
                      <TableCell>{row.deposits}</TableCell>
                      <TableCell>{row.balance}</TableCell>
                    </TableRow>
                  ))
                )}
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

export default Report;
