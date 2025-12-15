import React from 'react';
import AccountDetailsTable from '../../../components/AccountOpening/AccountDetailsTable';

export const CLOSE_SB_DATA: any[] = [
  { accountNo: 'SB1003', accountHolder: 'Old User', dateOfOpening: '2019-05-10', closeDate: '2025-12-01', reason: 'Dormant', action: '' },
];

export const CLOSE_SB_COLUMNS = [
  { key: 'accountNo', label: 'Account No' },
  { key: 'accountHolder', label: 'Account Holder' },
  { key: 'operation', label: 'Operation' },
  { key: 'balance', label: 'Balance' },
  { key: 'status', label: 'Status' },
  { key: 'action', label: 'Action' },
];

export const CLOSE_CA_DATA: any[] = [
  { accountNo: 'CA2003', accountHolder: 'Old Corp', dateOfOpening: '2018-08-12', closeDate: '2025-11-20', reason: 'Closure by request', action: '' },
];

export const CLOSE_CA_COLUMNS = [
  { key: 'accountNo', label: 'Account No' },
  { key: 'accountHolder', label: 'Account Holder' },
  { key: 'operation', label: 'Operation' },
  { key: 'balance', label: 'Balance' },
  { key: 'status', label: 'Status' },
  { key: 'accountClose', label: 'Account Close' },
];

export const CloseSBTable: React.FC = () => {
  return (
    <AccountDetailsTable
      {...({ title: 'List of SB Ledgers Account', data: CLOSE_SB_DATA, columns: CLOSE_SB_COLUMNS, accountType: 'SB' } as any)}
    />
  );
};

export const CloseCATable: React.FC = () => {
  return (
    <AccountDetailsTable
      {...({ title: 'List of CA Ledgers Account', data: CLOSE_CA_DATA, columns: CLOSE_CA_COLUMNS, accountType: 'CA' } as any)}
    />
  );
};

export default CloseSBTable;
