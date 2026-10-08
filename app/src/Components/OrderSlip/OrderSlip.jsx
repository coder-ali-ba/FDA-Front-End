import {
  Box,
  Button,
  Divider,
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

import axios from "axios";
import React from "react";
import { BASE_URL } from "../../Utils/utility";
import endPoints from "../../Constants/apiEndPoints";
import Cookies from "js-cookie";

import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

function OrderSlip({ menu }) {
  /* -------------------------------------------------------------- */
  /* Total Price                                                    */
  /* -------------------------------------------------------------- */

  const totalPrice = menu.reduce((sum, item) => {
    const price = parseFloat(item.itemPrice) || 0;

    return sum + price;
  }, 0);

  /* -------------------------------------------------------------- */
  /* Place Order                                                    */
  /* -------------------------------------------------------------- */

  const handlePlaceOrder = async () => {
    try {
      const menuItems = menu.map((item) => item.itemName);

      const menuPrice = menu.map((item) => item.itemPrice);

      const orderObj = {
        items: menuItems,
        prices: menuPrice,
        restaurant: menu[0]?.restaurantName,
        totalPrice: totalPrice,
      };

      await axios.post(
        `${BASE_URL}${endPoints.multipleOrders}`,
        orderObj,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      alert("Your Order Has Been Placed Successfully");
    } catch (error) {
      console.log(
        "Error placing order:",
        error?.response?.data || error.message
      );

      alert("Unable to place your order. Please try again.");
    }
  };

  /* -------------------------------------------------------------- */
  /* Empty Menu                                                     */
  /* -------------------------------------------------------------- */

  if (!menu || menu.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "14px",
          border: "1px solid #DADFDC",
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <ReceiptLongOutlinedIcon
          sx={{
            fontSize: 50,
            color: "#133A2D",
            mb: 1,
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
          }}
        >
          No Items Selected
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            color: "#5E6763",
            fontSize: 14,
          }}
        >
          Please select at least one item before placing an order.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 850,
        mx: "auto",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          overflow: "hidden",
          borderRadius: "16px",
          border: "1px solid #DADFDC",
          backgroundColor: "#fff",
          boxShadow: "0 12px 30px rgba(19,58,45,0.08)",
        }}
      >
        {/* -------------------------------------------------------- */}
        {/* Receipt Header                                           */}
        {/* -------------------------------------------------------- */}

        <Box
          sx={{
            backgroundColor: "#133A2D",
            backgroundImage:
              "radial-gradient(circle at 100% 0%, #1D5A45 0, transparent 50%)",
            color: "#fff",
            px: {
              xs: 2.5,
              sm: 3,
            },
            py: 2.5,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.12)",
                }}
              >
                <ReceiptLongOutlinedIcon />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 800,
                    lineHeight: 1.2,
                  }}
                >
                  Order Receipt
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#9FD8BE",
                    mt: 0.3,
                  }}
                >
                  Review your order before placing it
                </Typography>
              </Box>
            </Box>

            <ShoppingCartCheckoutOutlinedIcon
              sx={{
                fontSize: 30,
                color: "#9FD8BE",
              }}
            />
          </Stack>
        </Box>

        {/* -------------------------------------------------------- */}
        {/* Restaurant Information                                   */}
        {/* -------------------------------------------------------- */}

        <Box
          sx={{
            px: {
              xs: 2,
              sm: 3,
            },
            py: 2,
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
                color: "#D93A26",
                fontSize: 21,
              }}
            />

            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#5E6763",
                  lineHeight: 1.2,
                }}
              >
                Restaurant
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#1B1F1D",
                }}
              >
                {menu[0]?.restaurantName || "Restaurant"}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* -------------------------------------------------------- */}
        {/* Items Table                                              */}
        {/* -------------------------------------------------------- */}

        <TableContainer
          sx={{
            overflowX: "auto",
          }}
        >
          <Table
            sx={{
              minWidth: 560,
            }}
          >
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
                    py: 1.8,
                  }}
                >
                  Description
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 800,
                    color: "#1B1F1D",
                    borderBottom: "1px solid #DADFDC",
                    py: 1.8,
                  }}
                >
                  Item
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 800,
                    color: "#1B1F1D",
                    borderBottom: "1px solid #DADFDC",
                    py: 1.8,
                  }}
                >
                  Price
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {menu.map((row, index) => (
                <TableRow
                  key={row._id || index}
                  sx={{
                    "&:last-child td": {
                      borderBottom: 0,
                    },

                    "&:hover": {
                      backgroundColor: "#FAFCFB",
                    },
                  }}
                >
                  {/* Description */}

                  <TableCell
                    sx={{
                      py: 2,
                      color: "#5E6763",
                      fontSize: 13,
                      maxWidth: 300,
                    }}
                  >
                    {row.itemDesc || "No description available"}
                  </TableCell>

                  {/* Item */}

                  <TableCell
                    sx={{
                      py: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#1B1F1D",
                      }}
                    >
                      {row.itemName}
                    </Typography>
                  </TableCell>

                  {/* Price */}

                  <TableCell
                    align="right"
                    sx={{
                      py: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 800,
                        color: "#133A2D",
                      }}
                    >
                      Rs. {row.itemPrice}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider />

        {/* -------------------------------------------------------- */}
        {/* Total                                                    */}
        {/* -------------------------------------------------------- */}

        <Box
          sx={{
            px: {
              xs: 2,
              sm: 3,
            },
            py: 2.5,
            backgroundColor: "#FAFCFB",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <AttachMoneyOutlinedIcon
                sx={{
                  color: "#D93A26",
                }}
              />

              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#5E6763",
                }}
              >
                Total Amount
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 800,
                color: "#133A2D",
              }}
            >
              Rs. {totalPrice.toFixed(2)}
            </Typography>
          </Stack>

          {/* ------------------------------------------------------ */}
          {/* Place Order Button                                     */}
          {/* ------------------------------------------------------ */}

          <Button
            fullWidth
            variant="contained"
            onClick={handlePlaceOrder}
            startIcon={<CheckCircleOutlineOutlinedIcon />}
            sx={{
              height: 46,
              borderRadius: "10px",
              backgroundColor: "#D93A26",
              color: "#fff",
              fontWeight: 800,
              textTransform: "none",
              fontSize: 15,
              boxShadow: "none",

              "&:hover": {
                backgroundColor: "#B92E1D",
                boxShadow: "none",
              },
            }}
          >
            Confirm & Place Order
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default OrderSlip;