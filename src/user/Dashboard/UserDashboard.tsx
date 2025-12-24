
import { Card, CardContent, Typography, Avatar, Button, Grid, Box } from '@mui/material';
import { cn } from '../../lib/utils';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const UserDashboard = () => {
    const totalUsers = 1050;
    const activeUsers = 345;
    const monthlyRevenue = 17235.50;
    const userVisits = 14355;
    const userReviews = 147;

    const latestUsers = [
        { id: 1, name: 'Tracey Newman', date: '25 March 2018', time: '12:23PM', status: 'Active', subStatus: 'Premium', amount: '$403.22' },
        { id: 2, name: 'Jonathan Foster', date: '25 March 2018', time: '10:11PM', status: 'Inactive', subStatus: 'Basic', amount: '$504.15' },
        { id: 3, name: 'Dmitry Ivaniuk', date: '25 March 2018', time: '10:12AM', status: 'Active', subStatus: 'Pro', amount: '$750.00' },
    ];

    return (
        <div>
            <div className="h-auto md:h-40 relative w-full overflow-hidden bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] flex flex-col items-center justify-center mt-10 py-6 md:py-0">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

                <div className="flex flex-col md:flex-row justify-evenly items-center w-full px-4 md:px-8 relative z-20 gap-6 md:gap-0">
                    <div className="text-center md:text-left">
                        <h1 className={cn("text-xl md:text-4xl text-white font-bold")}>
                            Welcome to User Dashboard
                        </h1>
                        <p className="mt-2 text-white/80 text-sm md:text-base">
                            Manage Users and track performance
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:flex items-center gap-6 md:gap-12 text-white">
                        <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[100px] md:min-w-[120px]">
                            <div className="text-xl md:text-2xl font-bold mb-2">{activeUsers}/{totalUsers}</div>
                            <div className="text-xs md:text-sm flex items-center justify-center gap-1">
                                <PeopleIcon sx={{ fontSize: { xs: 14, md: 16 } }} />
                                Active Users
                            </div>
                        </div>
                        <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[100px] md:min-w-[120px]">
                            <div className="text-xl md:text-2xl font-bold mb-2">${monthlyRevenue.toLocaleString()}</div>
                            <div className="text-xs md:text-sm flex items-center justify-center gap-1">
                                <AccountBalanceIcon sx={{ fontSize: { xs: 14, md: 16 } }} />
                                Monthly Revenue
                            </div>
                        </div>
                        <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[100px] md:min-w-[120px]">
                            <div className="text-xl md:text-2xl font-bold mb-2">{userVisits.toLocaleString()}</div>
                            <div className="text-xs md:text-sm flex items-center justify-center gap-1">
                                <LocationOnIcon sx={{ fontSize: { xs: 14, md: 16 } }} />
                                User Visits
                            </div>
                        </div>
                        <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[100px] md:min-w-[120px]">
                            <div className="text-xl md:text-2xl font-bold mb-2">{userReviews}</div>
                            <div className="text-xs md:text-sm flex items-center justify-center gap-1">
                                <ThumbUpIcon sx={{ fontSize: { xs: 14, md: 16 } }} />
                                User Reviews
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mx: { xs: 1, sm: 2 }, my: 2, pt: 3 }}>
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
        </div>
    );
}

export default UserDashboard;