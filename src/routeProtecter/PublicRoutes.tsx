import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth";

const PublicRoute = () => {
  const { userRole } = useAuth();

  // If user is logged in, redirect them to their respective dashboard
  if (userRole) {
    return <Navigate to={`/${userRole.toLowerCase()}/dashboard`} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
