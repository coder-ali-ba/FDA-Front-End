import React, { useEffect, useState } from "react";
import VendorLayout from "../../../../Components/LayoutComp/VendorLayout";
import axios from "axios";
import { BASE_URL } from "../../../../Utils/utility";
import endPoints from "../../../../Constants/apiEndPoints";
import Cookies from "js-cookie";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

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

function VendorDashboard() {
  const [datas, setDatas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyDATAS();
  }, []);

  const getMyDATAS = async () => {
    try {
      setLoading(true);
      setError("");

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
    } catch (error) {
      console.error("Error fetching vendor data:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to load vendor information."
      );
    } finally {
      setLoading(false);
    }
  };

  const vendorName = datas?.name || "Vendor";
  const vendorEmail = datas?.email || "Not available";
  const vendorType = datas?.type || "Vendor";
  const vendorPhone = datas?.phNumber || "Not available";

  return (
    <VendorLayout>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1400,
          mx: "auto",
        }}
      >
        {/* Page Header */}
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
              Welcome, {vendorName}
            </Typography>

            <Typography
              sx={{
                mt: 0.7,
                color: tokens.muted,
                fontSize: 13.5,
                lineHeight: 1.6,
              }}
            >
              Manage your restaurant, menu and orders from your vendor
              dashboard.
            </Typography>
          </Box>

          <Chip
            icon={
              <CheckCircleOutlineOutlinedIcon
                sx={{
                  fontSize: "17px !important",
                }}
              />
            }
            label="Vendor Account"
            sx={{
              height: 34,
              borderRadius: "9px",
              backgroundColor: "#EAF3EE",
              color: tokens.basil,
              fontSize: 12,
              fontWeight: 700,

              "& .MuiChip-icon": {
                color: tokens.basilSoft,
              },
            }}
          />
        </Box>

        {/* Error State */}
        {error && (
          <Card
            sx={{
              mb: 3,
              borderRadius: "14px",
              border: "1px solid #F2C5BE",
              backgroundColor: "#FFF7F5",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  color: tokens.chiliDark,
                  fontSize: 13.5,
                  fontWeight: 600,
                }}
              >
                {error}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Loading */}
        {loading ? (
          <Box
            sx={{
              minHeight: 350,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
                Loading vendor dashboard...
              </Typography>
            </Stack>
          </Box>
        ) : (
          <>
            {/* Statistics */}
            <Grid
              container
              spacing={2}
              sx={{ mb: 3 }}
            >
              {/* Vendor Type */}
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: "14px",
                    border: `1px solid ${tokens.line}`,
                    backgroundColor: "#fff",
                    boxShadow: "none",
                    transition: "all 0.2s ease",

                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow:
                        "0 10px 25px rgba(19, 58, 45, 0.07)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.2 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1.5}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: "11px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#EAF3EE",
                          color: tokens.basil,
                        }}
                      >
                        <StoreOutlinedIcon />
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            color: tokens.muted,
                            fontSize: 11.5,
                            fontWeight: 600,
                            mb: 0.3,
                          }}
                        >
                          Account Type
                        </Typography>

                        <Typography
                          sx={{
                            color: tokens.ink,
                            fontSize: 16,
                            fontWeight: 800,
                          }}
                        >
                          {vendorType}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* Contact */}
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: "14px",
                    border: `1px solid ${tokens.line}`,
                    backgroundColor: "#fff",
                    boxShadow: "none",
                    transition: "all 0.2s ease",

                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow:
                        "0 10px 25px rgba(19, 58, 45, 0.07)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.2 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1.5}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: "11px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#FFF0ED",
                          color: tokens.chili,
                        }}
                      >
                        <PhoneOutlinedIcon />
                      </Box>

                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{
                            color: tokens.muted,
                            fontSize: 11.5,
                            fontWeight: 600,
                            mb: 0.3,
                          }}
                        >
                          Phone Number
                        </Typography>

                        <Typography
                          noWrap
                          sx={{
                            color: tokens.ink,
                            fontSize: 15,
                            fontWeight: 800,
                          }}
                        >
                          {vendorPhone}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* Dashboard Status */}
              <Grid
                size={{
                  xs: 12,
                  sm: 12,
                  md: 4,
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: "14px",
                    border: `1px solid ${tokens.line}`,
                    backgroundColor: "#fff",
                    boxShadow: "none",
                    transition: "all 0.2s ease",

                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow:
                        "0 10px 25px rgba(19, 58, 45, 0.07)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.2 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1.5}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: "11px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#F0F2F1",
                          color: tokens.basil,
                        }}
                      >
                        <DashboardOutlinedIcon />
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            color: tokens.muted,
                            fontSize: 11.5,
                            fontWeight: 600,
                            mb: 0.3,
                          }}
                        >
                          Dashboard
                        </Typography>

                        <Typography
                          sx={{
                            color: tokens.ink,
                            fontSize: 16,
                            fontWeight: 800,
                          }}
                        >
                          Active
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Vendor Profile */}
            <Card
              sx={{
                borderRadius: "16px",
                border: `1px solid ${tokens.line}`,
                backgroundColor: "#fff",
                boxShadow: "none",
                overflow: "hidden",
              }}
            >
              {/* Card Header */}
              <Box
                sx={{
                  px: {
                    xs: 2,
                    sm: 3,
                  },
                  py: 2.2,
                  backgroundColor: tokens.basil,
                  backgroundImage: `
                    radial-gradient(
                      circle at top right,
                      rgba(159, 216, 190, 0.14),
                      transparent 38%
                    )
                  `,
                  color: "#fff",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                >
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      backgroundColor: tokens.chili,
                      fontSize: 17,
                      fontWeight: 800,
                    }}
                  >
                    {vendorName?.charAt(0)?.toUpperCase() || "V"}
                  </Avatar>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 17,
                        fontWeight: 800,
                        lineHeight: 1.3,
                      }}
                    >
                      Vendor Information
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.3,
                        color: "rgba(255,255,255,0.65)",
                        fontSize: 11.5,
                      }}
                    >
                      Your registered account details
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Profile Details */}
              <CardContent
                sx={{
                  p: {
                    xs: 2,
                    sm: 3,
                  },
                }}
              >
                <Grid
                  container
                  spacing={2}
                >
                  {/* Name */}
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: "11px",
                        backgroundColor: tokens.surface,
                        border: `1px solid ${tokens.line}`,
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1.3}
                        alignItems="center"
                      >
                        <PersonOutlineOutlinedIcon
                          sx={{
                            color: tokens.basilSoft,
                            fontSize: 21,
                          }}
                        />

                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              color: tokens.muted,
                              fontSize: 11,
                              fontWeight: 600,
                              mb: 0.4,
                            }}
                          >
                            Name
                          </Typography>

                          <Typography
                            sx={{
                              color: tokens.ink,
                              fontSize: 14,
                              fontWeight: 700,
                              wordBreak: "break-word",
                            }}
                          >
                            {vendorName}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>

                  {/* Email */}
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: "11px",
                        backgroundColor: tokens.surface,
                        border: `1px solid ${tokens.line}`,
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1.3}
                        alignItems="center"
                      >
                        <EmailOutlinedIcon
                          sx={{
                            color: tokens.basilSoft,
                            fontSize: 21,
                          }}
                        />

                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              color: tokens.muted,
                              fontSize: 11,
                              fontWeight: 600,
                              mb: 0.4,
                            }}
                          >
                            Email
                          </Typography>

                          <Typography
                            sx={{
                              color: tokens.ink,
                              fontSize: 14,
                              fontWeight: 700,
                              wordBreak: "break-word",
                            }}
                          >
                            {vendorEmail}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>

                  {/* Type */}
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: "11px",
                        backgroundColor: tokens.surface,
                        border: `1px solid ${tokens.line}`,
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1.3}
                        alignItems="center"
                      >
                        <StoreOutlinedIcon
                          sx={{
                            color: tokens.basilSoft,
                            fontSize: 21,
                          }}
                        />

                        <Box>
                          <Typography
                            sx={{
                              color: tokens.muted,
                              fontSize: 11,
                              fontWeight: 600,
                              mb: 0.4,
                            }}
                          >
                            Vendor Type
                          </Typography>

                          <Chip
                            label={vendorType}
                            size="small"
                            sx={{
                              height: 25,
                              borderRadius: "7px",
                              backgroundColor: "#EAF3EE",
                              color: tokens.basil,
                              fontSize: 11,
                              fontWeight: 800,
                            }}
                          />
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>

                  {/* Phone */}
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: "11px",
                        backgroundColor: tokens.surface,
                        border: `1px solid ${tokens.line}`,
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1.3}
                        alignItems="center"
                      >
                        <PhoneOutlinedIcon
                          sx={{
                            color: tokens.basilSoft,
                            fontSize: 21,
                          }}
                        />

                        <Box>
                          <Typography
                            sx={{
                              color: tokens.muted,
                              fontSize: 11,
                              fontWeight: 600,
                              mb: 0.4,
                            }}
                          >
                            Phone
                          </Typography>

                          <Typography
                            sx={{
                              color: tokens.ink,
                              fontSize: 14,
                              fontWeight: 700,
                            }}
                          >
                            {vendorPhone}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>

                <Divider
                  sx={{
                    my: 2.5,
                    borderColor: tokens.line,
                  }}
                />

                <Box
                  sx={{
                    p: 2,
                    borderRadius: "11px",
                    backgroundColor: "#F8FAF9",
                    border: `1px solid ${tokens.line}`,
                  }}
                >
                  <Typography
                    sx={{
                      color: tokens.ink,
                      fontSize: 13,
                      fontWeight: 700,
                      mb: 0.5,
                    }}
                  >
                    Vendor Dashboard
                  </Typography>

                  <Typography
                    sx={{
                      color: tokens.muted,
                      fontSize: 12.5,
                      lineHeight: 1.7,
                    }}
                  >
                    Use the navigation menu to manage your restaurant,
                    update menu items, and review customer orders.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </>
        )}
      </Box>
    </VendorLayout>
  );
}

export default VendorDashboard;