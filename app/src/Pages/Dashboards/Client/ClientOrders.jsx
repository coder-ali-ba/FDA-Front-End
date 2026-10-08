
import ClientLayout from "../../../Components/LayoutComp/ClientLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { BASE_URL } from "../../../Utils/utility.js";
import endPoints from "../../../Constants/apiEndPoints.js";

import {
  Box,
  Chip,
  CircularProgress,
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

import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

function ClientOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders();
  }, []);

  /* -------------------------------------------------------------- */
  /* Get My Orders                                                  */
  /* -------------------------------------------------------------- */

  const getMyOrders = async () => {
    try {
      setLoading(true);

      const getMyToken = Cookies.get("authToken");

      const response = await axios.get(
        `${BASE_URL}${endPoints.getMyOrders}/${getMyToken}`,
        {
          headers: {
            Authorization: `Bearer ${getMyToken}`,
          },
        }
      );

      const { data } = response.data;

      setOrders(data || []);
    } catch (error) {
      console.log("Error fetching orders:", error.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------- */
  /* Status UI                                                      */
  /* -------------------------------------------------------------- */

  const getStatusDetails = (status) => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          background: "#FFF4E5",
          color: "#B76E00",
          icon: <AccessTimeOutlinedIcon />,
        };

      case "accepted":
        return {
          label: "Accepted",
          background: "#EAF3EE",
          color: "#133A2D",
          icon: <CheckCircleOutlineIcon />,
        };

      case "delivered":
        return {
          label: "Delivered",
          background: "#EAF3EE",
          color: "#133A2D",
          icon: <LocalShippingOutlinedIcon />,
        };

      default:
        return {
          label: status || "Pending",
          background: "#F5F7F6",
          color: "#5E6763",
          icon: <AccessTimeOutlinedIcon />,
        };
    }
  };

  return (
    <ClientLayout>
      <Box>
        {/* -------------------------------------------------------- */}
        {/* Page Header                                               */}
        {/* -------------------------------------------------------- */}

        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#1B1F1D",
                mb: 0.7,
              }}
            >
              Your Orders
            </Typography>

            <Typography
              sx={{
                color: "#5E6763",
                fontSize: 14,
              }}
            >
              Track and view all your restaurant orders.
            </Typography>
          </Box>

          <Chip
            icon={<ShoppingBagOutlinedIcon />}
            label={`${orders.length} Orders`}
            sx={{
              height: 40,
              px: 1,
              borderRadius: "10px",
              backgroundColor: "#EAF3EE",
              color: "#133A2D",
              fontWeight: 700,

              "& .MuiChip-icon": {
                color: "#133A2D",
              },
            }}
          />
        </Box>

        {/* -------------------------------------------------------- */}
        {/* Loading                                                   */}
        {/* -------------------------------------------------------- */}

        {loading ? (
          <Box
            sx={{
              minHeight: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress
              size={40}
              sx={{
                color: "#D93A26",
              }}
            />
          </Box>
        ) : orders.length === 0 ? (
          /* ------------------------------------------------------ */
          /* Empty State                                             */
          /* ------------------------------------------------------ */

          <Box
            sx={{
              minHeight: 300,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "#fff",
              border: "1px solid #DADFDC",
              borderRadius: "14px",
              p: 4,
            }}
          >
            <ShoppingBagOutlinedIcon
              sx={{
                fontSize: 52,
                color: "#133A2D",
                mb: 1,
              }}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 0.5,
              }}
            >
              No Orders Yet
            </Typography>

            <Typography
              sx={{
                color: "#5E6763",
                fontSize: 14,
              }}
            >
              Your restaurant orders will appear here.
            </Typography>
          </Box>
        ) : (
          /* ------------------------------------------------------ */
          /* Orders Table                                             */
          /* ------------------------------------------------------ */

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #DADFDC",
              borderRadius: "14px",
              overflowX: "auto",
            }}
          >
            <Table
              sx={{
                minWidth: 750,
              }}
            >
              {/* ------------------------------------------------ */}
              {/* Table Header                                       */}
              {/* ------------------------------------------------ */}

              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#F5F7F6",
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: 800,
                      color: "#1B1F1D",
                      borderBottom: "1px solid #DADFDC",
                      py: 2,
                    }}
                  >
                    Items
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 800,
                      color: "#1B1F1D",
                      borderBottom: "1px solid #DADFDC",
                    }}
                  >
                    Price
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 800,
                      color: "#1B1F1D",
                      borderBottom: "1px solid #DADFDC",
                    }}
                  >
                    Restaurant
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 800,
                      color: "#1B1F1D",
                      borderBottom: "1px solid #DADFDC",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* ------------------------------------------------ */}
              {/* Table Body                                         */}
              {/* ------------------------------------------------ */}

              <TableBody>
                {orders.map((order, index) => {
                  const status = getStatusDetails(order.status);

                  return (
                    <TableRow
                      key={order._id || index}
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
                          py: 2.2,
                          verticalAlign: "top",
                        }}
                      >
                        <Stack spacing={0.7}>
                          {order.items?.map((item, itemIndex) => (
                            <Box
                              key={itemIndex}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 7,
                                  height: 7,
                                  borderRadius: "50%",
                                  backgroundColor: "#D93A26",
                                  flexShrink: 0,
                                }}
                              />

                              <Typography
                                sx={{
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: "#1B1F1D",
                                }}
                              >
                                {item}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                      </TableCell>

                      {/* Price */}

                      <TableCell
                        sx={{
                          py: 2.2,
                          verticalAlign: "top",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 800,
                            fontSize: 15,
                            color: "#133A2D",
                          }}
                        >
                          Rs. {order.totalPrice}
                        </Typography>
                      </TableCell>

                      {/* Restaurant */}

                      <TableCell
                        sx={{
                          py: 2.2,
                          verticalAlign: "top",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <RestaurantOutlinedIcon
                            sx={{
                              fontSize: 20,
                              color: "#D93A26",
                            }}
                          />

                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "#1B1F1D",
                            }}
                          >
                            {order.restaurant}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Status */}

                      <TableCell
                        sx={{
                          py: 2.2,
                          verticalAlign: "top",
                        }}
                      >
                        <Chip
                          icon={status.icon}
                          label={status.label}
                          size="small"
                          sx={{
                            height: 32,
                            borderRadius: "8px",
                            backgroundColor: status.background,
                            color: status.color,
                            fontWeight: 700,

                            "& .MuiChip-icon": {
                              color: status.color,
                              fontSize: 18,
                            },

                            "& .MuiChip-label": {
                              px: 1,
                            },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </ClientLayout>
  );
}

export default ClientOrders;
