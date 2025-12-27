import './sidebar.scss';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserSideBarMenuItems, AdminSideBarMenuItems, AdviserSideBarMenuItems, AgentSideBarMenuItems } from './SidebarUtils'
import { Avatar, Toolbar, Typography } from '@mui/material';
import { SideBarMenuItemType } from '../../store/store';
import { MuiIcons } from '../Icons';
import { LoadingComponent } from '../../App';
import TokenService from '../../queries/token/tokenService';

const Sidebar = ({ isOpen, onClose, role }: { isOpen: boolean, onClose: () => void, role: string | null }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>('Dashboard');
  const [closingItem, setClosingItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (closingItem) {
      const timer = setTimeout(() => {
        setClosingItem(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [closingItem]);

  const handleToggle = (itemName: string) => {
    if (expandedItem && expandedItem !== itemName) {
      setClosingItem(expandedItem);
    }
    setExpandedItem(prev => prev === itemName ? null : itemName);
  };

  const handleSelect = (itemName: string) => {
    setSelectedItem(itemName);
    // Close sidebar on mobile regardless of submenu state
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  // Updated menu items logic with USER role using existing UserSideBarMenuItems
  const menuItems =
    role === "ADMIN" ? AdminSideBarMenuItems :
      role === "ADVISER" ? AdviserSideBarMenuItems :
        role === "AGENT" ? AgentSideBarMenuItems :
          role === "USER" ? UserSideBarMenuItems :  // USER role shows UserSideBarMenuItems
            UserSideBarMenuItems;

  // Get logged-in user's name from token
  const userName = TokenService.getUserName();
  const name = userName || "User";

  return (
    <motion.div
      className={`sidebar ${isOpen ? 'open' : 'closed'}`}
      initial={{ width: 0 }}
      animate={{ width: isOpen ? 250 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        zIndex: 100,
        background: '#3e2cdeff',
        boxShadow: '4px 0 20px rgba(99, 102, 241, 0.3)',
      }}
    >
      <Toolbar className="navbar-toolbar" />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sidebar-header"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              // background: 'rgba(255, 255, 255, 0.1)',
              // backdropFilter: 'blur(10px)',
              // borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '20px',
            }}
          >
            <Avatar
              alt="User Avatar"
              src={''}
              sx={{
                width: 50,
                height: 50,
                background: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                border: '2px solid white',
              }}
            >
              {name?.charAt(0).toUpperCase()}
            </Avatar>
            <div className="welcome-text" style={{ padding: '10px', color: '#fff' }}>
              {/* <Typography style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.875rem',
                fontWeight: '400',
              }}>
                Welcome,
              </Typography> */}
              <Typography style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: '1.125rem',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                lineHeight: '1.2',
              }}>
                {name}
              </Typography>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{
        height: 'calc(100vh - 100px)',
        overflowY: 'auto',
        paddingTop: '16px',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingBottom: '80px',
      }}>
        <AnimatePresence>
          {menuItems.map((item: SideBarMenuItemType) => {
            const isHovered = hoveredItem === item.name;
            const isSelected = selectedItem === item.name;
            const backgroundColor = isSelected
              ? 'rgba(255, 255, 255, 0.2)'
              : isHovered
                ? 'rgba(255, 255, 255, 0.15)'
                : 'transparent';

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  onClick={() => {
                    if (item.isExpandable) {
                      handleToggle(item.name);
                    } else {
                      navigate(item.path!);
                      handleSelect(item.name);
                    }
                  }}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`menu-item ${selectedItem === item.name ? 'selected' : ''}`}
                  style={{
                    background: backgroundColor,
                    borderRadius: '12px',
                    marginBottom: '4px',
                    border: isSelected
                      ? '1px solid rgba(255, 255, 255, 0.3)'
                      : '1px solid transparent',
                    transition: 'all 0.3s ease',
                    backdropFilter: isSelected ? 'blur(10px)' : 'none',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: isSelected ? 'white' : 'rgba(255, 255, 255, 0.9)',
                    fontWeight: isSelected ? '600' : '500',
                    flex: 1,
                  }}>
                    {item.icon}
                    <span style={{ flex: 1 }}>{item.name}</span>
                  </span>
                  {item.isExpandable && (
                    <span
                      style={{
                        marginLeft: 'auto',
                        color: 'rgba(255, 255, 255, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggle(item.name);
                      }}
                    >
                      {expandedItem === item.name ? <MuiIcons.ExpandLess /> : <MuiIcons.ExpandMore />}
                    </span>
                  )}
                </div>
                {item.isExpandable && (
                  <motion.div
                    className="sub-items"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: (expandedItem === item.name || closingItem === item.name) ? 'auto' : 0,
                      opacity: expandedItem === item.name ? 1 : 0
                    }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      margin: '4px 0 4px 16px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <AnimatePresence>
                      {(expandedItem === item.name || closingItem === item.name) && item.subItems?.map(subItem => {
                        const isSubItemActive = location.pathname === subItem.path;
                        const isSubItemHovered = hoveredSubItem === `${item.name}-${subItem.name}`;

                        const subItemBackground = isSubItemActive
                          ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)'
                          : isSubItemHovered
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent';

                        return (
                          <motion.div
                            key={subItem.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div
                              className={`sub-item ${isSubItemActive ? 'selected' : ''}`}
                              onClick={() => {
                                if (subItem.path) {
                                  navigate(subItem.path);
                                }
                                handleSelect(item.name);
                              }}
                              onMouseEnter={() => setHoveredSubItem(`${item.name}-${subItem.name}`)}
                              onMouseLeave={() => setHoveredSubItem(null)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '10px 16px',
                                color: isSubItemActive
                                  ? 'white'
                                  : 'rgba(255, 255, 255, 0.8)',
                                background: subItemBackground,
                                borderRadius: '6px',
                                margin: '2px 8px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                              }}
                            >
                              <span className="sub-item-icon" style={{
                                color: isSubItemActive
                                  ? 'white'
                                  : 'rgba(255, 255, 255, 0.7)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '20px',
                              }}>
                                {subItem.icon}
                              </span>
                              <span className="sub-item-name" style={{
                                fontWeight: isSubItemActive ? '600' : '500',
                                fontSize: '0.875rem',
                                flex: 1,
                              }}>
                                {subItem.name}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {false && <LoadingComponent />}
      </div>
    </motion.div>
  );
}

export default Sidebar;