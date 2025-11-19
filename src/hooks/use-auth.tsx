import { useState, useEffect } from "react";
import TokenService from "../api/token/tokenService";

const useAuth = () => {
  const storedRole = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;
  const [userRole, setUserRole] = useState<string | null>(TokenService.getRole() || (storedRole ? storedRole : null));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!TokenService.getToken() || !!storedRole);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = TokenService.getToken();
      const fallbackRole = localStorage.getItem('userRole');
      setUserRole(TokenService.getRole() || (fallbackRole ? fallbackRole : null));
      setIsLoggedIn(!!token || !!fallbackRole);
    };

    // Update state on render
    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { isLoggedIn, userRole };
};

export default useAuth;
