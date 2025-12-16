import React from 'react';
import AccountDetailsTable from '../../../components/AccountOpening/AccountDetailsTable';

const CADetails: React.FC = () => {
  const data: any[] = [];

  return (
    <AccountDetailsTable
      title="CA Account Details"
      data={data}
      accountType="CA"
    />
  );
};

export default CADetails;
