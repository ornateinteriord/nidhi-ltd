import React from "react";
import AdminReusableTable, { ColumnDefinition } from "../../../utils/AdminReusableTable";
import { Box } from "@mui/material";
import { getBankTransactionColumns } from "../../../utils/DataTableColumnsProvider";

type BankTx = {
  accountName: string;
  accountNo: string;
  bank: string;
  branch: string;
  ifsc: string;
};

const sampleData: BankTx[] = [
  { accountName: "test", accountNo: "23652", bank: "State Bank Of India", branch: "Bangalore", ifsc: "IFSC0001" },
];

const BankTransaction: React.FC = () => {
  const columns: ColumnDefinition<BankTx>[] = getBankTransactionColumns();
  
  return (
    <Box sx={{ p: 3, mt: 8 }}>
      <AdminReusableTable<BankTx>
        title="Bank Details"
        columns={columns}
        data={sampleData}
      />
    </Box>
  );
};

export default BankTransaction;