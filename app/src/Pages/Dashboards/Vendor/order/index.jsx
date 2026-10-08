import React, { useEffect, useState } from "react";
import VendorLayout from "../../../../Components/LayoutComp/VendorLayout";
import axios from "axios";
import { BASE_URL } from "../../../../Utils/utility.js";
import endPoints from "../../../../Constants/apiEndPoints.js";
import Cookies from "js-cookie";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

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

function Order() {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${BASE_URL}${endPoints.orderTomyRest}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      const { data } = response.data;
      setMyOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to load orders. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAccepted = async (id) => {
    try {
      setActionLoading(id);
      await axios.patch(
        `${BASE_URL}${endPoints.acceptOrder}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      await getOrders();
    } catch (error) {
      console.error("Error accepting order:", error);
      setError(
        error?.response?.data?.message ||
          "Unable to accept this order."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (id) => {
    try {
      setActionLoading(id);

      await axios.patch(
        `${BASE_URL}${endPoints.cancelOrder}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      await getOrders();
    } catch (error) {
      console.error("Error cancelling order:", error);
      setError(
        error?.response?.data?.message ||
          "Unable to cancel this order."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handlePending = () => {
    console.log("Order is pending");
  };

  const handleDelivered = async (id) => {
    try {
      setActionLoading(id);

      await axios.patch(
        `${BASE_URL}${endPoints.deliverOrder}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      await getOrders();
    } catch (error) {
      console.error("Error delivering order:", error);
      setError(
        error?.response?.data?.message ||
          "Unable to mark this order as delivered."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusDetails = (status) => {
    switch (status) {
      case "accepted":
        return {
          label: "Accepted",
          background: "#EAF3EE",
          color: tokens.basil,
          icon: <CheckCircleOutlineOutlinedIcon />,
        };

      case "cancelled":
        return {
          label: "Cancelled",
          background: "#FFF0ED",
          color: tokens.chiliDark,
          icon: <CancelOutlinedIcon />,
        };

      case "pending":
        return {
          label: "Pending",
          background: "#FFF5E6",
          color: "#A86600",
          icon: <HourglassEmptyOutlinedIcon />,
        };

      case "delivered":
        return {
          label: "Delivered",
          background: "#EAF3EE",
          color: tokens.basilSoft,
          icon: <LocalShippingOutlinedIcon />,
        };

      default:
        return {
          label: status || "Unknown",
          background: "#F0F2F1",
          color: tokens.muted,
          icon: <HourglassEmptyOutlinedIcon />,
        };
    }
  };

  const getActionDisabled = (status, action) => {
    if (action === "accept") {
      return status !== "pending";
    }

    if (action === "cancel") {
      return status === "cancelled" || status === "delivered";
    }

    if (action === "pending") {
      return status !== "pending";
    }

    if (action === "deliver") {
      return status !== "accepted";
    }

    return false;
  };

  return (
    <VendorLayout>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1400,
          mx: "auto",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: tokens.ink,
                fontSize: {
                  xs: 24,
                  sm: 28,
                },
                fontWeight: 800,
                letterSpacing: "-0.7px",
                lineHeight: 1.2,
              }}
            >
              Customer Orders
            </Typography>

            <Typography
              sx={{
                mt: 0.7,
                color: tokens.muted,
                fontSize: 13.5,
              }}
            >
              Manage incoming orders and update their status.
            </Typography>
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <Chip
              icon={
                <ShoppingBagOutlinedIcon
                  sx={{
                    fontSize: "17px !important",
                  }}
                />
              }
              label={`${myOrders.length} Orders`}
              sx={{
                height: 34,
                borderRadius: "9px",
                backgroundColor: "#EAF3EE",
                color: tokens.basil,
                fontSize: 12,
                fontWeight: 800,

                "& .MuiChip-icon": {
                  color: tokens.basilSoft,
                },
              }}
            />

            <IconButton
              onClick={getOrders}
              disabled={loading}
              sx={{
                width: 36,
                height: 36,
                borderRadius: "9px",
                border: `1px solid ${tokens.line}`,
                backgroundColor: "#fff",
                color: tokens.basil,

                "&:hover": {
                  backgroundColor: "#F0F5F2",
                },
              }}
            >
              <RefreshOutlinedIcon sx={{ fontSize: 19 }} />
            </IconButton>
          </Stack>
        </Box>

        {/* Error */}
        {error && (
          <Paper
            elevation={0}
            sx={{
              mb: 2.5,
              p: 2,
              borderRadius: "12px",
              border: "1px solid #F2C5BE",
              backgroundColor: "#FFF7F5",
            }}
          >
            <Typography
              sx={{
                color: tokens.chiliDark,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {error}
            </Typography>
          </Paper>
        )}

        {/* Loading */}
        {loading ? (
          <Paper
            elevation={0}
            sx={{
              minHeight: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px",
              border: `1px solid ${tokens.line}`,
              backgroundColor: "#fff",
            }}
          >
            <Stack
              alignItems="center"
              spacing={1.5}
            >
              <CircularProgress
                size={34}
                thickness={4}
                sx={{
                  color: tokens.chili,
                }}
              />

              <Typography
                sx={{
                  color: tokens.muted,
                  fontSize: 13,
                }}
              >
                Loading orders...
              </Typography>
            </Stack>
          </Paper>
        ) : myOrders.length === 0 ? (
          /* Empty State */
          <Paper
            elevation={0}
            sx={{
              minHeight: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px",
              border: `1px dashed ${tokens.line}`,
              backgroundColor: "#fff",
              textAlign: "center",
              px: 3,
            }}
          >
            <Stack
              alignItems="center"
              spacing={1}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#EAF3EE",
                  color: tokens.basil,
                  mb: 1,
                }}
              >
                <ShoppingBagOutlinedIcon sx={{ fontSize: 30 }} />
              </Box>

              <Typography
                sx={{
                  color: tokens.ink,
                  fontSize: 18,
                  fontWeight: 800,
                }}
              >
                No Orders Yet
              </Typography>

              <Typography
                sx={{
                  color: tokens.muted,
                  fontSize: 13,
                }}
              >
                Customer orders will appear here when they are placed.
              </Typography>
            </Stack>
          </Paper>
        ) : (
          /* Orders Table */
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: "16px",
              border: `1px solid ${tokens.line}`,
              backgroundColor: "#fff",
              overflowX: "auto",
            }}
          >
            <Table
              sx={{
                minWidth: 900,
              }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#F8FAF9",
                  }}
                >
                  <TableCell
                    sx={{
                      color: tokens.muted,
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.6px",
                      borderBottom: `1px solid ${tokens.line}`,
                      py: 1.8,
                    }}
                  >
                    Items
                  </TableCell>

                  <TableCell
                    sx={{
                      color: tokens.muted,
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.6px",
                      borderBottom: `1px solid ${tokens.line}`,
                    }}
                  >
                    Price
                  </TableCell>

                  <TableCell
                    sx={{
                      color: tokens.muted,
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.6px",
                      borderBottom: `1px solid ${tokens.line}`,
                    }}
                  >
                    Restaurant
                  </TableCell>

                  <TableCell
                    sx={{
                      color: tokens.muted,
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.6px",
                      borderBottom: `1px solid ${tokens.line}`,
                    }}
                  >
                    Status
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      color: tokens.muted,
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.6px",
                      borderBottom: `1px solid ${tokens.line}`,
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {myOrders.map((order, index) => {
                  const status = getStatusDetails(order?.status);
                  const isActionLoading = actionLoading === order?._id;

                  return (
                    <TableRow
                      key={order?._id || index}
                      sx={{
                        transition: "background-color 0.2s ease",

                        "&:hover": {
                          backgroundColor: "#FAFCFB",
                        },

                        "&:last-child td": {
                          borderBottom: 0,
                        },
                      }}
                    >
                      {/* Items */}
                      <TableCell
                        sx={{
                          py: 2,
                          borderBottom: `1px solid ${tokens.line}`,
                          verticalAlign: "top",
                        }}
                      >
                        <Stack spacing={0.7}>
                          {order?.items?.map((item, itemIndex) => (
                            <Typography
                              key={`${item}-${itemIndex}`}
                              sx={{
                                color: tokens.ink,
                                fontSize: 13,
                                fontWeight: 600,
                              }}
                            >
                              • {item}
                            </Typography>
                          ))}
                        </Stack>
                      </TableCell>

                      {/* Price */}
                      <TableCell
                        sx={{
                          py: 2,
                          borderBottom: `1px solid ${tokens.line}`,
                          verticalAlign: "top",
                        }}
                      >
                        <Typography
                          sx={{
                            color: tokens.chili,
                            fontSize: 14,
                            fontWeight: 800,
                            whiteSpace: "nowrap",
                          }}
                        >
                          Rs. {order?.totalPrice ?? 0}
                        </Typography>
                      </TableCell>

                      {/* Restaurant */}
                      <TableCell
                        sx={{
                          py: 2,
                          borderBottom: `1px solid ${tokens.line}`,
                          verticalAlign: "top",
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                        >
                          <Box
                            sx={{
                              width: 34,
                              height: 34,
                              borderRadius: "9px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "#EAF3EE",
                              color: tokens.basilSoft,
                            }}
                          >
                            <RestaurantOutlinedIcon
                              sx={{ fontSize: 18 }}
                            />
                          </Box>

                          <Typography
                            sx={{
                              color: tokens.ink,
                              fontSize: 13,
                              fontWeight: 700,
                            }}
                          >
                            {order?.restaurant || "Restaurant"}
                          </Typography>
                        </Stack>
                      </TableCell>

                      {/* Status */}
                      <TableCell
                        sx={{
                          py: 2,
                          borderBottom: `1px solid ${tokens.line}`,
                          verticalAlign: "top",
                        }}
                      >
                        <Chip
                          icon={React.cloneElement(status.icon, {
                            sx: {
                              fontSize: "15px !important",
                            },
                          })}
                          label={status.label}
                          size="small"
                          sx={{
                            height: 30,
                            borderRadius: "8px",
                            backgroundColor: status.background,
                            color: status.color,
                            fontSize: 11,
                            fontWeight: 800,

                            "& .MuiChip-icon": {
                              color: status.color,
                            },
                          }}
                        />
                      </TableCell>

                      {/* Actions */}
                      <TableCell
                        align="center"
                        sx={{
                          py: 2,
                          borderBottom: `1px solid ${tokens.line}`,
                          verticalAlign: "top",
                        }}
                      >
                        {isActionLoading ? (
                          <CircularProgress
                            size={24}
                            thickness={4}
                            sx={{
                              color: tokens.chili,
                            }}
                          />
                        ) : (
                          <Stack
                            direction="row"
                            justifyContent="center"
                            spacing={0.5}
                          >
                            {/* Accept */}
                            <IconButton
                              size="small"
                              disabled={getActionDisabled(
                                order?.status,
                                "accept"
                              )}
                              onClick={() =>
                                handleAccepted(order?._id)
                              }
                              title="Accept Order"
                              sx={{
                                width: 34,
                                height: 34,
                                color: tokens.basilSoft,
                                backgroundColor: "#EAF3EE",

                                "&:hover": {
                                  backgroundColor: "#DCEDE4",
                                },

                                "&.Mui-disabled": {
                                  color: "#AAB4AF",
                                  backgroundColor: "#F1F3F2",
                                },
                              }}
                            >
                              <CheckCircleOutlineOutlinedIcon
                                sx={{ fontSize: 19 }}
                              />
                            </IconButton>

                            {/* Cancel */}
                            <IconButton
                              size="small"
                              disabled={getActionDisabled(
                                order?.status,
                                "cancel"
                              )}
                              onClick={() =>
                                handleCancel(order?._id)
                              }
                              title="Cancel Order"
                              sx={{
                                width: 34,
                                height: 34,
                                color: tokens.chili,
                                backgroundColor: "#FFF0ED",

                                "&:hover": {
                                  backgroundColor: "#FFE4DF",
                                },

                                "&.Mui-disabled": {
                                  color: "#AAB4AF",
                                  backgroundColor: "#F1F3F2",
                                },
                              }}
                            >
                              <CancelOutlinedIcon
                                sx={{ fontSize: 19 }}
                              />
                            </IconButton>

                            {/* Pending */}
                            <IconButton
                              size="small"
                              disabled={getActionDisabled(
                                order?.status,
                                "pending"
                              )}
                              onClick={handlePending}
                              title="Pending Order"
                              sx={{
                                width: 34,
                                height: 34,
                                color: "#A86600",
                                backgroundColor: "#FFF5E6",

                                "&:hover": {
                                  backgroundColor: "#FFEDD1",
                                },

                                "&.Mui-disabled": {
                                  color: "#AAB4AF",
                                  backgroundColor: "#F1F3F2",
                                },
                              }}
                            >
                              <HourglassEmptyOutlinedIcon
                                sx={{ fontSize: 19 }}
                              />
                            </IconButton>

                            {/* Delivered */}
                            <IconButton
                              size="small"
                              disabled={getActionDisabled(
                                order?.status,
                                "deliver"
                              )}
                              onClick={() =>
                                handleDelivered(order?._id)
                              }
                              title="Mark Delivered"
                              sx={{
                                width: 34,
                                height: 34,
                                color: "#356FA8",
                                backgroundColor: "#EDF5FC",

                                "&:hover": {
                                  backgroundColor: "#E1EFFA",
                                },

                                "&.Mui-disabled": {
                                  color: "#AAB4AF",
                                  backgroundColor: "#F1F3F2",
                                },
                              }}
                            >
                              <LocalShippingOutlinedIcon
                                sx={{ fontSize: 19 }}
                              />
                            </IconButton>
                          </Stack>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Action Legend */}
        {!loading && myOrders.length > 0 && (
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={1}
            sx={{
              mt: 2,
              px: 0.5,
            }}
          >
            <Button
              size="small"
              disableRipple
              startIcon={<CheckCircleOutlineOutlinedIcon />}
              sx={{
                color: tokens.basilSoft,
                fontSize: 11,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              Accept
            </Button>

            <Button
              size="small"
              disableRipple
              startIcon={<CancelOutlinedIcon />}
              sx={{
                color: tokens.chili,
                fontSize: 11,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              size="small"
              disableRipple
              startIcon={<HourglassEmptyOutlinedIcon />}
              sx={{
                color: "#A86600",
                fontSize: 11,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              Pending
            </Button>

            <Button
              size="small"
              disableRipple
              startIcon={<LocalShippingOutlinedIcon />}
              sx={{
                color: "#356FA8",
                fontSize: 11,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              Delivered
            </Button>
          </Stack>
        )}
      </Box>
    </VendorLayout>
  );
}

export default Order;
