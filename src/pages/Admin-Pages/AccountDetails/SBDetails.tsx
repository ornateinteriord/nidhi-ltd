import React from 'react';
import AccountDetailsTable from '../../../components/AccountOpening/AccountDetailsTable';

const SBDetails: React.FC = () => {
  const data: any[] = [];

  return (
    <AccountDetailsTable
      title="SB Account Details"
      data={data}
      accountType="SB"
    />
  );
};

export default SBDetails;
