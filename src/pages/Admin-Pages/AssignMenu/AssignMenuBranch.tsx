import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from '@mui/material';
import ExportablePage, { MenuTreeItem } from '../../../utils/ExportablePage';


// Sample data
const sampleMenu: MenuTreeItem[] = [
  { id: 'home', label: 'Home' },
  {
    id: 'member',
    label: 'Member',
    children: [
      { id: 'member-registration', label: 'Member Registration' },
      { id: 'member-kyc', label: 'Member KYC' },
      { id: 'edit-member', label: 'Edit Member Detail' },
      { id: 'search-members', label: 'Search Members' },
      { id: 'member-ledger', label: 'Member Ledger' },
      { id: 'activate-member', label: 'Activate Member' },
      { id: 'deactivate-member', label: 'DE-Activate Member' },
      { id: 'member-login-detail', label: 'Member Login Detail' },
    ],
  },
  {
    id: 'share',
    label: 'Share',
  },
  {
    id: 'advisor',
    label: 'Advisor',
    children: [
      { id: 'advisor-registration', label: 'Advisor Registration' },
      { id: 'search-advisors', label: 'Search Advisors' },
      { id: 'view-advisors-team', label: 'View Advisors Team' },
      { id: 'advisors-upline-detail', label: 'Advisors Upline Detail' },
      { id: 'advisor-rank-update', label: 'Advisor Rank Update' },
      { id: 'advisor-login-detail', label: 'Advisor Login Detail' },
    ],
  },
];

const branches = [
  { id: 'b1', name: 'Master' },
  { id: 'b2', name: 'Branch A' },
  { id: 'b3', name: 'Branch B' },
];

const AssignMenuBranch: React.FC = () => {
  const [branch, setBranch] = useState<string>('b1');
  const [selectedMenu, setSelectedMenu] = useState<Array<string | number>>([]);

  const leftContent = useMemo(() => (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
        DETAILS
      </Typography>
      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <InputLabel id="branch-select-label">Branch</InputLabel>
        <Select
          labelId="branch-select-label"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          label="Branch"
        >
          {branches.map((b) => (
            <MenuItem key={String(b.id)} value={b.id}>
              {b.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'text.secondary' }}>
          SERVICE INFO
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" size="small">
            SHORT
          </Button>
          <Button variant="outlined" size="small" color="secondary">
            RESET
          </Button>
        </Box>
      </Box>
    </Box>
  ), [branch]);

  const handleSubmit = ({ selectedMenuIds }: { selectedMenuIds: Array<string | number> }) => {
    console.log('Submit for branch', branch, selectedMenuIds);
    // Add your submit logic here
  };

  const handleShowMenu = () => {
    console.log('Show menu clicked');
    // Add your show menu logic here
  };

  const handleReset = () => {
    setSelectedMenu([]);
    // Add any additional reset logic here
  };

  return (
    <Box sx={{ p: 3, marginTop: 8 }}>
      <ExportablePage
        title="Assign Menu To Branch"
        leftContent={leftContent}
        menuTree={sampleMenu}
        initialSelected={selectedMenu}
        onSelectionChange={(sel) => setSelectedMenu(sel)}
        onShowMenu={handleShowMenu}
        onSubmit={handleSubmit}
        onReset={handleReset}
        enableExport={true}
      />
    </Box>
  ); 
};

export default AssignMenuBranch;