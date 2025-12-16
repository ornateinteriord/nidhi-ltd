import React from 'react';
import AccountDetailsTable from '../../../components/AccountOpening/AccountDetailsTable';


const CADetails: React.FC = () => {
  // example: empty data to match screenshot
  const data: any[] = [];

  return (
    <>
      <AccountDetailsTable title="CA Account Details" data={data} />
      
    </>
  );
};

export default CADetails;
