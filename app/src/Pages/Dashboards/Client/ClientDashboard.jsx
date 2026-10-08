import ClientLayout from "../../../Components/LayoutComp/ClientLayout";
import axios from "axios";
import { BASE_URL } from "../../../Utils/utility";
import endPoints from "../../../Constants/apiEndPoints";
import Cookies from "js-cookie";

import {
  Alert,
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

function ClientDashboard() {
  const [rests, setRests] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getFunc();
  }, []);

  // ------------------------------------------------------------
  // Get Approved Restaurants
  // ------------------------------------------------------------

  const getFunc = async () => {
    try {
      setLoading(true);
      setError("");

      const allRestaurants = await axios.get(
        `${BASE_URL}${endPoints.getApprovedRestaurant}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      const { data } = allRestaurants.data;

      setRests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching restaurants:", error);

      setRests([]);

      setError(
        error?.response?.data?.message ||
          "Unable to load restaurants. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------------
  // Open Restaurant
  // ------------------------------------------------------------

  const handleOpen = (restaurantId) => {
    setId(restaurantId);
    setOpen(true);
  };

  return (
    <ClientLayout>
      {open ? (
        <SingleRestaurantComponent
          openClose={setOpen}
          restId={id}
        />
      ) : (
        <Box
          sx={{
            minHeight: "100%",
            backgroundColor: tokens.surface,
            p: {
              xs: 1.5,
              sm: 2.5,
              md: 3,
            },
            fontFamily:
              '"Plus Jakarta Sans", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {/* ---------------------------------------------------- */}
          {/* Header */}
          {/* ---------------------------------------------------- */}

          <Box
            sx={{
              mb: 3,
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
              <Stack
                direction="row"
                spacing={1.2}
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2.5,
                    backgroundColor: tokens.basil,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <RestaurantOutlinedIcon />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 21,
                        sm: 26,
                      },
                      fontWeight: 800,
                      color: tokens.ink,
                      lineHeight: 1.2,
                    }}
                  >
                    Restaurants
                  </Typography>

                  <Typography
                    sx={{
                      color: tokens.muted,
                      fontSize: 13,
                      mt: 0.5,
                    }}
                  >
                    Discover approved restaurants and explore their menus.
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Chip
              icon={<RestaurantOutlinedIcon />}
              label={`${rests.length} Restaurants`}
              sx={{
                backgroundColor: "#EAF3EE",
                color: tokens.basil,
                fontWeight: 700,
                borderRadius: 2,
                height: 40,
                px: 1,
                "& .MuiChip-icon": {
                  color: tokens.basil,
                },
              }}
            />
          </Box>

          {/* ---------------------------------------------------- */}
          {/* Error */}
          {/* ---------------------------------------------------- */}

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2.5,
                borderRadius: 2,
                border: "1px solid #F0C2BC",
                backgroundColor: "#FFF5F3",
              }}
            >
              {error}
            </Alert>
          )}

          {/* ---------------------------------------------------- */}
          {/* Loading */}
          {/* ---------------------------------------------------- */}

          {loading ? (
            <Box
              sx={{
                minHeight: 360,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
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
                  fontSize: 13,
                }}
              >
                Loading restaurants...
              </Typography>
            </Box>
          ) : rests.length === 0 ? (
            /* -------------------------------------------------- */
            /* Empty State */
            /* -------------------------------------------------- */

            <Box
              sx={{
                minHeight: 360,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "#fff",
                border: `1px solid ${tokens.line}`,
                borderRadius: 3,
                p: 4,
              }}
            >
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  backgroundColor: "#EAF3EE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <RestaurantOutlinedIcon
                  sx={{
                    fontSize: 38,
                    color: tokens.basil,
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: 19,
                  fontWeight: 800,
                  color: tokens.ink,
                  mb: 0.5,
                }}
              >
                No Restaurants Available
              </Typography>

              <Typography
                sx={{
                  color: tokens.muted,
                  fontSize: 13,
                  maxWidth: 420,
                }}
              >
                There are currently no approved restaurants available.
              </Typography>
            </Box>
          ) : (
            /* -------------------------------------------------- */
            /* Restaurant Cards */
            /* -------------------------------------------------- */

            <Grid container spacing={3}>
              {rests.map((rest, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  key={rest?._id || rest?.restaurantName || index}
                >
                  <Card
                    onClick={() => handleOpen(rest?._id)}
                    sx={{
                      height: "100%",
                      cursor: "pointer",
                      borderRadius: 3,
                      backgroundColor: "#fff",
                      border: `1px solid ${tokens.line}`,
                      boxShadow: "none",
                      overflow: "hidden",
                      transition:
                        "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",

                      "&:hover": {
                        transform: "translateY(-4px)",
                        borderColor: tokens.mint,
                        boxShadow:
                          "0 10px 25px rgba(19,58,45,0.10)",
                      },
                    }}
                  >
                    {/* Restaurant Image */}

                    <CardMedia
                      component="img"
                      height="190"
                      image={
                        rest?.imageUrl ||
                        "https://via.placeholder.com/600x400?text=Restaurant"
                      }
                      alt={rest?.restaurantName || "Restaurant"}
                      sx={{
                        objectFit: "cover",
                        backgroundColor: tokens.surface,
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
                          color: tokens.ink,
                          mb: 1,
                          lineHeight: 1.3,
                        }}
                      >
                        {rest?.restaurantName || "Unnamed Restaurant"}
                      </Typography>

                      {/* Details */}

                      {rest?.details && (
                        <Typography
                          sx={{
                            color: tokens.muted,
                            fontSize: 13,
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

                        {rest?.address && (
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
                                color: tokens.chili,
                                mt: 0.1,
                                flexShrink: 0,
                              }}
                            />

                            <Typography
                              sx={{
                                fontSize: 13,
                                color: tokens.muted,
                                lineHeight: 1.5,
                              }}
                            >
                              {rest.address}
                            </Typography>
                          </Box>
                        )}

                        {/* Email */}

                        {rest?.email && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              minWidth: 0,
                            }}
                          >
                            <EmailOutlinedIcon
                              sx={{
                                fontSize: 18,
                                color: tokens.basil,
                                flexShrink: 0,
                              }}
                            />

                            <Typography
                              sx={{
                                fontSize: 13,
                                color: tokens.muted,
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
                          color: tokens.chili,
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
