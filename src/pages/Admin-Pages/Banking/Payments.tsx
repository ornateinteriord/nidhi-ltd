import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Button,
  Typography,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import CloseIcon from '@mui/icons-material/Close';
import { useReactToPrint } from 'react-to-print';
import AdminReusableTable from '../../../utils/AdminReusableTable';
import { useGetPayments, useDeletePayment, useGetPaymentById, Payment as PaymentType } from '../../../queries/banking';
import { toast } from 'react-toastify';
import PaymentDialog from '../../../components/Banking/PaymentDialog';
import ConfirmDialog from '../../../components/Shared/ConfirmDialog';
import PaymentPrint from '../../../components/Print-components/Payments/payment';
import PaymentsTablePrint from '../../../components/Print-components/Payments/payments';

interface Payment {
  id: string;
  payment_id: string;
  date: string;
  paid_to: string;
  description: string;
  mode_of_payment_paid: string;
  amount: number;
  status: 'active' | 'inactive';
  rowNumber?: number;
}

const Payments: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<string | null>(null);
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const [paymentToPrint, setPaymentToPrint] = useState<string | null>(null);
  const [tablePrintDialogOpen, setTablePrintDialogOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const tablePrintRef = useRef<HTMLDivElement>(null);

  const { data: paymentsData, isLoading } = useGetPayments(page, 10, searchQuery);
  // Fetch all payments for printing (without pagination)
  const { data: allPaymentsData } = useGetPayments(1, 9999, '', undefined, undefined);
  const deletePaymentMutation = useDeletePayment();
  const { data: paymentToPrintData } = useGetPaymentById(paymentToPrint || '', !!paymentToPrint);

  // Transform API data to table format
  const payments: Payment[] = paymentsData?.data?.map((payment: PaymentType, index: number) => ({
    id: payment._id || '',
    payment_id: payment.payment_id,
    date: payment.payment_date
      ? new Date(payment.payment_date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
      : '-',
    paid_to: payment.paid_to || 'N/A',
    description: payment.payment_details || '-',
    mode_of_payment_paid: payment.mode_of_payment_paid || '-',
    amount: payment.amount || 0,
    status: payment.status as 'active' | 'inactive',
    rowNumber: (page - 1) * 10 + index + 1,
  })) || [];

  const columns = [
    {
      id: 'excel',
      label: 'Excel',
      minWidth: 80,
      align: 'center' as const,
      renderCell: (row: Payment) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
          {row.rowNumber || 1}
        </Typography>
      ),
    },
    {
      id: 'payment_id',
      label: 'Voucher No',
      sortable: true,
      minWidth: 120,
      renderCell: (row: Payment) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#6366f1' }}>
          {row.payment_id}
        </Typography>
      ),
    },
    {
      id: 'date',
      label: 'Date',
      sortable: true,
      minWidth: 130,
    },
    {
      id: 'paid_to',
      label: 'Paid To',
      sortable: true,
      minWidth: 150,
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 180,
    },
    {
      id: 'mode_of_payment_paid',
      label: 'Mode Of Payment',
      minWidth: 160,
      renderCell: (row: Payment) => (
        <Chip
          label={row.mode_of_payment_paid}
          size="small"
          sx={{
            backgroundColor:
              row.mode_of_payment_paid === 'Cash' ? '#dbeafe' :
                row.mode_of_payment_paid === 'Cheque' ? '#fef3c7' : '#d1fae5',
            color:
              row.mode_of_payment_paid === 'Cash' ? '#1e40af' :
                row.mode_of_payment_paid === 'Cheque' ? '#92400e' : '#065f46',
            fontWeight: 600,
          }}
        />
      ),
    },
    {
      id: 'amount',
      label: 'Amount',
      sortable: true,
      minWidth: 120,
      align: 'right' as const,
      renderCell: (row: Payment) => (
        <Typography variant="body2" sx={{ fontWeight: 700, color: '#dc2626' }}>
          ₹{row.amount.toFixed(2)}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      sortable: true,
      minWidth: 100,
      align: 'center' as const,
      renderCell: (row: Payment) => (
        <Chip
          label={row.status}
          size="small"
          sx={{
            backgroundColor: row.status === 'active' ? '#d1fae5' : '#f1f5f9',
            color: row.status === 'active' ? '#065f46' : '#64748b',
            fontWeight: 600,
            textTransform: 'capitalize',
          }}
        />
      ),
    },
    {
      id: 'modify',
      label: 'Modify',
      minWidth: 100,
      align: 'center' as const,
      renderCell: (row: Payment) => (
        <Button
          variant="contained"
          size="small"
          startIcon={<EditIcon />}
          onClick={(e) => {
            e.stopPropagation();
            handleModifyClick(row.payment_id);
          }}
          sx={{
            textTransform: 'none',
            backgroundColor: '#fbbf24',
            color: 'white',
            fontSize: '0.75rem',
            px: 2,
            '&:hover': {
              backgroundColor: '#f59e0b',
            }
          }}
        >
          Modify
        </Button>
      ),
    },
    {
      id: 'delete',
      label: 'Delete',
      minWidth: 100,
      align: 'center' as const,
      renderCell: (row: Payment) => (
        <Button
          variant="contained"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteClick(row.payment_id);
          }}
          sx={{
            textTransform: 'none',
            backgroundColor: '#ef4444',
            color: 'white',
            fontSize: '0.75rem',
            px: 2,
            '&:hover': {
              backgroundColor: '#dc2626',
            }
          }}
        >
          Delete
        </Button>
      ),
    },
    {
      id: 'display',
      label: 'Display',
      minWidth: 140,
      align: 'center' as const,
      renderCell: (row: Payment) => (
        <Button
          variant="contained"
          size="small"
          startIcon={<PrintIcon />}
          onClick={(e) => {
            e.stopPropagation();
            handlePrintPreview(row.payment_id);
          }}
          sx={{
            textTransform: 'none',
            backgroundColor: '#3b82f6',
            color: 'white',
            fontSize: '0.75rem',
            px: 2,
            '&:hover': {
              backgroundColor: '#2563eb',
            }
          }}
        >
          Print Preview
        </Button>
      ),
    },
  ];

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleModifyClick = (paymentId: string) => {
    setSelectedPaymentId(paymentId);
    setDialogOpen(true);
  };

  const handleAddPayment = () => {
    setSelectedPaymentId(null);
    setDialogOpen(true);
  };

  const handleDeleteClick = (paymentId: string) => {
    setPaymentToDelete(paymentId);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (paymentToDelete) {
      deletePaymentMutation.mutate(paymentToDelete, {
        onSuccess: () => {
          toast.success('Payment deleted successfully');
          setPaymentToDelete(null);
        },
        onError: (error: any) => {
          toast.error(error?.message || 'Failed to delete payment');
          setPaymentToDelete(null);
        }
      });
    }
  };

  const handlePrintPreview = (paymentId: string) => {
    setPaymentToPrint(paymentId);
    setPrintDialogOpen(true);
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const handleTablePrint = useReactToPrint({
    contentRef: tablePrintRef,
  });

  const handleExport = () => {
    toast.info('Excel export feature will be implemented soon');
  };

  const tableActions = (
    <Stack direction="row" spacing={1}>
      <Button
        variant="contained"
        startIcon={<PrintIcon />}
        onClick={() => setTablePrintDialogOpen(true)}
        sx={{
          textTransform: 'none',
          backgroundColor: '#6366f1',
          '&:hover': { backgroundColor: '#4f46e5' }
        }}
      >
        Print
      </Button>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddPayment}
        sx={{
          textTransform: 'none',
          backgroundColor: '#10b981',
          '&:hover': { backgroundColor: '#059669' }
        }}
      >
        Add Payments
      </Button>
    </Stack>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4, mt: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a237e', mb: 1 }}>
          List of Payments
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          CREATE, PRINT ADMIN TEMPLATE
        </Typography>
      </Box>

      <AdminReusableTable<Payment>
        columns={columns}
        data={payments}
        title="Payment Management"
        isLoading={isLoading}
        onSearchChange={handleSearchChange}
        paginationPerPage={10}
        actions={tableActions}
        onExport={handleExport}
        emptyMessage="No payments found"
        totalCount={paymentsData?.pagination?.total}
        currentPage={page - 1}
        onPageChange={(newPage) => setPage(newPage + 1)}
      />

      <PaymentDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedPaymentId(null);
        }}
        paymentId={selectedPaymentId}
      />

      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Payment"
        message="Are you sure you want to delete this payment? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
      />

      {/* Print Preview Dialog */}
      <Dialog
        open={printDialogOpen}
        onClose={() => {
          setPrintDialogOpen(false);
          setPaymentToPrint(null);
        }}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: { borderRadius: '16px' }
          }
        }}
      >
        <DialogTitle
          sx={{
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Payment Print Preview
          </Typography>
          <IconButton
            onClick={() => {
              setPrintDialogOpen(false);
              setPaymentToPrint(null);
            }}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0, backgroundColor: '#f3f4f6' }}>
          {paymentToPrintData?.data && (
            <Box sx={{ maxHeight: '70vh', overflow: 'auto', p: 2 }}>
              <PaymentPrint
                ref={printRef}
                paymentData={{
                  payment_id: paymentToPrintData.data.payment_id,
                  payment_date: paymentToPrintData.data.payment_date,
                  paid_to: paymentToPrintData.data.paid_to,
                  payment_details: paymentToPrintData.data.payment_details,
                  mode_of_payment_paid: paymentToPrintData.data.mode_of_payment_paid,
                  amount: paymentToPrintData.data.amount,
                  branch_code: paymentToPrintData.data.branch_code,
                  entered_by: paymentToPrintData.data.entered_by,
                }}
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            onClick={() => {
              setPrintDialogOpen(false);
              setPaymentToPrint(null);
            }}
            variant="outlined"
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              px: 3,
            }}
          >
            Close
          </Button>
          <Button
            onClick={handlePrint}
            variant="contained"
            startIcon={<PrintIcon />}
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              px: 3,
              background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            }}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table Print Preview Dialog */}
      <Dialog
        open={tablePrintDialogOpen}
        onClose={() => setTablePrintDialogOpen(false)}
        maxWidth="lg"
        fullWidth
        slotProps={{
          paper: {
            sx: { borderRadius: '16px' }
          }
        }}
      >
        <DialogTitle
          sx={{
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Payments Table Print Preview
          </Typography>
          <IconButton
            onClick={() => setTablePrintDialogOpen(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0, backgroundColor: '#f3f4f6' }}>
          <Box sx={{ maxHeight: '70vh', overflow: 'auto', p: 2 }}>
            <PaymentsTablePrint
              ref={tablePrintRef}
              payments={(allPaymentsData?.data || []).map((payment: PaymentType) => ({
                payment_id: payment.payment_id,
                payment_date: payment.payment_date,
                paid_to: payment.paid_to,
                payment_details: payment.payment_details,
                mode_of_payment_paid: payment.mode_of_payment_paid,
                amount: payment.amount,
                status: payment.status,
              }))}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            onClick={() => setTablePrintDialogOpen(false)}
            variant="outlined"
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              px: 3,
            }}
          >
            Close
          </Button>
          <Button
            onClick={handleTablePrint}
            variant="contained"
            startIcon={<PrintIcon />}
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              px: 3,
              background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            }}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Payments;