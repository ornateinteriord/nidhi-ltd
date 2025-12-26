import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

interface WalletCardProps {
    balance: string | number;
    onClick: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ balance, onClick }) => {
    return (
        <Card
            onClick={onClick}
            sx={{
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', // Blue to Purple gradient
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 6px 24px rgba(99, 102, 241, 0.4)',
                },
                minHeight: '160px',
                width: '80%',
                display: 'flex',
                alignItems: 'center',
                justifySelf: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Decorative Rupee Symbol */}
            <Box sx={{
                position: 'absolute',
                left: '10%',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: 0.2,
            }}>
                <CurrencyRupeeIcon sx={{ fontSize: 80, color: 'white' }} />
            </Box>

            <Box sx={{
                position: 'absolute',
                left: '20%',
                top: '50%',
                transform: 'translateY(-50%)',
                display: { xs: 'none', md: 'block' }
            }}>
                <CurrencyRupeeIcon sx={{ fontSize: 48, color: 'white' }} />
            </Box>


            <CardContent sx={{ zIndex: 1, textAlign: 'center', width: '100%' }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {balance}
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                    Wallet Balance
                </Typography>
            </CardContent>
        </Card>
    );
};

export default WalletCard;
