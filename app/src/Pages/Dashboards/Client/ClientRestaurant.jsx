
import React, { useEffect, useState } from "react";
import ClientLayout from "../../../Components/LayoutComp/ClientLayout";
import endPoints from "../../../Constants/apiEndPoints.js";
import { BASE_URL } from "../../../Utils/utility.js";
import axios from "axios";
import Cookies from "js-cookie";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import {
  EmailOutlined,
  LocationOnOutlined,
  RestaurantOutlined,
  InfoOutlined,
} from "@mui/icons-material";

function ClientRestaurant() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getAllRestaurants();
  }, []);

  const getAllRestaurants = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}${endPoints.getAdminEndPoint}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      setDatas(response.data.data || []);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ClientLayout>
      <Box>
        {/* ------------------------------------------------------ */}
        {/* Page Header                                             */}
        {/* ------------------------------------------------------ */}

        <Box
          sx={{
            mb: 4,
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
              All Restaurants
            </Typography>

            <Typography
              sx={{
                color: "#5E6763",
                fontSize: 14,
              }}
            >
              Explore restaurants and discover your favorite places.
            </Typography>
          </Box>

          {/* Restaurant Count */}

          <Chip
            icon={<RestaurantOutlined />}
            label={`${datas.length} Restaurants`}
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
        {/* Restaurant Cards                                        */}
        {/* ------------------------------------------------------ */}

        {datas.length === 0 ? (
          <Box
            sx={{
              minHeight: 280,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              border: "1px solid #DADFDC",
              borderRadius: "14px",
              textAlign: "center",
              p: 4,
            }}
          >
            <RestaurantOutlined
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
              No Restaurants Found
            </Typography>

            <Typography
              sx={{
                color: "#5E6763",
                fontSize: 14,
              }}
            >
              There are currently no restaurants available.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {datas.map((data, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                key={data._id || index}
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
                  {/* Restaurant Image                                   */}
                  {/* ------------------------------------------------ */}

                  <Box
                    sx={{
                      position: "relative",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={data.imageUrl}
                      alt={data.restaurantName || "Restaurant"}
                      sx={{
                        height: 200,
                        objectFit: "cover",
                        backgroundColor: "#F5F7F6",
                      }}
                    />

                    {/* Open / Closed Badge */}

                    <Chip
                      label={
                        data.isOpen ? "Open Now" : "Closed"
                      }
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 14,
                        right: 14,
                        height: 30,
                        borderRadius: "8px",
                        fontWeight: 700,

                        backgroundColor: data.isOpen
                          ? "#133A2D"
                          : "#D93A26",

                        color: "#fff",

                        "& .MuiChip-label": {
                          px: 1.3,
                        },
                      }}
                    />
                  </Box>

                  {/* ------------------------------------------------ */}
                  {/* Card Content                                       */}
                  {/* ------------------------------------------------ */}

                  <CardContent
                    sx={{
                      p: 2.5,
                      flexGrow: 1,

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
                        lineHeight: 1.3,
                        mb: 0.8,
                      }}
                    >
                      {data.restaurantName}
                    </Typography>

                    {/* Category */}

                    {data.category && (
                      <Chip
                        label={data.category}
                        size="small"
                        sx={{
                          mb: 1.8,
                          height: 28,
                          borderRadius: "7px",
                          backgroundColor: "#F5F7F6",
                          color: "#133A2D",
                          border: "1px solid #DADFDC",
                          fontWeight: 600,
                        }}
                      />
                    )}

                    {/* Details */}

                    {data.details && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1,
                          mb: 1.5,
                        }}
                      >
                        <InfoOutlined
                          sx={{
                            fontSize: 19,
                            color: "#D93A26",
                            mt: 0.2,
                          }}
                        />

                        <Typography
                          sx={{
                            fontSize: 13.5,
                            color: "#5E6763",
                            lineHeight: 1.55,

                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {data.details}
                        </Typography>
                      </Box>
                    )}

                    <Stack spacing={1.2}>
                      {/* Email */}

                      {data.email && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <EmailOutlined
                            sx={{
                              fontSize: 19,
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
                            {data.email}
                          </Typography>
                        </Box>
                      )}

                      {/* Location */}

                      {data.address && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1,
                          }}
                        >
                          <LocationOnOutlined
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
                            {data.address}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </CardContent>

                  {/* ------------------------------------------------ */}
                  {/* Bottom Status Area                                 */}
                  {/* ------------------------------------------------ */}

                  <Box
                    sx={{
                      px: 2.5,
                      pb: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        pt: 1.8,
                        borderTop: "1px solid #DADFDC",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "#5E6763",
                        }}
                      >
                        Restaurant status
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: data.isOpen
                            ? "#133A2D"
                            : "#D93A26",
                        }}
                      >
                        {data.isOpen ? "Open Now" : "Closed"}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </ClientLayout>
  );
}

export default ClientRestaurant;
