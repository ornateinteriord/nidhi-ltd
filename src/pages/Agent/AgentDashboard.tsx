import React from 'react';
import { Card, CardContent, Grid, Typography, Avatar, Button } from '@mui/material';
import { cn } from '../../lib/utils';
import '../../pages/Dashboard/dashboard.scss';

const AgentDashboard: React.FC = () => {
  const totalOrders = 927;
  const approvedOrders = 51;
  const openedPayments = 1723.5;
  const visitors = 14355;
  const reviews = 147;

  const latestOrders = [
    { id: 1, name: 'Tracey Newman', date: '25 March 2018', time: '12:23PM', status: 'Paid', subStatus: 'Approved', amount: '$403.22' },
    { id: 2, name: 'Jonathan Foster', date: '25 March 2018', time: '10:11PM', status: 'Unpaid', subStatus: 'Waiting', amount: '$504.15' },
    { id: 3, name: 'Dmitry Ivaniuk', date: '25 March 2018', time: '10:12AM', status: 'Paid', subStatus: 'Pending', amount: '$750.00' },
  ];

  return (
    <div>
      <div className="h-auto md:h-40 relative w-full overflow-hidden bg-[#efefef] flex flex-col items-center justify-center mt-10 py-6 md:py-0">
        <div className="absolute inset-0 w-full h-full bg-[#efefef] z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-evenly items-center w-full px-4 md:px-8 relative z-20 gap-6 md:gap-0">
          <div className="text-center md:text-left">
            <h1 className={cn("text-xl md:text-4xl text-gray-800")}>
              Welcome to Agent Dashboard
            </h1>
            <p className="mt-2 text-neutral-600 text-sm md:text-base">
              Manage Agents and track performance
            </p>
          </div>

          <div className="grid grid-cols-2 md:flex items-center gap-6 md:gap-12 text-gray-800">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-2">{approvedOrders}/{totalOrders}</div>
              <div className="text-xs md:text-sm flex items-center justify-center gap-1">Today's orders</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-2">${openedPayments}</div>
              <div className="text-xs md:text-sm flex items-center justify-center gap-1">Opened payments</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-2">{visitors}</div>
              <div className="text-xs md:text-sm flex items-center justify-center gap-1">Visitors</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-2">{reviews}</div>
              <div className="text-xs md:text-sm flex items-center justify-center gap-1">Reviews</div>
            </div>
          </div>
        </div>
      </div>

      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mx: { xs: 1, sm: 2 }, my: 2, pt: 3 }}>
        <Grid item xs={12} sm={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: 'bold', color: '#333' }}>
                Agent Performance
              </Typography>
              <div className="w-full mt-4 h-56 rounded bg-gradient-to-b from-red-200 to-red-50 flex items-center justify-center text-sm text-gray-600">Graph placeholder (monthly orders)</div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: 'bold', color: '#333' }}>Latest Orders</Typography>
              <div className="mt-4 space-y-4">
                {latestOrders.map((order) => (
                  <div className="flex items-center justify-between bg-white p-4 rounded shadow-sm" key={order.id}>
                    <div className="flex items-center gap-3">
                      <Avatar sx={{ width: 48, height: 48 }}>{order.name[0]}</Avatar>
                      <div>
                        <div className="font-semibold text-gray-800">{order.name}</div>
                        <div className="text-xs text-gray-500">{order.date} {order.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm px-3 py-1 rounded-full border text-gray-700">{order.status}</div>
                      <div className="text-sm px-3 py-1 rounded-full bg-gray-200 text-gray-700">{order.subStatus}</div>
                      <div className="font-semibold text-gray-800">{order.amount}</div>
                      <Button variant="outlined" size="small">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: 'bold', color: '#333' }}>Agent Summary</Typography>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 justify-between">
                  <div className="text-sm text-gray-600">Active Agents</div>
                  <div className="font-semibold text-gray-800">345</div>
                </div>
                <div className="flex items-center gap-3 justify-between">
                  <div className="text-sm text-gray-600">Total Agents</div>
                  <div className="font-semibold text-gray-800">1,027</div>
                </div>
                <div className="flex items-center gap-3 justify-between">
                  <div className="text-sm text-gray-600">Avg. Sales/Agent</div>
                  <div className="font-semibold text-gray-800">$1,230</div>
                </div>
                <div className="flex items-center gap-3 justify-between">
                  <div className="text-sm text-gray-600">Top Region</div>
                  <div className="font-semibold text-gray-800">Karnataka</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: 'bold', color: '#333' }}>Action Center</Typography>
              <div className="mt-4 flex flex-col gap-3">
                <Button variant="contained">Add Agent</Button>
                <Button variant="outlined">View All Agents</Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default AgentDashboard;
