// import * as React from 'react';
// import PropTypes from 'prop-types';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import MailIcon from '@mui/icons-material/Mail';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import GridViewIcon from '@mui/icons-material/GridView';
// import MenuBookIcon from '@mui/icons-material/MenuBook';
// import LocalDiningIcon from '@mui/icons-material/LocalDining';
// import { Link } from 'react-router-dom';
// import logo from "../../assets/ChatGPT Image Jul 25, 2025, 07_16_33 PM.png"


// const drawerWidth = 240;

// function AdminLayout(props) {
//   const {children , window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const [isClosing, setIsClosing] = React.useState(false);

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const adminArray =[
//     {
//     name :'Dashboard',
//     url : '/admin-dashboard',
//     icon : <GridViewIcon />
//    },
//    { 
//     name :'Restaurants',
//     url : "/all-restaurant",
//     icon : <MenuBookIcon />
//    }, 
//    { 
//     name :'Menu',
//     url : "/admin-menu",
//     icon : <MenuBookIcon />
//    },
//    {
//     name :'Orders',
//     url :"/admin-order",
//     icon :  <LocalDiningIcon />
//    }, 
//    {
//     name :'All Vendors',
//     url :"/admin-allvendors",
//     icon :  <LocalDiningIcon />
//    },
//    {
//     name :"All Customer",
//     url : "/admin-allcustomers",
//     icon :  <LocalDiningIcon />
//    }
   
//   ]

//   const drawer = (
//     <div>
      
//       <div style={{backgroundColor:"#0b70cfff", textAlign:"center"}}> <img src={logo} alt="" style={{width:"100px", height:"58px", borderRadius:"50%"}}/></div>
      
//       <List>
//         {adminArray.map((item, index) => (
//           <ListItem key={index} disablePadding sx={{boxShadow:"1px 1px 1px 1px lightGray"}}>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
              
//               <Link style={{ textDecoration: 'none', color: 'inherit' }} to={item.url}  >{item.name}</Link>
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
     
//     </div>
//   );

//   // Remove this const when copying and pasting into your project.
//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
          
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Admin Saylani PAPA
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         aria-label="mailbox folders"
//       >
//         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onTransitionEnd={handleDrawerTransitionEnd}
//           onClose={handleDrawerClose}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//           slotProps={{
//             root: {
//               keepMounted: true, // Better open performance on mobile.
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', sm: 'block' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
//       >
//         <Toolbar />
//          {children}      
//       </Box>
//     </Box>
//   );
// }

// AdminLayout.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * Remove this when copying and pasting into your project.
//    */
//   window: PropTypes.func,
// };

// export default AdminLayout;


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
import StoreMallDirectoryOutlined from "@mui/icons-material/StoreMallDirectoryOutlined";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import Cookies from "js-cookie";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/ChatGPT Image Jul 25, 2025, 07_16_33 PM.png";
 
/* ------------------------------------------------------------------ */
/* Design tokens (same as Login / Signup)                              */
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
    primary: { main: tokens.chili, dark: tokens.chiliDark },
    text: { primary: tokens.ink, secondary: tokens.muted },
    background: { default: tokens.surface },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily:
      '"Plus Jakarta Sans", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    h4: { fontWeight: 800, letterSpacing: "-0.02em" },
    h6: { fontWeight: 800, letterSpacing: "-0.01em" },
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          "& fieldset": { borderColor: tokens.line },
          "&:hover fieldset": { borderColor: "#B5BDB9" },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { boxShadow: "none", "&:hover": { boxShadow: "none" } },
      },
    },
  },
});
 
const BRAND_NAME = "Saylani PAPA"; // change to your final app name
const drawerWidth = 260;
 
const NAV_ITEMS = [
  { name: "Dashboard", url: "/admin-dashboard", icon: <GridViewOutlined /> },
  { name: "Restaurants", url: "/all-restaurant", icon: <StorefrontOutlined /> },
  { name: "Menu", url: "/admin-menu", icon: <MenuBookOutlined /> },
  { name: "Orders", url: "/admin-order", icon: <ReceiptLongOutlined /> },
  { name: "All Vendors", url: "/admin-allvendors", icon: <StoreMallDirectoryOutlined /> },
  { name: "All Customers", url: "/admin-allcustomers", icon: <PeopleAltOutlined /> },
];
 
/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */
function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
 
  const currentItem = NAV_ITEMS.find((item) => pathname.startsWith(item.url));
  const pageTitle = currentItem?.name ?? "Admin";
 
  const handleLogout = () => {
    Cookies.remove("authToken");
    localStorage.removeItem("user");
    navigate("/");
  };
 
  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Brand */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2.5, py: 3 }}>
        <Box
          component="img"
          src={logo}
          alt=""
          sx={{
            width: 38,
            height: 38,
            borderRadius: "10px",
            objectFit: "cover",
            bgcolor: "#fff",
          }}
        />
        <Box sx={{ minWidth: 0 }}>
          <Typography
            noWrap
            sx={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1.2 }}
          >
            {BRAND_NAME}
          </Typography>
          <Typography sx={{ fontSize: 12, color: tokens.mint, fontWeight: 600 }}>
            Admin panel
          </Typography>
        </Box>
      </Box>
 
      {/* Navigation */}
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
        MANAGE
      </Typography>
 
      <List component="nav" aria-label="Admin navigation" sx={{ px: 1.5, flexGrow: 1 }}>
        {NAV_ITEMS.map((item) => {
          const selected = pathname.startsWith(item.url);
          return (
            <ListItem key={item.url} disablePadding sx={{ mb: 0.5 }}>
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
                  "&:hover": { bgcolor: "rgba(255,255,255,0.07)", color: "#fff" },
                  "&.Mui-selected": {
                    bgcolor: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.16)" },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: -12,
                      top: 10,
                      bottom: 10,
                      width: 4,
                      borderRadius: "0 4px 4px 0",
                      bgcolor: tokens.chili,
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{ fontSize: 15, fontWeight: selected ? 700 : 600 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
 
      {/* Logout */}
      <Box sx={{ px: 1.5, pb: 2 }}>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", mb: 1.5 }} />
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: "10px",
            py: 1.1,
            color: "rgba(255,255,255,0.72)",
            "&:hover": { bgcolor: "rgba(217,58,38,0.2)", color: "#fff" },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText
            primary="Log out"
            primaryTypographyProps={{ fontSize: 15, fontWeight: 600 }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
 
  const drawerPaperSx = {
    boxSizing: "border-box",
    width: drawerWidth,
    bgcolor: tokens.basil,
    backgroundImage: `radial-gradient(circle at 100% 0%, ${tokens.basilSoft} 0, transparent 50%)`,
    color: "#fff",
    border: "none",
  };
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
        <AppBar
          position="fixed"
          elevation={0}
          color="inherit"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            bgcolor: "#fff",
            color: tokens.ink,
            borderBottom: `1px solid ${tokens.line}`,
          }}
        >
          <Toolbar sx={{ gap: 1 }}>
            <IconButton
              edge="start"
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 1, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
 
            <Typography variant="h6" component="h1" noWrap sx={{ flexGrow: 1 }}>
              {pageTitle}
            </Typography>
 
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              <Box sx={{ display: { xs: "none", sm: "block" }, textAlign: "right" }}>
                <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>
                  Admin
                </Typography>
                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                  Administrator
                </Typography>
              </Box>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: tokens.basil,
                  fontSize: 15,
                  fontWeight: 800,
                }}
              >
                A
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>
 
        <Box
          component="aside"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          {/* Mobile / tablet */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": drawerPaperSx,
            }}
          >
            {drawer}
          </Drawer>
 
          {/* Desktop */}
          <Drawer
            variant="permanent"
            open
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": drawerPaperSx,
            }}
          >
            {drawer}
          </Drawer>
        </Box>
 
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minWidth: 0,
            p: { xs: 2, sm: 3, md: 4 },
            width: { md: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
 
export default AdminLayout;