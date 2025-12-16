import React, { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
  Paper,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Checkbox,
  alpha,
  useTheme,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import { visuallyHidden } from '@mui/utils';

// Define proper interfaces
interface ColumnDefinition<T> {
  id: keyof T | string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  cellStyle?: React.CSSProperties;
  renderCell?: (row: T) => React.ReactNode;
}

interface AdminReusableTableProps<T> {
  columns: ColumnDefinition<T>[];
  data: T[];
  title?: string;
  isLoading?: boolean;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
  paginationPerPage?: number;
  paginationRowsPerPageOptions?: number[];
  onRowClick?: (row: T) => void;
  actions?: React.ReactNode;
  enableSelection?: boolean;
  onSelectionChange?: (selected: T[]) => void;
  onExport?: () => void;
  emptyMessage?: string;
  totalCount?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  currentPage?: number;
}

interface TableToolbarProps {
  title?: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCount: number;
  actions?: React.ReactNode;
  onRefresh?: () => void;
  onExport?: () => void;
  enableExport?: boolean;
}

const TableToolbar: React.FC<TableToolbarProps> = ({
  title,
  searchQuery,
  onSearchChange,
  selectedCount,
  actions,
  onRefresh,
  onExport,
  enableExport = true,
}) => {
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
    >
      
      {/* Title and Actions Row */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Box>
          {title && (
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a237e', mb: 1 }}>
              {title}
            </Typography>
          )}
          {selectedCount > 0 && (
            <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
              {selectedCount} selected
            </Typography>
          )}
        </Box>

        <Stack direction="row" spacing={1}>
          {onRefresh && (
            <IconButton onClick={onRefresh} size="small">
              <RefreshIcon />
            </IconButton>
          )}
          
          {actions}
          
          {enableExport && onExport && (
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={onExport}
              size="small"
              sx={{ textTransform: 'none' }}
            >
              Excel
            </Button>
          )}
        </Stack>
      </Stack>

      {/* Search and Filters Row */}
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          size="small"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            flex: 1,
            maxWidth: 400,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: '#f8fafc',
              '&:hover': {
                backgroundColor: '#f1f5f9',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#64748b' }} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="small"
          sx={{
            textTransform: 'none',
            backgroundColor: '#1a237e',
            '&:hover': {
              backgroundColor: '#283593',
            },
          }}
        >
          Add New
        </Button>
      </Stack>
    </Box>
 
);
};

const AdminReusableTable = <T extends Record<string, any>>({
  columns,
  data,
  title,
  isLoading = false,
  onSearchChange,
  searchQuery = '',
  paginationPerPage = 10,
  paginationRowsPerPageOptions = [10, 25, 50, 100],
  onRowClick,
  actions,
  enableSelection = false,
  onSelectionChange,
  // enableExport = true,
  onExport,
  emptyMessage = 'No data available',
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  currentPage = 0,
}: AdminReusableTableProps<T>) => {
  const theme = useTheme();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [page, setPage] = useState(currentPage);
  const [rowsPerPage, setRowsPerPage] = useState(paginationPerPage);
  const [selected, setSelected] = useState<T[]>([]);
  const [orderBy, setOrderBy] = useState<keyof T>();
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleSearch = (value: string) => {
    setLocalQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleRequestSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data;
      setSelected(newSelected);
      if (onSelectionChange) {
        onSelectionChange(newSelected);
      }
      return;
    }
    setSelected([]);
    if (onSelectionChange) {
      onSelectionChange([]);
    }
  };

  const handleClick = (event: React.MouseEvent, row: T) => {
    event.stopPropagation();
    
    if (!enableSelection) {
      if (onRowClick) {
        onRowClick(row);
      }
      return;
    }

    const selectedIndex = selected.findIndex((item) => {
      if ('id' in item && 'id' in row) {
        return item.id === row.id;
      }
      return false;
    });

    let newSelected: T[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    if (onRowsPerPageChange) {
      onRowsPerPageChange(newRowsPerPage);
    }
  };

  const isSelected = (row: T) => selected.some((item) => {
    if ('id' in item && 'id' in row) {
      return item.id === row.id;
    }
    return false;
  });

  const handleExportCSV = () => {
    if (onExport) {
      onExport();
      return;
    }

    const headers = columns.map(col => col.label);
    const csvRows = data.map(row => 
      columns.map(col => {
        const value = row[col.id as keyof T];
        return `"${String(value || '').replace(/"/g, '""')}"`;
      }).join(',')
    );
    
    const csv = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title?.toLowerCase().replace(/\s+/g, '_') || 'export'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderCell = (row: T, column: ColumnDefinition<T>) => {
    if (column.renderCell) {
      return column.renderCell(row);
    }

    const value = row[column.id as keyof T];

    // Default formatting for status
    if (column.id === 'status') {
      const status = String(value).toLowerCase();
      return (
        <Chip
          label={value}
          size="small"
          sx={{
            backgroundColor: 
              status === 'active' ? '#d1fae5' :
              status === 'pending' ? '#fef3c7' :
              '#f1f5f9',
            color:
              status === 'active' ? '#065f46' :
              status === 'pending' ? '#92400e' :
              '#64748b',
            fontWeight: 500,
            borderRadius: 1,
          }}
        />
      );
    }

    if (column.id === 'date') {
      try {
        return new Date(value).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
      } catch {
        return value;
      }
    }

    return value;
  };

  const sortedData = useMemo(() => {
    if (!orderBy) return data;

    return [...data].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return order === 'asc' 
        ? (aValue < bValue ? -1 : 1)
        : (aValue > bValue ? -1 : 1);
    });
  }, [data, order, orderBy]);

  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        borderRadius: 2,
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      }}
    >
      <TableToolbar
        title={title}
        searchQuery={localQuery}
        onSearchChange={handleSearch}
        selectedCount={selected.length}
        actions={actions}
        onExport={handleExportCSV}
        // enableExport={enableExport}
      />

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader size="medium">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8fafc' }}>
              {enableSelection && (
                <TableCell padding="checkbox" sx={{ width: 60, backgroundColor: '#f8fafc' }}>
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < data.length}
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                    sx={{ color: '#94a3b8' }}
                  />
                </TableCell>
              )}

              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align || 'left'}
                  sx={{
                    minWidth: column.minWidth,
                    backgroundColor: '#f8fafc',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: '#334155',
                    borderBottom: '2px solid #e2e8f0',
                  }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id as keyof T)}
                    >
                      {column.label}
                      {orderBy === column.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length + (enableSelection ? 1 : 0)} align="center" sx={{ py: 8 }}>
                  <CircularProgress size={40} sx={{ color: '#1a237e' }} />
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (enableSelection ? 1 : 0)} align="center" sx={{ py: 8 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography color="#64748b" sx={{ mb: 2 }}>
                      {emptyMessage}
                    </Typography>
                    <Button variant="outlined" startIcon={<AddIcon />}>
                      Add New Entry
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    key={row.id || index}
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{
                      cursor: onRowClick || enableSelection ? 'pointer' : 'default',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      },
                      '&.Mui-selected': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.12),
                        },
                      },
                    }}
                  >
                    {enableSelection && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          sx={{ color: '#94a3b8' }}
                        />
                      </TableCell>
                    )}

                    {columns.map((column) => (
                      <TableCell
                        key={String(column.id)}
                        align={column.align || 'left'}
                        sx={{
                          borderBottom: '1px solid #e2e8f0',
                          fontSize: '0.875rem',
                          color: '#475569',
                          ...column.cellStyle,
                        }}
                      >
                        {renderCell(row, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={paginationRowsPerPageOptions}
        component="div"
        count={totalCount || data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: '1px solid #e2e8f0',
          '& .MuiTablePagination-selectLabel': {
            fontSize: '0.875rem',
            color: '#64748b',
          },
          '& .MuiTablePagination-displayedRows': {
            fontSize: '0.875rem',
            color: '#334155',
          },
        }}
      />
    </Paper>
  );
};

export type { ColumnDefinition };
export default AdminReusableTable;