import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Chip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 260;

const tokens = {
  ink: "#1B1F1D",
  muted: "#5E6763",
  line: "#DADFDC",
  surface: "#F5F7F6",
  chili: "#D93A26",
  chiliDark: "#B92E1D",
  basil: "#133A2D",
  basilSoft: "#1D5A45",
  mint: "#9FD8BE",
};

const vendorLists = [
  {
    name: "Dashboard",
    url: "/vendor-dashboard",
    icon: <DashboardOutlinedIcon />,
  },
  {
    name: "Menu",
    url: "/vendor-menu",
    icon: <MenuBookOutlinedIcon />,
  },
  {
    name: "Order",
    url: "/vendor-order",
    icon: <RestaurantMenuOutlinedIcon />,
  },
  {
    name: "Restaurant",
    url: "/vendor-restaurant",
    icon: <StorefrontOutlinedIcon />,
  },
];

function VendorLayout({ children, window }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const getPageTitle = () => {
    if (currentPath.includes("vendor-menu")) return "Menu";
    if (currentPath.includes("vendor-order")) return "Orders";
    if (currentPath.includes("vendor-restaurant")) return "Restaurant";
    if (currentPath.includes("vendor-dashboard")) return "Dashboard";

    return "Vendor Panel";
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen((prev) => !prev);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: tokens.basil,
        backgroundImage: `
          radial-gradient(
            circle at top right,
            rgba(159, 216, 190, 0.12),
            transparent 35%
          )
        `,
        color: "#fff",
      }}
    >
      {/* Brand */}
      <Box
        sx={{
          minHeight: 82,
          px: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "12px",
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StoreOutlinedIcon
            sx={{
              fontSize: 25,
              color: tokens.mint,
            }}
          />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#fff",
              letterSpacing: "-0.2px",
            }}
          >
            Saylani PAPA
          </Typography>

          <Typography
            sx={{
              mt: 0.4,
              fontSize: 11,
              color: "rgba(255,255,255,0.62)",
              fontWeight: 500,
            }}
          >
            Vendor Panel
          </Typography>
        </Box>
      </Box>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.10)",
        }}
      />

      {/* Navigation */}
      <Box sx={{ px: 1.5, py: 2 }}>
        <Typography
          sx={{
            px: 1.5,
            mb: 1,
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontWeight: 800,
            color: "rgba(255,255,255,0.42)",
          }}
        >
          Vendor Menu
        </Typography>

        <List disablePadding>
          {vendorLists.map((item) => {
            const isActive =
              currentPath === item.url ||
              (item.url !== "/vendor-dashboard" &&
                currentPath.startsWith(item.url));

            return (
              <ListItem
                key={item.name}
                disablePadding
                sx={{ mb: 0.6 }}
              >
                <ListItemButton
                  component={NavLink}
                  to={item.url}
                  onClick={() => {
                    if (mobileOpen) {
                      handleDrawerClose();
                    }
                  }}
                  sx={{
                    position: "relative",
                    minHeight: 46,
                    px: 1.5,
                    borderRadius: "10px",
                    color: isActive
                      ? "#fff"
                      : "rgba(255,255,255,0.70)",
                    backgroundColor: isActive
                      ? "rgba(255,255,255,0.09)"
                      : "transparent",
                    transition: "all 0.2s ease",

                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                      color: "#fff",
                    },

                    ...(isActive && {
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: 9,
                        bottom: 9,
                        width: 3,
                        borderRadius: "0 4px 4px 0",
                        backgroundColor: tokens.chili,
                      },
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: "inherit",
                    }}
                  >
                    {React.cloneElement(item.icon, {
                      sx: {
                        fontSize: 21,
                      },
                    })}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontSize: 13.5,
                      fontWeight: isActive ? 700 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      {/* Vendor profile */}
      <Box
        sx={{
          mx: 1.5,
          mb: 1.5,
          p: 1.5,
          borderRadius: "12px",
          backgroundColor: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: tokens.chili,
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            V
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              noWrap
              sx={{
                fontSize: 12.5,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Vendor Account
            </Typography>

            <Typography
              noWrap
              sx={{
                fontSize: 10.5,
                color: "rgba(255,255,255,0.52)",
              }}
            >
              Restaurant Manager
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Logout */}
      <Box sx={{ px: 1.5, pb: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            minHeight: 44,
            px: 1.5,
            borderRadius: "10px",
            color: "rgba(255,255,255,0.68)",
            transition: "all 0.2s ease",

            "&:hover": {
              color: "#fff",
              backgroundColor: "rgba(217,58,38,0.15)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: "inherit",
            }}
          >
            <LogoutOutlinedIcon sx={{ fontSize: 21 }} />
          </ListItemIcon>

          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontSize: 13.5,
              fontWeight: 600,
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: tokens.surface,
        fontFamily:
          '"Plus Jakarta Sans", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <CssBaseline />

      {/* Top App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: {
            xs: "100%",
            sm: `calc(100% - ${drawerWidth}px)`,
          },
          ml: {
            xs: 0,
            sm: `${drawerWidth}px`,
          },
          backgroundColor: "#fff",
          color: tokens.ink,
          borderBottom: `1px solid ${tokens.line}`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            minHeight: {
              xs: 64,
              sm: 70,
            },
            px: {
              xs: 2,
              sm: 3,
            },
          }}
        >
          {/* Mobile Menu */}
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 1.5,
              display: {
                xs: "inline-flex",
                sm: "none",
              },
              color: tokens.ink,
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Page title */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              noWrap
              sx={{
                fontSize: {
                  xs: 17,
                  sm: 19,
                },
                fontWeight: 800,
                color: tokens.ink,
                letterSpacing: "-0.4px",
              }}
            >
              {getPageTitle()}
            </Typography>

            <Typography
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
                mt: 0.2,
                fontSize: 11.5,
                color: tokens.muted,
              }}
            >
              Vendor / Manage your restaurant
            </Typography>
          </Box>

          {/* Status */}
          <Chip
            icon={
              <Box
                component="span"
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: tokens.basilSoft,
                  ml: 1,
                }}
              />
            }
            label="Vendor"
            size="small"
            sx={{
              mr: {
                xs: 1,
                sm: 1.5,
              },
              height: 30,
              borderRadius: "8px",
              backgroundColor: "#EAF3EE",
              color: tokens.basil,
              fontSize: 11.5,
              fontWeight: 700,

              "& .MuiChip-icon": {
                marginRight: -0.3,
              },
            }}
          />

          {/* Avatar */}
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: tokens.chili,
              fontSize: 13,
              fontWeight: 800,
            }}
          >
            V
          </Avatar>
        </Toolbar>
      </AppBar>

      {/* Navigation */}
      <Box
        component="nav"
        aria-label="vendor navigation"
        sx={{
          width: {
            sm: drawerWidth,
          },
          flexShrink: {
            sm: 0,
          },
        }}
      >
        {/* Mobile Drawer */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          minHeight: "100vh",
          backgroundColor: tokens.surface,
        }}
      >
        <Toolbar
          sx={{
            minHeight: {
              xs: 64,
              sm: 70,
            },
          }}
        />

        <Box
          sx={{
            width: "100%",
            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            py: {
              xs: 2,
              sm: 3,
            },
            boxSizing: "border-box",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

VendorLayout.propTypes = {
  children: PropTypes.node,
  window: PropTypes.func,
};

export default VendorLayout;