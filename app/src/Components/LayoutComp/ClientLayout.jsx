
import * as React from "react";
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
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import GridViewOutlined from "@mui/icons-material/GridViewOutlined";
import StorefrontOutlined from "@mui/icons-material/StorefrontOutlined";
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined";
import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";

import Cookies from "js-cookie";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/ChatGPT Image Jul 25, 2025, 07_16_33 PM.png";

/* ------------------------------------------------------------------ */
/* Theme - Same as Admin Layout                                      */
/* ------------------------------------------------------------------ */

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

const theme = createTheme({
  palette: {
    primary: {
      main: tokens.chili,
      dark: tokens.chiliDark,
    },
    text: {
      primary: tokens.ink,
      secondary: tokens.muted,
    },
    background: {
      default: tokens.surface,
    },
  },

  shape: {
    borderRadius: 10,
  },

  typography: {
    fontFamily:
      '"Plus Jakarta Sans", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',

    h4: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },

    h6: {
      fontWeight: 800,
      letterSpacing: "-0.01em",
    },

    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",

          "& fieldset": {
            borderColor: tokens.line,
          },

          "&:hover fieldset": {
            borderColor: "#B5BDB9",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",

          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
  },
});

/* ------------------------------------------------------------------ */
/* Client Configuration                                              */
/* ------------------------------------------------------------------ */

const BRAND_NAME = "Saylani PAPA";
const drawerWidth = 260;

/* ------------------------------------------------------------------ */
/* Client Navigation                                                 */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = [
  {
    name: "Dashboard",
    url: "/client-dashboard",
    icon: <GridViewOutlined />,
  },
  {
    name: "Menu",
    url: "/client-menu",
    icon: <MenuBookOutlined />,
  },
  {
    name: "Orders",
    url: "/client-order",
    icon: <ReceiptLongOutlined />,
  },
  {
    name: "Restaurant",
    url: "/client-restaurant",
    icon: <StorefrontOutlined />,
  },
];

/* ------------------------------------------------------------------ */
/* Client Layout                                                     */
/* ------------------------------------------------------------------ */

function ClientLayout({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const currentItem = NAV_ITEMS.find((item) =>
    pathname.startsWith(item.url)
  );

  const pageTitle = currentItem?.name ?? "Client";

  /* -------------------------------------------------------------- */
  /* Logout                                                         */
  /* -------------------------------------------------------------- */

  const handleLogout = () => {
    Cookies.remove("authToken");
    localStorage.removeItem("user");

    navigate("/");
  };

  /* -------------------------------------------------------------- */
  /* Sidebar                                                        */
  /* -------------------------------------------------------------- */

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Brand */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2.5,
          py: 3,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Saylani PAPA"
          sx={{
            width: 38,
            height: 38,
            borderRadius: "10px",
            objectFit: "cover",
            backgroundColor: "#fff",
          }}
        />

        <Box sx={{ minWidth: 0 }}>
          <Typography
            noWrap
            sx={{
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: "-0.02em",
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            {BRAND_NAME}
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: tokens.mint,
              fontWeight: 600,
            }}
          >
            Customer panel
          </Typography>
        </Box>
      </Box>

      {/* Navigation Label */}

      <Typography
        sx={{
          px: 3,
          mb: 1,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.45)",
        }}
      >
        CUSTOMER
      </Typography>

      {/* Navigation */}

      <List
        component="nav"
        aria-label="Client navigation"
        sx={{
          px: 1.5,
          flexGrow: 1,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const selected = pathname.startsWith(item.url);

          return (
            <ListItem
              key={item.url}
              disablePadding
              sx={{
                mb: 0.5,
              }}
            >
              <ListItemButton
                component={NavLink}
                to={item.url}
                selected={selected}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: "10px",
                  py: 1.1,
                  color: "rgba(255,255,255,0.72)",
                  position: "relative",

                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.07)",
                    color: "#fff",
                  },

                  "&.Mui-selected": {
                    backgroundColor: "rgba(255,255,255,0.12)",
                    color: "#fff",

                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.16)",
                    },

                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: -12,
                      top: 10,
                      bottom: 10,
                      width: 4,
                      borderRadius: "0 4px 4px 0",
                      backgroundColor: tokens.chili,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: selected ? 700 : 600,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Logout */}

      <Box
        sx={{
          px: 1.5,
          pb: 2,
        }}
      >
        <Divider
          sx={{
            borderColor: "rgba(255,255,255,0.12)",
            mb: 1.5,
          }}
        />

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: "10px",
            py: 1.1,
            color: "rgba(255,255,255,0.72)",

            "&:hover": {
              backgroundColor: "rgba(217,58,38,0.2)",
              color: "#fff",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: "inherit",
            }}
          >
            <LogoutOutlined />
          </ListItemIcon>

          <ListItemText
            primary="Log out"
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: 600,
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  /* -------------------------------------------------------------- */
  /* Drawer Styling                                                  */
  /* -------------------------------------------------------------- */

  const drawerPaperSx = {
    boxSizing: "border-box",
    width: drawerWidth,
    backgroundColor: tokens.basil,

    backgroundImage: `radial-gradient(
      circle at 100% 0%,
      ${tokens.basilSoft} 0,
      transparent 50%
    )`,

    color: "#fff",
    border: "none",
  };

  /* -------------------------------------------------------------- */
  /* Layout                                                          */
  /* -------------------------------------------------------------- */

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "background.default",
        }}
      >
        {/* ------------------------------------------------------ */}
        {/* Top App Bar                                             */}
        {/* ------------------------------------------------------ */}

        <AppBar
          position="fixed"
          elevation={0}
          color="inherit"
          sx={{
            width: {
              md: `calc(100% - ${drawerWidth}px)`,
            },

            ml: {
              md: `${drawerWidth}px`,
            },

            backgroundColor: "#fff",
            color: tokens.ink,
            borderBottom: `1px solid ${tokens.line}`,
          }}
        >
          <Toolbar sx={{ gap: 1 }}>
            {/* Mobile Menu */}

            <IconButton
              edge="start"
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
              sx={{
                mr: 1,
                display: {
                  md: "none",
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Page Title */}

            <Typography
              variant="h6"
              component="h1"
              noWrap
              sx={{
                flexGrow: 1,
              }}
            >
              {pageTitle}
            </Typography>

            {/* Customer Profile */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
              }}
            >
              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                  textAlign: "right",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  Customer
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12,
                    color: "text.secondary",
                  }}
                >
                  Welcome back
                </Typography>
              </Box>

              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  backgroundColor: tokens.basil,
                  fontSize: 15,
                  fontWeight: 800,
                }}
              >
                C
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        {/* ------------------------------------------------------ */}
        {/* Sidebar                                                  */}
        {/* ------------------------------------------------------ */}

        <Box
          component="aside"
          sx={{
            width: {
              md: drawerWidth,
            },
            flexShrink: {
              md: 0,
            },
          }}
        >
          {/* Mobile Drawer */}

          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: {
                xs: "block",
                md: "none",
              },

              "& .MuiDrawer-paper": drawerPaperSx,
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
                md: "block",
              },

              "& .MuiDrawer-paper": drawerPaperSx,
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        {/* ------------------------------------------------------ */}
        {/* Main Content                                             */}
        {/* ------------------------------------------------------ */}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minWidth: 0,

            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            width: {
              md: `calc(100% - ${drawerWidth}px)`,
            },
          }}
        >
          {/* Space for fixed AppBar */}

          <Toolbar />

          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ClientLayout;


// This preserves your client navigation:

// - `/client-dashboard`
// - `/client-menu`
// - `/client-order`
// - `/client-restaurant`

// but replaces the old basic drawer with the **same visual system as the Admin layout**. The Admin version uses `NavLink`, pathname-based active state, the green sidebar, chili active indicator, and logout section; those patterns are now applied to the client version as well.

// One important improvement: I also removed the old `PropTypes/window` boilerplate because the new layout doesn't need the MUI documentation iframe `window` pattern.