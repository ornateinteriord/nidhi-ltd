
import { Card, CardContent, Typography, Avatar, Button, Grid, Box, CircularProgress } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WalletCard from '../../components/Dashboard/WalletCard';
import { useNavigate } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useGetMyAccounts } from '../../queries/Member';

// Icon mapping for account types
const getAccountIcon = (accountType: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
        'SB': <SavingsIcon sx={{ fontSize: 40 }} />,
        'CA': <AccountBalanceIcon sx={{ fontSize: 40 }} />,
        'RD': <TrendingUpIcon sx={{ fontSize: 40 }} />,
        'FD': <MonetizationOnIcon sx={{ fontSize: 40 }} />,
        'PIGMY': <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />,
        'MIS': <SavingsIcon sx={{ fontSize: 40 }} />,
    };
    return iconMap[accountType] || <AccountBalanceIcon sx={{ fontSize: 40 }} />;
};

// Gradient colors for different account types
const getAccountGradient = (index: number) => {
    const gradients = [
        'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
        'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
        'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
        'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
    ];
    return gradients[index % gradients.length];
};

const UserDashboard = () => {
    const navigate = useNavigate();
    const { data: accountsData, isLoading, isError } = useGetMyAccounts();

    // Calculate total balance from all accounts
    const totalBalance = accountsData?.data?.accountTypes?.reduce((total: number, accType: any) => {
        const typeTotal = accType.accounts.reduce((sum: number, acc: any) => sum + (acc.account_amount || 0), 0);
        return total + typeTotal;
    }, 0) || 0;

    // Create breakdown by account type
    const accountBreakdown = accountsData?.data?.accountTypes?.map((accType: any) => {
        const typeTotal = accType.accounts.reduce((sum: number, acc: any) => sum + (acc.account_amount || 0), 0);
        return {
            type: accType.account_group_name,
            amount: typeTotal
        };
    }) || [];

    const latestUsers = [
        { id: 1, name: 'Tracey Newman', date: '25 March 2018', time: '12:23PM', status: 'Active', subStatus: 'Premium', amount: '$403.22' },
        { id: 2, name: 'Jonathan Foster', date: '25 March 2018', time: '10:11PM', status: 'Inactive', subStatus: 'Basic', amount: '$504.15' },
        { id: 3, name: 'Dmitry Ivaniuk', date: '25 March 2018', time: '10:12AM', status: 'Active', subStatus: 'Pro', amount: '$750.00' },
    ];

    return (
        <div>
            {/* Account Type Cards Section */}
            <Box sx={{ px: 3, mt: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4f46e5', mb: 3 }}>
                    My Accounts
                </Typography>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : isError || !accountsData?.success ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography color="error">Failed to load account data</Typography>
                    </Box>
                ) : accountsData.data.accountTypes.length === 0 ? (
                    <Card sx={{
                        borderRadius: '16px',
                        p: 4,
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%)',
                        border: '2px dashed #d1d5db',
                    }}>
                        <AccountBalanceIcon sx={{ fontSize: 64, color: '#9ca3af', mb: 2 }} />
                        <Typography variant="h6" sx={{ color: '#6b7280', fontWeight: 600 }}>
                            No Accounts Opened
                        </Typography>
                        <Typography sx={{ color: '#9ca3af', mt: 1 }}>
                            You don't have any accounts yet. Contact your branch to open an account.
                        </Typography>
                    </Card>
                ) : (
                    <Grid container spacing={3}>
                        {accountsData.data.accountTypes.map((accountType, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={accountType.account_type}>
                                <Card sx={{
                                    borderRadius: '16px',
                                    background: getAccountGradient(index),
                                    color: 'white',
                                    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 8px 30px rgba(99, 102, 241, 0.4)',
                                    }
                                }}>
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                            <Box>
                                                {getAccountIcon(accountType.account_group_name)}
                                            </Box>
                                            <Box sx={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                borderRadius: '12px',
                                                px: 2,
                                                py: 0.5,
                                                backdropFilter: 'blur(10px)',
                                            }}>
                                                <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                                                    {accountType.count} {accountType.count === 1 ? 'Account' : 'Accounts'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                                            {accountType.account_group_name}
                                        </Typography>
                                        {accountType.accounts && accountType.accounts.length > 0 && (
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Typography sx={{
                                                    fontSize: '0.75rem',
                                                    opacity: 0.8,
                                                    fontFamily: 'monospace',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: '6px',
                                                }}>
                                                    {accountType.accounts[0].account_no || accountType.accounts[0].account_id}
                                                    {accountType.accounts.length > 1 && ` +${accountType.accounts.length - 1}`}
                                                </Typography>
                                            </Box>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>

            <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mx: { xs: 1, sm: 2 }, my: 2, pt: 3 }}>


                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                    <WalletCard
                        balance={isLoading ? "Loading..." : `₹${totalBalance.toFixed(2)}`}
                        onClick={() => navigate('/user/wallet')}
                        breakdown={accountBreakdown}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 8 }}>
                    <Card sx={{
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.2)',
                        border: '1px solid rgba(99, 102, 241, 0.1)',
                        background: 'white',
                    }}>
                        <CardContent>
                            <Typography variant="h6" style={{
                                fontWeight: 'bold',
                                color: '#4f46e5',
                                marginBottom: '16px',
                            }}>
                                User Activity
                            </Typography>
                            <Box sx={{
                                width: '100%',
                                mt: 2,
                                height: 224,
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #f3f4f6 0%, #f9fafb 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(99, 102, 241, 0.1)',
                            }}>
                                <Typography sx={{ color: '#6b7280' }}>
                                    Graph placeholder (monthly user activity)
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.2)',
                        border: '1px solid rgba(99, 102, 241, 0.1)',
                        background: 'white',
                        mt: 3,
                    }}>
                        <CardContent>
                            <Typography variant="h6" style={{
                                fontWeight: 'bold',
                                color: '#4f46e5',
                                marginBottom: '16px',
                            }}>
                                Recent User Activity
                            </Typography>
                            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {latestUsers.map((user) => (
                                    <Box
                                        key={user.id}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            background: 'white',
                                            p: 2,
                                            borderRadius: '12px',
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                                            border: '1px solid rgba(99, 102, 241, 0.1)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)',
                                                transform: 'translateY(-2px)',
                                            }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{
                                                width: 48,
                                                height: 48,
                                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                            }}>
                                                {user.name[0]}
                                            </Avatar>
                                            <Box>
                                                <Typography sx={{ fontWeight: '600', color: '#1f2937' }}>
                                                    {user.name}
                                                </Typography>
                                                <Typography sx={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                                    {user.date} {user.time}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{
                                                fontSize: '0.75rem',
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: '8px',
                                                border: user.status === 'Active'
                                                    ? '1px solid #10b981'
                                                    : '1px solid #ef4444',
                                                color: user.status === 'Active' ? '#10b981' : '#ef4444',
                                                background: user.status === 'Active'
                                                    ? 'rgba(16, 185, 129, 0.1)'
                                                    : 'rgba(239, 68, 68, 0.1)',
                                            }}>
                                                {user.status}
                                            </Box>
                                            <Box sx={{
                                                fontSize: '0.75rem',
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: '8px',
                                                background: user.subStatus === 'Premium'
                                                    ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
                                                    : user.subStatus === 'Pro'
                                                        ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                                                        : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                                                color: user.subStatus === 'Premium' || user.subStatus === 'Pro'
                                                    ? 'white'
                                                    : '#4b5563',
                                            }}>
                                                {user.subStatus}
                                            </Box>
                                            <Typography sx={{
                                                fontWeight: '600',
                                                color: '#1f2937',
                                                minWidth: '80px',
                                            }}>
                                                {user.amount}
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    borderRadius: '8px',
                                                    borderColor: '#6366f1',
                                                    color: '#6366f1',
                                                    '&:hover': {
                                                        borderColor: '#4f46e5',
                                                        background: 'rgba(99, 102, 241, 0.04)',
                                                    }
                                                }}
                                            >
                                                View
                                            </Button>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <Card sx={{
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.2)',
                        border: '1px solid rgba(99, 102, 241, 0.1)',
                        background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                        color: 'white',
                        mb: 3,
                    }}>
                        <CardContent>
                            <Typography variant="h6" style={{
                                fontWeight: 'bold',
                                color: 'white',
                                marginBottom: '20px',
                            }}>
                                User Summary
                            </Typography>

                            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.875rem' }}>
                                        Active Users
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.125rem' }}>
                                        345
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.875rem' }}>
                                        Total Users
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.125rem' }}>
                                        1,050
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.875rem' }}>
                                        Avg. Revenue/User
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.125rem' }}>
                                        $1,230
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.875rem' }}>
                                        Top Region
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.125rem' }}>
                                        Karnataka
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.2)',
                        border: '1px solid rgba(99, 102, 241, 0.1)',
                        background: 'white',
                    }}>
                        <CardContent>
                            <Typography variant="h6" style={{
                                fontWeight: 'bold',
                                color: '#4f46e5',
                                marginBottom: '20px',
                            }}>
                                Quick Actions
                            </Typography>
                            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                        borderRadius: '12px',
                                        py: 1.5,
                                        textTransform: 'none',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                            boxShadow: '0 6px 16px rgba(99, 102, 241, 0.4)',
                                        }
                                    }}
                                    startIcon={<PeopleIcon />}
                                >
                                    Add New User
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        borderRadius: '12px',
                                        py: 1.5,
                                        textTransform: 'none',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        borderColor: '#6366f1',
                                        color: '#6366f1',
                                        '&:hover': {
                                            borderColor: '#4f46e5',
                                            background: 'rgba(99, 102, 241, 0.04)',
                                        }
                                    }}
                                    startIcon={<ShoppingCartIcon />}
                                >
                                    View All Users
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        borderRadius: '12px',
                                        py: 1.5,
                                        textTransform: 'none',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        borderColor: '#10b981',
                                        color: '#10b981',
                                        '&:hover': {
                                            borderColor: '#059669',
                                            background: 'rgba(16, 185, 129, 0.04)',
                                        }
                                    }}
                                    startIcon={<EventIcon />}
                                >
                                    Generate Reports
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div >
    );
}

export default UserDashboard;