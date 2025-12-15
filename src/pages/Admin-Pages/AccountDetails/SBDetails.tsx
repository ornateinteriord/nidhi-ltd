import React from 'react';
import AccountDetailsTable from '../../../components/AccountOpening/AccountDetailsTable';


const SBDetails: React.FC = () => {
  // example: empty data to match screenshot
  const data: any[] = [];

  return (
    <>
      <AccountDetailsTable title="SB Account Details" data={data} />
      
    </>
  );
};

export default SBDetails;
