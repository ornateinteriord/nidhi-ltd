import React from "react";
import AdminReusableTable, { ColumnDefinition } from "../../../utils/AdminReusableTable";
import { Box } from "@mui/material";
import { getReceiptsColumns } from "../../../utils/DataTableColumnsProvider";

type Receipt = {
  voucherNo: string;
  date: string;
  receivedFrom: string;
  description: string;
  modeOfReceipt: string;
  amount: number;
  status: string;
};

const sampleData: Receipt[] = [];

const Receipts: React.FC = () => {
  const columns: ColumnDefinition<Receipt>[] = getReceiptsColumns();
  
  return (
    <Box sx={{ p: 3, mt: 8 }}>
      <AdminReusableTable<Receipt>
        title="List of Receipts"
        columns={columns}
        data={sampleData}
        emptyMessage="No receipts available"
      />
    </Box>
  );
};

export default Receipts;