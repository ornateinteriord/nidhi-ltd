import React from "react";
import AdminReusableTable, { ColumnDefinition } from "../../../utils/AdminReusableTable";
import { Box } from "@mui/material";
import { getCashTransactionColumns } from "../../../utils/DataTableColumnsProvider";

type CashTx = {
  tranNo: string;
  tranDate: string;
  details: string;
  accountNo: string;
  refNo: string;
  withdrawal: number;
  deposits: number;
  balance: number;
};

const sampleData: CashTx[] = [
  { tranNo: "CASH0001", tranDate: "2025-12-13", details: "Member Registration", accountNo: "10513", refNo: "RPT0001", withdrawal: 0, deposits: 100, balance: 100 },
  { tranNo: "CASH0002", tranDate: "2025-12-13", details: "Member Registration", accountNo: "10514", refNo: "RPT0002", withdrawal: 0, deposits: 100, balance: 100 },
  { tranNo: "CASH0003", tranDate: "2025-12-15", details: "Member Registration", accountNo: "10515", refNo: "RPT0003", withdrawal: 0, deposits: 100, balance: 100 },
  { tranNo: "CASH0004", tranDate: "2025-12-15", details: "Member Registration", accountNo: "10516", refNo: "RPT0004", withdrawal: 0, deposits: 100, balance: 100 },
  { tranNo: "CASH0005", tranDate: "2025-12-15", details: "Member Registration", accountNo: "10517", refNo: "RPT0005", withdrawal: 0, deposits: 100, balance: 100 },
  { tranNo: "CASH0006", tranDate: "2025-12-15", details: "Member Registration", accountNo: "10518", refNo: "RPT0006", withdrawal: 0, deposits: 100, balance: 100 },
];

const CashTransaction: React.FC = () => {
  const columns: ColumnDefinition<CashTx>[] = getCashTransactionColumns();
  
  return (
    <Box sx={{ p: 3, mt: 8 }}>
      <AdminReusableTable<CashTx>
        title="Cash Transactions"
        columns={columns}
        data={sampleData}
      />
    </Box>
  );
};

export default CashTransaction;