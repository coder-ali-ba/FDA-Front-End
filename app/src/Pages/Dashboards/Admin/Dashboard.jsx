import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Components/LayoutComp/AdminLayout";

import axios from "axios";
import Cookies from "js-cookie";

import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";

import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

import { BASE_URL } from "../../../Utils/utility";
import endPoints from "../../../Constants/apiEndPoints";

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

const AdminDashboard = () => {
  const [datas, setDatas] = useState({});
  const [rests, setRests] = useState([]);
  const [menues, setMenus] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Get Admin Data
  // ==========================================
  const myDatas = async () => {
    const response = await axios.get(
      `${BASE_URL}${endPoints.getMyData}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );

    const { data } = response.data;

    setDatas(data || {});
  };

  // ==========================================
  // Get Restaurants
  // ==========================================
  const getAllRests = async () => {
    const response = await axios.get(
      `${BASE_URL}${endPoints.getAdminEndPoint}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );

    const { data } = response.data;

    setRests(Array.isArray(data) ? data : []);
  };

  // ==========================================
  // Get Menus
  // ==========================================
  const getAllMenues = async () => {
    const response = await axios.get(
      `${BASE_URL}${endPoints.adminMenues}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );

    setMenus(
      Array.isArray(response?.data?.data)
        ? response.data.data
        : []
    );
  };

  // ==========================================
  // Get Vendors
  // ==========================================
  const getVendors = async () => {
    const response = await axios.get(
      `${BASE_URL}${endPoints.allVendors}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );

    const { data } = response.data;

    setAllVendors(Array.isArray(data) ? data : []);
  };

  // ==========================================
  // Get Customers
  // ==========================================
  const getCustomers = async () => {
    const response = await axios.get(
      `${BASE_URL}${endPoints.getAllCustomers}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );

    const { data } = response.data;

    setAllUsers(Array.isArray(data) ? data : []);
  };

  // ==========================================
  // Load Dashboard
  // ==========================================
  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      await Promise.all([
        myDatas(),
        getAllRests(),
        getVendors(),
        getCustomers(),
        getAllMenues(),
      ]);
    } catch (error) {
      console.error("Admin dashboard error:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to load dashboard data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // ==========================================
  // Loading State
  // ==========================================
  if (loading) {
    return (
      <AdminLayout>
        <Box
          sx={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: tokens.surface,
          }}
        >
          <Stack alignItems="center" spacing={1.5}>
            <CircularProgress
              size={38}
              thickness={4}
              sx={{ color: tokens.chili }}
            />

            <Typography
              sx={{
                color: tokens.muted,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Loading dashboard...
            </Typography>
          </Stack>
        </Box>
      </AdminLayout>
    );
  }

  // ==========================================
  // Error State
  // ==========================================
  if (error) {
    return (
      <AdminLayout>
        <Box
          sx={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 600 }}>
            <Alert
              severity="error"
              sx={{
                borderRadius: 2,
                border: "1px solid #F2C4BE",
                backgroundColor: "#FFF5F3",
              }}
            >
              {error}
            </Alert>

            <Typography
              component="button"
              onClick={loadDashboard}
              sx={{
                mt: 2,
                border: 0,
                background: "none",
                color: tokens.chili,
                fontWeight: 800,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Try Again
            </Typography>
          </Box>
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box
        sx={{
          width: "100%",
          fontFamily:
            '"Plus Jakarta Sans", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* ==========================================
            PAGE HEADER
        ========================================== */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: 24, sm: 30 },
                fontWeight: 800,
                color: tokens.ink,
                lineHeight: 1.2,
              }}
            >
              Dashboard
            </Typography>

            <Typography
              sx={{
                mt: 0.7,
                fontSize: 14,
                color: tokens.muted,
              }}
            >
              Overview of your restaurant platform
            </Typography>
          </Box>

          <Tooltip title="Refresh dashboard">
            <IconButton
              onClick={loadDashboard}
              sx={{
                width: 40,
                height: 40,
                border: `1px solid ${tokens.line}`,
                backgroundColor: "#fff",
                color: tokens.basil,
                "&:hover": {
                  backgroundColor: "#EAF3EE",
                },
              }}
            >
              <RefreshOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* ==========================================
            ADMIN WELCOME CARD
        ========================================== */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #133A2D 0%, #1D5A45 100%)",
            borderRadius: 3,
            p: { xs: 2.5, sm: 3.5 },
            mb: 3,
            color: "#fff",
          }}
        >
          {/* Decorative Circle */}
          <Box
            sx={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              right: -90,
              top: -110,
              backgroundColor: "rgba(159,216,190,0.10)",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 150,
              height: 150,
              borderRadius: "50%",
              right: 100,
              bottom: -100,
              backgroundColor: "rgba(255,255,255,0.05)",
            }}
          />

          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={3}
            sx={{ position: "relative", zIndex: 1 }}
          >
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mb: 1 }}
              >
                <AdminPanelSettingsOutlinedIcon
                  sx={{
                    color: tokens.mint,
                    fontSize: 22,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: 1.2,
                    fontWeight: 800,
                    color: tokens.mint,
                  }}
                >
                  Administrator
                </Typography>
              </Stack>

              <Typography
                sx={{
                  fontSize: { xs: 24, sm: 30 },
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                Welcome, {datas?.name || "Admin"}!
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.72)",
                  maxWidth: 620,
                }}
              >
                Manage restaurants, menus, vendors and customers
                from your administration panel.
              </Typography>
            </Box>

            <Box
              sx={{
                minWidth: { md: 240 },
                p: 2,
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.08)",
                border:
                  "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.65)",
                  mb: 0.5,
                }}
              >
                Account Type
              </Typography>

              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 800,
                  textTransform: "capitalize",
                }}
              >
                {datas?.type || "Administrator"}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* ==========================================
            STATISTICS
        ========================================== */}
        <Grid
          container
          spacing={2.2}
          sx={{ mb: 3 }}
        >
          {/* Restaurants */}
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Approved Restaurants"
              value={rests.length}
              icon={<RestaurantOutlinedIcon />}
              description="Restaurants on platform"
              iconBackground="#EAF3EE"
              iconColor={tokens.basil}
            />
          </Grid>

          {/* Menus */}
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Approved Menus"
              value={menues.length}
              icon={<FastfoodOutlinedIcon />}
              description="Available food items"
              iconBackground="#FFF1EF"
              iconColor={tokens.chili}
            />
          </Grid>

          {/* Vendors */}
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Vendors"
              value={allVendors.length}
              icon={<StorefrontOutlinedIcon />}
              description="Registered vendors"
              iconBackground="#EAF3EE"
              iconColor={tokens.basilSoft}
            />
          </Grid>

          {/* Customers */}
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Customers"
              value={allUsers.length}
              icon={<PeopleAltOutlinedIcon />}
              description="Registered customers"
              iconBackground="#FFF5E6"
              iconColor="#A86200"
            />
          </Grid>
        </Grid>

        {/* ==========================================
            ADMIN INFORMATION + QUICK OVERVIEW
        ========================================== */}
        <Grid container spacing={2.2}>
          {/* Admin Information */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                border: `1px solid ${tokens.line}`,
                boxShadow: "none",
                backgroundColor: "#fff",
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.2}
                  sx={{ mb: 2.5 }}
                >
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: tokens.basil,
                      color: "#fff",
                    }}
                  >
                    <AdminPanelSettingsOutlinedIcon />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: tokens.ink,
                      }}
                    >
                      Admin Information
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12.5,
                        color: tokens.muted,
                      }}
                    >
                      Your account details
                    </Typography>
                  </Box>
                </Stack>

                <Stack spacing={1.5}>
                  <InfoRow
                    icon={<AdminPanelSettingsOutlinedIcon />}
                    label="Name"
                    value={datas?.name || "N/A"}
                  />

                  <InfoRow
                    icon={<EmailOutlinedIcon />}
                    label="Email"
                    value={datas?.email || "N/A"}
                  />

                  <InfoRow
                    icon={<PhoneOutlinedIcon />}
                    label="Phone"
                    value={datas?.phNumber || "N/A"}
                  />

                  <InfoRow
                    icon={<StorefrontOutlinedIcon />}
                    label="Account Type"
                    value={datas?.type || "N/A"}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Platform Overview */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                border: `1px solid ${tokens.line}`,
                boxShadow: "none",
                backgroundColor: "#fff",
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: tokens.ink,
                    mb: 0.5,
                  }}
                >
                  Platform Overview
                </Typography>

                <Typography
                  sx={{
                    fontSize: 13,
                    color: tokens.muted,
                    mb: 2.5,
                  }}
                >
                  Current platform activity at a glance
                </Typography>

                <Stack spacing={1.3}>
                  <OverviewRow
                    label="Restaurants"
                    value={rests.length}
                    icon={<RestaurantOutlinedIcon />}
                  />

                  <OverviewRow
                    label="Menus"
                    value={menues.length}
                    icon={<FastfoodOutlinedIcon />}
                  />

                  <OverviewRow
                    label="Vendors"
                    value={allVendors.length}
                    icon={<StorefrontOutlinedIcon />}
                  />

                  <OverviewRow
                    label="Customers"
                    value={allUsers.length}
                    icon={<PeopleAltOutlinedIcon />}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

// ==========================================
// Statistics Card
// ==========================================
const StatCard = ({
  title,
  value,
  icon,
  description,
  iconBackground,
  iconColor,
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        border: `1px solid ${tokens.line}`,
        backgroundColor: "#fff",
        boxShadow: "none",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow:
            "0 10px 28px rgba(19, 58, 45, 0.08)",
        },
      }}
    >
      <CardContent sx={{ p: 2.3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography
              sx={{
                fontSize: 12.5,
                color: tokens.muted,
                fontWeight: 700,
                mb: 1,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 800,
                color: tokens.ink,
                lineHeight: 1,
              }}
            >
              {value}
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontSize: 11.5,
                color: tokens.muted,
              }}
            >
              {description}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: iconBackground,
              color: iconColor,
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Admin Information Row
// ==========================================
const InfoRow = ({ icon, label, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.3,
        p: 1.4,
        borderRadius: 2,
        backgroundColor: tokens.surface,
        border: `1px solid ${tokens.line}`,
      }}
    >
      <Box
        sx={{
          width: 34,
          height: 34,
          flexShrink: 0,
          borderRadius: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#EAF3EE",
          color: tokens.basil,
        }}
      >
        {React.cloneElement(icon, {
          sx: { fontSize: 18 },
        })}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 11,
            color: tokens.muted,
            fontWeight: 700,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            fontSize: 13.5,
            color: tokens.ink,
            fontWeight: 700,
            wordBreak: "break-word",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

// ==========================================
// Overview Row
// ==========================================
const OverviewRow = ({ label, value, icon }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 1.5,
        borderRadius: 2,
        border: `1px solid ${tokens.line}`,
        backgroundColor: "#fff",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.2}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#EAF3EE",
            color: tokens.basil,
          }}
        >
          {React.cloneElement(icon, {
            sx: { fontSize: 19 },
          })}
        </Box>

        <Typography
          sx={{
            fontSize: 13.5,
            color: tokens.ink,
            fontWeight: 700,
          }}
        >
          {label}
        </Typography>
      </Stack>

      <Typography
        sx={{
          minWidth: 42,
          textAlign: "center",
          py: 0.5,
          px: 1,
          borderRadius: 1.5,
          backgroundColor: tokens.basil,
          color: "#fff",
          fontSize: 13,
          fontWeight: 800,
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
};

export default AdminDashboard;
