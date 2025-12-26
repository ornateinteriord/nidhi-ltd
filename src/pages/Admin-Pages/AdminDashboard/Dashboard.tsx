import DashboardCards from './DashboardCards';
import InterestCard from './interest-card';
import WalletCard from '../../../components/Dashboard/WalletCard';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="my-20" />
      <div className="mb-4">
        <WalletCard
          balance="₹ 50,000.00"
          onClick={() => navigate('/admin/wallet')}
        />
      </div>
      <InterestCard />
      <DashboardCards />
    </>
  )
}

export default AdminDashboard;