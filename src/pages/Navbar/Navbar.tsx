import {
  ChevronDown,
  Lock,
  LogOutIcon,
  MenuIcon,
  Settings,
  User,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import "./navbar.scss";
import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import TokenService from "../../queries/token/tokenService";
// import { deepOrange } from "@mui/material/colors";
import { useState } from "react";
// import { useGetMemberDetails } from "../../api/Memeber";


const Navbar = ({
  toggelSideBar,
  shouldHide,
}: {
  toggelSideBar: () => void;
  shouldHide: boolean;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, userRole } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Get logged-in userId from TokenService
  // const userId = TokenService.getMemberId();
  const memberDetails = { Name: "demo", name: "demo" }
  // Fetch member details using your custom hook
  // const { data: memberDetails } = useGetMemberDetails(userId);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
    TokenService.removeToken();
    window.dispatchEvent(new Event("storage"));
    setAnchorEl(null);
  };

  const isHomePage = location.pathname === "/";
  const isAdmin = userRole === "ADMIN";

  return (
    <>
      <AppBar
        position="fixed"
        className="navbar"
        style={{
          background: '#3335c7',
          boxShadow: "0 4px 20px rgba(99, 102, 241, 0.3)",
        }}
      >
        <Toolbar className="navbar-toolbar">
          {!shouldHide && (
            <IconButton onClick={() => toggelSideBar()}>
              <MenuIcon color="white" />
            </IconButton>
          )}
          <Typography
            variant="h4"
            className="navbar-title"
            style={{ 
              marginLeft: "12px", 
              cursor: "pointer",
              fontWeight: "bold",
              background: "linear-gradient(to right, #ffffff, #f0f9ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
            onClick={() => navigate("/")}
          >
            MSI
          </Typography>

          <div style={{ marginLeft: "auto" }}>
            {isLoggedIn ? (
              <div className="admin-panel-container">
                {!isHomePage && isAdmin && (
                  <div 
                    className="admin-panel-content" 
                    onClick={handleMenuOpen}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 16px",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <Avatar
                      className="user-avatar"
                      alt="User Avatar"
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                      }}
                    >
                      {memberDetails?.Name
                        ? memberDetails.Name.charAt(0).toUpperCase()
                        : "U"}
                    </Avatar>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: "white",
                        fontWeight: "500",
                        textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                      }}
                    >
                      {memberDetails?.Name || "Admin"}
                    </Typography>
                    <ChevronDown
                      color="white"
                      size={22}
                      style={{
                        transform: anchorEl ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>
                )}

                {!isHomePage && !isAdmin && (
                  <Button
                    className="logout-btn"
                    variant="ghost"
                    style={{ 
                      marginRight: "8px", 
                      fontSize: "50px",
                      color: "white",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      padding: "8px 16px",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                    onClick={handleLogout}
                  >
                    <LogOutIcon />
                  </Button>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </Toolbar>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            className: Boolean(anchorEl) ? "custom-menu open" : "custom-menu",
            style: {
              borderRadius: "16px",
              marginTop: "8px",
              background: "white",
              boxShadow: "0 10px 40px rgba(99, 102, 241, 0.2)",
              border: "1px solid rgba(99, 102, 241, 0.1)",
              minWidth: "240px",
            }
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px 0 16px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              margin: "-4px -4px 0 -4px",
            }}
          >
            <Avatar
              alt="Admin"
              sx={{
                width: 64,
                height: 64,
                marginBottom: "12px",
                background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                border: "3px solid white",
              }}
            >
              {memberDetails?.name
                ? memberDetails.name.charAt(0).toUpperCase()
                : ""}
            </Avatar>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: "bold", 
                color: "white",
                textShadow: "0 1px 2px rgba(0,0,0,0.2)"
              }}
            >
              {memberDetails?.name || "Member"}
            </Typography>
          </div>

          <Divider sx={{ my: 1 }} />

          <MenuItem 
            onClick={handleMenuClose}
            sx={{ 
              py: 1.5,
              '&:hover': {
                background: "rgba(99, 102, 241, 0.08)",
              }
            }}
          >
            <User size={18} style={{ marginRight: "12px", color: "#6366f1" }} />
            <Typography sx={{ color: "#4b5563", fontWeight: "500" }}>
              My Profile
            </Typography>
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate("/admin/update-password");
              setAnchorEl(null);
            }}
            sx={{ 
              py: 1.5,
              '&:hover': {
                background: "rgba(99, 102, 241, 0.08)",
              }
            }}
          >
            <Settings size={18} style={{ marginRight: "12px", color: "#6366f1" }} />
            <Typography sx={{ color: "#4b5563", fontWeight: "500" }}>
              Account Settings
            </Typography>
          </MenuItem>

          <Divider sx={{ my: 1 }} />

          <div className="admin-panel-menuitems">
            <MenuItem 
              onClick={handleMenuClose} 
              sx={{ 
                py: 1.5,
                display: "flex",
                '&:hover': {
                  background: "rgba(99, 102, 241, 0.08)",
                }
              }}
            >
              <Lock size={17} style={{ marginRight: "12px", color: "#6366f1" }} />
              <Typography sx={{ color: "#4b5563", fontWeight: "500" }}>
                Lock
              </Typography>
            </MenuItem>
            <MenuItem 
              onClick={handleLogout} 
              sx={{ 
                py: 1.5,
                display: "flex",
                '&:hover': {
                  background: "rgba(239, 68, 68, 0.08)",
                }
              }}
            >
              <LogOutIcon
                size={18}
                style={{ marginRight: "12px", color: "#ef4444" }}
              />
              <Typography sx={{ color: "#4b5563", fontWeight: "500" }}>
                Logout
              </Typography>
            </MenuItem>
          </div>
        </Menu>
      </AppBar>
    </>
  );
};

export default Navbar;