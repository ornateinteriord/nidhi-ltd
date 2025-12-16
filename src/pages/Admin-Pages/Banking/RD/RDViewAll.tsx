import React from 'react';
import ViewAllTemplate from '../ViewAllTemplate';
import { ColumnDefinition } from '../../../../utils/AdminReusableTable';

type RDRow = {
  accountNo: string;
  accountHolder: string;
  dateOfOpening: string;
  maturityDate?: string;
  interestRate?: string | number;
  duration?: string;
  amount?: number;
  balance?: number;
  status?: string;
};

const RD_COLUMNS: ColumnDefinition<RDRow>[] = [
  { id: 'accountNo', label: 'Account No', sortable: true },
  { id: 'accountHolder', label: 'Account Holder', sortable: true },
  { id: 'dateOfOpening', label: 'Date of Opening', sortable: true },
  { id: 'maturityDate', label: 'Maturity Date', sortable: true },
  { id: 'interestRate', label: 'Interest Rate' },
  { id: 'duration', label: 'Duration' },
  { id: 'amount', label: 'Amount', align: 'right' },
  { id: 'balance', label: 'Balance', align: 'right' },
  { id: 'status', label: 'Status' },
  { id: 'action', label: 'Action', align: 'center' },
];

const MOCK_DATA: RDRow[] = [];

const RDViewAll: React.FC = () => {
  return (
    <div style={{ marginTop: 60 }}>
      <ViewAllTemplate title="RD Account Details" columns={RD_COLUMNS} data={MOCK_DATA} />
    </div>
  );
};

export default RDViewAll;
