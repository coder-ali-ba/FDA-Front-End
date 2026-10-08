import React, { useEffect, useState } from "react";
import ClientLayout from "../../../Components/LayoutComp/ClientLayout";
import axios from "axios";
import { BASE_URL } from "../../../Utils/utility.js";
import endPoints from "../../../Constants/apiEndPoints.js";
import Cookies from "js-cookie";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import PlaceOrder from "../../../Modals/PlaceOrder.jsx";

function ClientMenu() {
  const [approvedMenu, setApprovedMenu] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  /* -------------------------------------------------------------- */
  /* Get Approved Menu                                              */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${BASE_URL}${endPoints.approvedMenu}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      setApprovedMenu(response.data.data || []);
    } catch (error) {
      console.log("Error fetching menu:", error.message);
      setApprovedMenu([]);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------- */
  /* Place Order                                                    */
  /* -------------------------------------------------------------- */

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  return (
    <ClientLayout>
      <Box>
        {/* ------------------------------------------------------ */}
        {/* Header                                                   */}
        {/* ------------------------------------------------------ */}

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
              Our Menu
            </Typography>

            <Typography
              sx={{
                color: "#5E6763",
                fontSize: 14,
              }}
            >
              Explore delicious meals from our restaurants.
            </Typography>
          </Box>

          <Chip
            icon={<RestaurantOutlinedIcon />}
            label={`${approvedMenu.length} Items`}
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

        {/* ------------------------------------------------------ */}
        {/* Loading                                                  */}
        {/* ------------------------------------------------------ */}

        {loading ? (
          <Box
            sx={{
              minHeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              size={40}
              sx={{
                color: "#D93A26",
              }}
            />
          </Box>
        ) : approvedMenu.length === 0 ? (
          /* ---------------------------------------------------- */
          /* Empty State                                           */
          /* ---------------------------------------------------- */

          <Box
            sx={{
              minHeight: 300,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              border: "1px solid #DADFDC",
              borderRadius: "14px",
              p: 4,
              textAlign: "center",
            }}
          >
            <RestaurantOutlinedIcon
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
              No Menu Items Available
            </Typography>

            <Typography
              sx={{
                color: "#5E6763",
                fontSize: 14,
              }}
            >
              There are currently no approved menu items available.
            </Typography>
          </Box>
        ) : (
          /* ---------------------------------------------------- */
          /* Menu Grid                                              */
          /* ---------------------------------------------------- */

          <Grid container spacing={3}>
            {approvedMenu.map((menu, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                key={menu._id || index}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "14px",
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    border: "1px solid #DADFDC",
                    boxShadow: "none",

                    transition:
                      "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",

                    "&:hover": {
                      transform: "translateY(-4px)",
                      borderColor: "#9FD8BE",
                      boxShadow:
                        "0 10px 25px rgba(19,58,45,0.10)",
                    },
                  }}
                >
                  {/* ------------------------------------------------ */}
                  {/* Image                                               */}
                  {/* ------------------------------------------------ */}

                  <Box
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={menu.imageURL}
                      alt={menu.itemName || "Menu item"}
                      sx={{
                        height: 210,
                        objectFit: "cover",
                        backgroundColor: "#F5F7F6",
                        transition: "transform 0.3s ease",

                        "&:hover": {
                          transform: "scale(1.04)",
                        },
                      }}
                    />

                    {/* Price Badge */}

                    <Chip
                      icon={<AttachMoneyIcon />}
                      label={menu.itemPrice}
                      sx={{
                        position: "absolute",
                        top: 14,
                        right: 14,
                        height: 34,
                        borderRadius: "9px",
                        backgroundColor: "#133A2D",
                        color: "#fff",
                        fontWeight: 800,

                        "& .MuiChip-icon": {
                          color: "#9FD8BE",
                        },

                        "& .MuiChip-label": {
                          px: 1.3,
                        },
                      }}
                    />
                  </Box>

                  {/* ------------------------------------------------ */}
                  {/* Content                                             */}
                  {/* ------------------------------------------------ */}

                  <CardContent
                    sx={{
                      p: 2.5,
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",

                      "&:last-child": {
                        pb: 2.5,
                      },
                    }}
                  >
                    {/* Item Name */}

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: "#1B1F1D",
                        lineHeight: 1.3,
                        mb: 1,
                      }}
                    >
                      {menu.itemName}
                    </Typography>

                    {/* Description */}

                    {menu.itemDesc && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1,
                          mb: 1.8,
                        }}
                      >
                        <InfoOutlinedIcon
                          sx={{
                            fontSize: 19,
                            color: "#D93A26",
                            mt: 0.15,
                          }}
                        />

                        <Typography
                          sx={{
                            fontSize: 13.5,
                            color: "#5E6763",
                            lineHeight: 1.55,

                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {menu.itemDesc}
                        </Typography>
                      </Box>
                    )}

                    {/* Restaurant */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2.5,
                      }}
                    >
                      <RestaurantOutlinedIcon
                        sx={{
                          fontSize: 19,
                          color: "#133A2D",
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 13,
                          color: "#5E6763",
                          fontWeight: 600,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {menu.restaurantName}
                      </Typography>
                    </Box>

                    {/* Spacer */}

                    <Box sx={{ flexGrow: 1 }} />

                    {/* ------------------------------------------------ */}
                    {/* Order Button                                      */}
                    {/* ------------------------------------------------ */}

                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleOpen(menu)}
                      startIcon={<ShoppingCartOutlinedIcon />}
                      sx={{
                        height: 44,
                        borderRadius: "10px",
                        backgroundColor: "#D93A26",
                        color: "#fff",
                        fontWeight: 700,
                        textTransform: "none",
                        boxShadow: "none",

                        "&:hover": {
                          backgroundColor: "#B92E1D",
                          boxShadow: "none",
                        },
                      }}
                    >
                      Place Order
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* -------------------------------------------------------- */}
        {/* Place Order Modal                                         */}
        {/* -------------------------------------------------------- */}

        {open && selectedItem && (
          <PlaceOrder
            close={handleClose}
            item={selectedItem}
          />
        )}
      </Box>
    </ClientLayout>
  );
}

export default ClientMenu;