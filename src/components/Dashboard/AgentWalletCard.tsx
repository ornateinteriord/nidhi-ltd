import React from 'react';
import { Card, CardContent, Typography, Box, Button, CircularProgress } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

interface AgentWalletCardProps {
    balance: string | number;
    isLoading?: boolean;
    onWithdraw: () => void;
}

const AgentWalletCard: React.FC<AgentWalletCardProps> = ({ balance, isLoading = false, onWithdraw }) => {
    return (
        <Card
            sx={{
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #667EEA 0%, #5B21B6 100%)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.01)',
                    boxShadow: '0 6px 24px rgba(102, 126, 234, 0.4)',
                },
                minHeight: '160px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <CardContent sx={{ zIndex: 1, textAlign: 'center', width: '100%', py: 4 }}>
                <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 1 }}>
                    Total Balance
                </Typography>
                {isLoading ? (
                    <CircularProgress size={40} sx={{ color: 'white', my: 2 }} />
                ) : (
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {typeof balance === 'number' ? `₹${balance.toFixed(2)}` : balance}
                    </Typography>
                )}
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
                    Wallet Balance
                </Typography>

                {/* Withdraw Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<AccountBalanceWalletIcon />}
                        onClick={(e) => {
                            e.stopPropagation();
                            onWithdraw();
                        }}
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '12px',
                            px: 4,
                            py: 1.5,
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: '1rem',
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.3)',
                                transform: 'scale(1.02)'
                            }
                        }}
                    >
                        Withdraw
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AgentWalletCard;
