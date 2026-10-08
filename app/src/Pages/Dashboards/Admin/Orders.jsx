
import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Components/LayoutComp/AdminLayout";
import axios from "axios";
import { BASE_URL } from "../../../Utils/utility";
import Cookies from "js-cookie";
import endPoints from "../../../Constants/apiEndPoints";

import {
  Alert,
  Box,
  Card,
  Chip,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";


// ==========================================
// Theme Tokens
// ==========================================
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


// ==========================================
// Orders
// ==========================================
function Orders() {
  const [datas, setDatas] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");


  // ==========================================
  // Get All Orders
  // ==========================================
  const getAllOrders = async (isRefresh = false) => {
    try {
      setError("");

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      // API / endpoint unchanged
      const response = await axios.get(
        `${BASE_URL}${endPoints.allOrders}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      const { data } = response?.data || {};

      setDatas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("GET ALL ORDERS ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to load orders. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  // ==========================================
  // Initial Load
  // ==========================================
  useEffect(() => {
    getAllOrders();
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
          }}
        >
          <Stack spacing={2} alignItems="center">
            <CircularProgress
              size={42}
              thickness={4}
              sx={{
                color: tokens.chili,
              }}
            />

            <Typography
              sx={{
                color: tokens.muted,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Loading orders...
            </Typography>
          </Stack>
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
            Header
        ========================================== */}
        <Box
          sx={{
            display: "flex",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Stack
              direction="row"
              spacing={1.2}
              alignItems="center"
              sx={{ mb: 0.7 }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  backgroundColor: "#EAF3EE",
                  color: tokens.basil,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShoppingBagOutlinedIcon />
              </Box>

              <Typography
                sx={{
                  fontSize: {
                    xs: 23,
                    md: 28,
                  },
                  fontWeight: 800,
                  color: tokens.ink,
                  letterSpacing: "-0.5px",
                }}
              >
                All Orders
              </Typography>
            </Stack>

            <Typography
              sx={{
                color: tokens.muted,
                fontSize: 14,
              }}
            >
              Monitor and review all customer orders from the platform.
            </Typography>
          </Box>


          {/* Refresh */}
          <Button
            onClick={() => getAllOrders(true)}
            disabled={refreshing}
            startIcon={
              refreshing ? (
                <CircularProgress
                  size={17}
                  sx={{
                    color: "inherit",
                  }}
                />
              ) : (
                <RefreshOutlinedIcon />
              )
            }
            sx={{
              minWidth: 125,
              height: 42,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              color: "#fff",
              backgroundColor: tokens.chili,
              "&:hover": {
                backgroundColor: tokens.chiliDark,
              },
            }}
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </Box>


        {/* ==========================================
            Error
        ========================================== */}
        {error && (
          <Alert
            severity="error"
            onClose={() => setError("")}
            sx={{
              mb: 3,
              borderRadius: "12px",
              border: "1px solid #F0C2BC",
              backgroundColor: "#FFF6F4",
              color: tokens.ink,
            }}
          >
            {error}
          </Alert>
        )}


        {/* ==========================================
            Summary
        ========================================== */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(4, 1fr)",
            },
            gap: 2,
            mb: 3,
          }}
        >
          <SummaryCard
            icon={<ShoppingBagOutlinedIcon />}
            title="Total Orders"
            value={datas.length}
            iconBg="#EAF3EE"
            iconColor={tokens.basil}
          />

          <SummaryCard
            icon={<HourglassEmptyOutlinedIcon />}
            title="Pending"
            value={
              datas.filter(
                (order) => order?.status === "pending"
              ).length
            }
            iconBg="#FFF7E8"
            iconColor="#B7791F"
          />

          <SummaryCard
            icon={<CheckCircleOutlineIcon />}
            title="Accepted"
            value={
              datas.filter(
                (order) => order?.status === "accepted"
              ).length
            }
            iconBg="#EAF3EE"
            iconColor={tokens.basilSoft}
          />

          <SummaryCard
            icon={<LocalShippingOutlinedIcon />}
            title="Delivered"
            value={
              datas.filter(
                (order) => order?.status === "delivered"
              ).length
            }
            iconBg="#EEF3FF"
            iconColor="#315EA8"
          />
        </Box>


        {/* ==========================================
            Main Card
        ========================================== */}
        <Card
          sx={{
            border: `1px solid ${tokens.line}`,
            borderRadius: "16px",
            boxShadow: "none",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >

          {/* Card Header */}
          <Box
            sx={{
              px: {
                xs: 2,
                md: 2.5,
              },
              py: 2,
              borderBottom: `1px solid ${tokens.line}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: tokens.ink,
                }}
              >
                Order Details
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  color: tokens.muted,
                  fontSize: 12.5,
                }}
              >
                {datas.length} order
                {datas.length !== 1 ? "s" : ""} found
              </Typography>
            </Box>

            <Chip
              label={`${datas.length} Total`}
              size="small"
              sx={{
                backgroundColor: "#F1F4F2",
                color: tokens.basil,
                fontWeight: 700,
                borderRadius: "8px",
              }}
            />
          </Box>


          {/* ==========================================
              Empty State
          ========================================== */}
          {datas.length === 0 ? (
            <Box
              sx={{
                py: 8,
                px: 3,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  mx: "auto",
                  mb: 2,
                  borderRadius: "18px",
                  backgroundColor: "#EAF3EE",
                  color: tokens.basil,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShoppingBagOutlinedIcon
                  fontSize="large"
                />
              </Box>

              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: tokens.ink,
                }}
              >
                No Orders Found
              </Typography>

              <Typography
                sx={{
                  mt: 0.7,
                  color: tokens.muted,
                  fontSize: 14,
                }}
              >
                There are currently no orders available.
              </Typography>
            </Box>
          ) : (
            /* ==========================================
               Responsive Table
            ========================================== */
            <TableContainer
              sx={{
                overflowX: "auto",
              }}
            >
              <Table
                sx={{
                  minWidth: 1050,
                }}
              >
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#F8FAF9",
                    }}
                  >
                    <TableCell sx={headCellStyle}>
                      Items
                    </TableCell>

                    <TableCell sx={headCellStyle}>
                      Restaurant
                    </TableCell>

                    <TableCell sx={headCellStyle}>
                      Prices
                    </TableCell>

                    <TableCell sx={headCellStyle}>
                      Total Price
                    </TableCell>

                    <TableCell sx={headCellStyle}>
                      Ordered By
                    </TableCell>

                    <TableCell sx={headCellStyle}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>


                <TableBody>
                  {datas.map((data, index) => (
                    <TableRow
                      key={data?._id || index}
                      hover
                      sx={{
                        "&:last-child td": {
                          borderBottom: 0,
                        },
                        "&:hover": {
                          backgroundColor: "#FCFDFC",
                        },
                      }}
                    >

                      {/* ==================================
                          Items
                      ================================== */}
                      <TableCell>
                        <Stack spacing={0.7}>
                          {Array.isArray(data?.items) &&
                            data.items.map(
                              (item, itemIndex) => (
                                <Stack
                                  key={itemIndex}
                                  direction="row"
                                  spacing={0.8}
                                  alignItems="center"
                                >
                                  <Box
                                    sx={{
                                      width: 6,
                                      height: 6,
                                      borderRadius: "50%",
                                      backgroundColor:
                                        tokens.chili,
                                      flexShrink: 0,
                                    }}
                                  />

                                  <Typography
                                    sx={{
                                      fontSize: 13,
                                      fontWeight: 600,
                                      color: tokens.ink,
                                    }}
                                  >
                                    {item}
                                  </Typography>
                                </Stack>
                              )
                            )}
                        </Stack>
                      </TableCell>


                      {/* ==================================
                          Restaurant
                      ================================== */}
                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={0.8}
                          alignItems="center"
                        >
                          <RestaurantOutlinedIcon
                            sx={{
                              fontSize: 18,
                              color: tokens.basilSoft,
                            }}
                          />

                          <Typography
                            sx={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: tokens.ink,
                              maxWidth: 160,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {data?.restaurant || "N/A"}
                          </Typography>
                        </Stack>
                      </TableCell>


                      {/* ==================================
                          Prices
                      ================================== */}
                      <TableCell>
                        <Stack spacing={0.7}>
                          {Array.isArray(data?.prices) &&
                            data.prices.map(
                              (price, priceIndex) => (
                                <Typography
                                  key={priceIndex}
                                  sx={{
                                    fontSize: 13,
                                    color: tokens.muted,
                                    fontWeight: 600,
                                  }}
                                >
                                  Rs. {price}
                                </Typography>
                              )
                            )}
                        </Stack>
                      </TableCell>


                      {/* ==================================
                          Total Price
                      ================================== */}
                      <TableCell>
                        <Box
                          sx={{
                            display: "inline-flex",
                            px: 1.2,
                            py: 0.65,
                            borderRadius: "8px",
                            backgroundColor: "#EAF3EE",
                            color: tokens.basil,
                            fontSize: 13.5,
                            fontWeight: 800,
                            whiteSpace: "nowrap",
                          }}
                        >
                          Rs. {data?.totalPrice ?? 0}
                        </Box>
                      </TableCell>


                      {/* ==================================
                          Ordered By
                      ================================== */}
                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={0.8}
                          alignItems="center"
                        >
                          <PersonOutlineOutlinedIcon
                            sx={{
                              fontSize: 18,
                              color: tokens.muted,
                            }}
                          />

                          <Typography
                            sx={{
                              fontSize: 13,
                              color: tokens.muted,
                              fontWeight: 600,
                              maxWidth: 150,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {data?.orderedBy || "N/A"}
                          </Typography>
                        </Stack>
                      </TableCell>


                      {/* ==================================
                          Status
                      ================================== */}
                      <TableCell>
                        <OrderStatus
                          status={data?.status}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
      </Box>
    </AdminLayout>
  );
}


// ==========================================
// Summary Card
// ==========================================
function SummaryCard({
  icon,
  title,
  value,
  iconBg,
  iconColor,
}) {
  return (
    <Card
      sx={{
        border: `1px solid ${tokens.line}`,
        borderRadius: "14px",
        boxShadow: "none",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          p: 2.2,
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
            backgroundColor: iconBg,
            color: iconColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 12,
              color: tokens.muted,
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              mt: 0.2,
              fontSize: 24,
              lineHeight: 1.1,
              fontWeight: 800,
              color: tokens.ink,
            }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}


// ==========================================
// Order Status
// ==========================================
function OrderStatus({ status }) {
  const normalizedStatus =
    status?.toLowerCase?.() || "";

  const statusConfig = {
    accepted: {
      label: "Accepted",
      bg: "#EAF3EE",
      color: tokens.basil,
      icon: <CheckCircleOutlineIcon />,
    },

    cancelled: {
      label: "Cancelled",
      bg: "#FFF1EE",
      color: tokens.chili,
      icon: <CancelOutlinedIcon />,
    },

    pending: {
      label: "Pending",
      bg: "#FFF7E8",
      color: "#A96800",
      icon: <HourglassEmptyOutlinedIcon />,
    },

    delivered: {
      label: "Delivered",
      bg: "#EEF3FF",
      color: "#315EA8",
      icon: <LocalShippingOutlinedIcon />,
    },
  };

  const config = statusConfig[normalizedStatus] || {
    label: status || "Unknown",
    bg: "#F1F4F2",
    color: tokens.muted,
    icon: <ShoppingBagOutlinedIcon />,
  };

  return (
    <Tooltip title={`Order status: ${config.label}`}>
      <Chip
        size="small"
        icon={React.cloneElement(config.icon, {
          sx: {
            fontSize: "15px !important",
          },
        })}
        label={config.label}
        sx={{
          backgroundColor: config.bg,
          color: config.color,
          fontWeight: 800,
          borderRadius: "8px",
          "& .MuiChip-icon": {
            color: config.color,
          },
        }}
      />
    </Tooltip>
  );
}


// ==========================================
// Table Header Style
// ==========================================
const headCellStyle = {
  fontSize: 11.5,
  fontWeight: 800,
  color: tokens.muted,
  textTransform: "uppercase",
  letterSpacing: "0.4px",
  borderBottom: `1px solid ${tokens.line}`,
  whiteSpace: "nowrap",
};


export default Orders;