import React from "react";
import AdminReusableTable, { ColumnDefinition } from "../../../utils/AdminReusableTable";
import { Box } from "@mui/material";
import { getPaymentsColumns } from "../../../utils/DataTableColumnsProvider";

type Payment = {
  voucherNo: string;
  date: string;
  paidTo: string;
  description: string;
  modeOfPayment: string;
  amount: number;
  status: string;
};

const sampleData: Payment[] = [];

const Payments: React.FC = () => {
  const columns: ColumnDefinition<Payment>[] = getPaymentsColumns();
  
  return (
    <Box sx={{ p: 3, mt: 8 }}>
      <AdminReusableTable<Payment>
        title="List of Payments"
        columns={columns}
        data={sampleData}
        emptyMessage="No payments available"
      />
    </Box>
  );
};

export default Payments;