import { cn } from '../../../lib/utils';
import '../../Dashboard/dashboard.scss';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import DashboardCards from './DashboardCards';

const AdminDashboard = () => {

  const totalCities = 0;
  const totalDegrees = 0;
  const totalEvents = 0;
  const totalLikes = 0;

  return (
    <>
      <div className="h-auto md:h-40 relative w-full overflow-hidden bg-[#6b21a8] flex flex-col items-center justify-center mt-10 py-6 md:py-0">
        <div className="absolute inset-0 w-full h-full bg-[#6b21a8] z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-evenly items-center w-full px-4 md:px-8 relative z-20 gap-6 md:gap-0">
          <div className="text-center md:text-left">
            <h1 className={cn("text-xl md:text-4xl text-white")}>
              Welcome to Admin Dashboard
            </h1>
            <p className="mt-2 text-neutral-300 text-sm md:text-base">
              Manage your network and track your success
            </p>
          </div>

          <div className="grid grid-cols-2 md:flex items-center gap-6 md:gap-12 text-white">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-2">{totalLikes}k</div>
              <div className="text-xs md:text-sm flex items-center justify-center gap-1">
                <ThumbUpIcon sx={{ fontSize: { xs: 14, md: 16 } }} />
                Great
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-2">{totalDegrees}</div>
              <div className="text-xs md:text-sm flex items-center justify-center gap-1">
                <SchoolIcon sx={{ fontSize: { xs: 14, md: 16 } }} />
                Degrees
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-2">{totalEvents}</div>
              <div className="text-xs md:text-sm flex items-center justify-center gap-1">
                <EventIcon sx={{ fontSize: { xs: 14, md: 16 } }} />
                Events
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-2">{totalCities}</div>
              <div className="text-xs md:text-sm flex items-center justify-center gap-1">
                <LocationOnIcon sx={{ fontSize: { xs: 14, md: 16 } }} />
                Cities
              </div>
            </div>
          </div>
        </div>
      </div>
      <DashboardCards />
    </>
  )
}

export default AdminDashboard;