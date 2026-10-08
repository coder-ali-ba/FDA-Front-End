import ClientLayout from "../../../Components/LayoutComp/ClientLayout";
import axios from "axios";
import { BASE_URL } from "../../../Utils/utility";
import endPoints from "../../../Constants/apiEndPoints";
import Cookies from "js-cookie";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import SingleRestaurantComponent from "../../../Components/singleRestaurantComponent/singleRestaurantComponent";
import { useEffect, useState } from "react";

function ClientDashboard() {
  const [rests, setRests] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFunc();
  }, []);

  /* -------------------------------------------------------------- */
  /* Get Approved Restaurants                                       */
  /* -------------------------------------------------------------- */

  const getFunc = async () => {
    try {
      setLoading(true);

      const allRestaurants = await axios.get(
        `${BASE_URL}${endPoints.getApprovedRestaurant}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      const { data } = allRestaurants.data;

      setRests(data || []);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setRests([]);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------- */
  /* Open Restaurant                                                */
  /* -------------------------------------------------------------- */

  const handleOpen = (id) => {
    setOpen(true);
    setId(id);
  };

  return (
    <ClientLayout>
      {/* -------------------------------------------------------- */}
      {/* Restaurant Details                                       */}
      {/* -------------------------------------------------------- */}

      {open ? (
        <SingleRestaurantComponent
          openClose={setOpen}
          restId={id}
        />
      ) : (
        <Box>
          {/* ---------------------------------------------------- */}
          {/* Header                                               */}
          {/* ---------------------------------------------------- */}

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
                Restaurants
              </Typography>

              <Typography
                sx={{
                  color: "#5E6763",
                  fontSize: 14,
                }}
              >
                Discover approved restaurants and explore their menus.
              </Typography>
            </Box>

            {/* Restaurant Count */}

            <Chip
              icon={<RestaurantOutlinedIcon />}
              label={`${rests.length} Restaurants`}
              sx={{
                backgroundColor: "#EAF3EE",
                color: "#133A2D",
                fontWeight: 700,
                borderRadius: "10px",
                px: 1,
                height: 40,

                "& .MuiChip-icon": {
                  color: "#133A2D",
                },
              }}
            />
          </Box>

          {/* ---------------------------------------------------- */}
          {/* Loading                                               */}
          {/* ---------------------------------------------------- */}

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
          ) : rests.length === 0 ? (
            /* -------------------------------------------------- */
            /* Empty State                                         */
            /* -------------------------------------------------- */

            <Box
              sx={{
                minHeight: 300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                border: "1px solid #DADFDC",
                borderRadius: "12px",
                p: 4,
                textAlign: "center",
              }}
            >
              <RestaurantOutlinedIcon
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
                  mb: 0.5,
                }}
              >
                No Restaurants Available
              </Typography>

              <Typography
                sx={{
                  color: "#5E6763",
                  fontSize: 14,
                }}
              >
                There are currently no approved restaurants available.
              </Typography>
            </Box>
          ) : (
            /* -------------------------------------------------- */
            /* Restaurant Cards                                    */
            /* -------------------------------------------------- */

            <Grid container spacing={3}>
              {rests.map((rest, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  key={rest._id || rest.restaurantName || index}
                >
                  <Card
                    onClick={() =>
                      handleOpen(rest.restaurantName)
                    }
                    sx={{
                      height: "100%",
                      cursor: "pointer",
                      borderRadius: "14px",
                      backgroundColor: "#fff",
                      border: "1px solid #DADFDC",
                      boxShadow: "none",
                      overflow: "hidden",

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
                    {/* Restaurant Image */}

                    <CardMedia
                      component="img"
                      height="190"
                      image={rest.imageUrl}
                      alt={rest.restaurantName || "Restaurant"}
                      sx={{
                        objectFit: "cover",
                        backgroundColor: "#F5F7F6",
                      }}
                    />

                    <CardContent
                      sx={{
                        p: 2.5,

                        "&:last-child": {
                          pb: 2.5,
                        },
                      }}
                    >
                      {/* Restaurant Name */}

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: "#1B1F1D",
                          mb: 1,
                          lineHeight: 1.3,
                        }}
                      >
                        {rest.restaurantName}
                      </Typography>

                      {/* Details */}

                      {rest.details && (
                        <Typography
                          sx={{
                            color: "#5E6763",
                            fontSize: 14,
                            lineHeight: 1.6,
                            mb: 1.5,

                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {rest.details}
                        </Typography>
                      )}

                      <Stack spacing={1}>
                        {/* Address */}

                        {rest.address && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 1,
                            }}
                          >
                            <LocationOnOutlinedIcon
                              sx={{
                                fontSize: 19,
                                color: "#D93A26",
                                mt: 0.1,
                              }}
                            />

                            <Typography
                              sx={{
                                fontSize: 13,
                                color: "#5E6763",
                                lineHeight: 1.5,
                              }}
                            >
                              {rest.address}
                            </Typography>
                          </Box>
                        )}

                        {/* Email */}

                        {rest.email && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <EmailOutlinedIcon
                              sx={{
                                fontSize: 18,
                                color: "#133A2D",
                              }}
                            />

                            <Typography
                              sx={{
                                fontSize: 13,
                                color: "#5E6763",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {rest.email}
                            </Typography>
                          </Box>
                        )}
                      </Stack>

                      {/* View Restaurant */}

                      <Typography
                        sx={{
                          mt: 2,
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#D93A26",
                        }}
                      >
                        View Restaurant →
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </ClientLayout>
  );
}

export default ClientDashboard;