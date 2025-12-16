import React, { useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  IconButton,
} from "@mui/material";

// import SearchIcon from '@mui/icons-material/Search';

import FileDownloadIcon from "@mui/icons-material/FileDownload";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface Agent {
  agentId: string;
  agentName: string;
  email: string;
  mobile: string;
  accountsAssigned: number;
}

const AgentAssignment: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Empty data as per screenshot
  const agents: Agent[] = [];

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <Box sx={{ p: 3,mt:8 }}>
      {/* ===== PAGE HEADER ===== */}

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a237e', mb: 1 }}>
          List of Agents
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0284c7",

            textTransform: "none",

            fontWeight: 600,

            px: 3,

            "&:hover": { backgroundColor: "#0369a1" },
          }}
        >
          AGENT ASSIGN
        </Button>
      </Stack>

      {/* ===== TABLE CONTAINER ===== */}

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",

          borderRadius: 2,

          p: 2,
        }}
      >


        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            sx={{
              textTransform: "none",

              borderColor: "#cbd5e1",

              color: "#0f172a",

              fontWeight: 500,
            }}
          >
            Excel
          </Button>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography fontWeight={500}>Search:</Typography>

            <TextField
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Stack>
        </Stack>

        {/* ===== TABLE ===== */}

        <Table>
          <TableHead>
            <TableRow>
              {[
                "Agent Id",
                "Agent Name",
                "Email",
                "Mobile",
                "Accounts Assigned",
              ].map((head, index) => (
                <TableCell key={head} sx={{ fontWeight: 600 }}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <span>{head}</span>
                    <IconButton 
                      size="small" 
                      onClick={() => requestSort(['agentId', 'agentName', 'email', 'mobile', 'accountsAssigned'][index])}
                    >
                      {sortConfig && sortConfig.key === ['agentId', 'agentName', 'email', 'mobile', 'accountsAssigned'][index] ? (
                        sortConfig.direction === 'asc' ? (
                          <ArrowUpwardIcon fontSize="inherit" />
                        ) : (
                          <ArrowDownwardIcon fontSize="inherit" />
                        )
                      ) : (
                        <ArrowUpwardIcon fontSize="inherit" />
                      )}
                    </IconButton>
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {agents.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{ py: 4, color: "#0f172a" }}
                >
                  No data available in table
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* ===== FOOTER ===== */}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing 0 to 0 of 0 entries
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button variant="outlined" disabled>
              Previous
            </Button>

            <Button variant="outlined" disabled>
              Next
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AgentAssignment;
