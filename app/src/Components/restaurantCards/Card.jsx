import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

import axios from "axios";
import Cookies from "js-cookie";

import { BASE_URL } from "../../Utils/utility";
import endPoints from "../../Constants/apiEndPoints";
import UpdateRestaurantModal from "../../Modals/UpdateRestaurant";

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

const RestaurantCard = () => {
  const [datas, setDatas] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Get Restaurants
  // =========================
  const getRestaurants = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${BASE_URL}${endPoints.getResEndPoint}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      setDatas(response?.data?.data || []);
    } catch (error) {
      console.error("Get restaurants error:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to load restaurants. Please try again."
      );

      setDatas([]);
    } finally {
      setLoading(false);
    }
  };

  // Only run once when component mounts
  useEffect(() => {
    getRestaurants();
  }, []);

  // =========================
  // Edit Restaurant
  // =========================
  const handleEdit = (id) => {
    setIdToEdit(id);
    setOpenEdit(true);
  };

  // =========================
  // Delete Restaurant
  // =========================
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${BASE_URL}${endPoints.deleteResEndPoint}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      await getRestaurants();
    } catch (error) {
      console.error("Delete restaurant error:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to delete restaurant. Please try again."
      );
    }
  };

  // =========================
  // Approve Restaurant
  // =========================
  const handleApprove = async (id) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}${endPoints.approveResEndPoint}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      alert(
        response?.data?.message || "Restaurant status updated successfully."
      );

      await getRestaurants();
    } catch (error) {
      console.error("Approve restaurant error:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to update restaurant status."
      );
    }
  };

  // =========================
  // Loading State
  // =========================
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: tokens.surface,
          borderRadius: 3,
        }}
      >
        <Stack alignItems="center" spacing={1.5}>
          <CircularProgress
            size={32}
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
            Loading restaurants...
          </Typography>
        </Stack>
      </Box>
    );
  }

  // =========================
  // Error State
  // =========================
  if (error) {
    return (
      <Box sx={{ width: "100%" }}>
        <Alert
          severity="error"
          sx={{
            borderRadius: 2,
            border: `1px solid #F2C4BE`,
            backgroundColor: "#FFF5F3",
          }}
        >
          {error}
        </Alert>

        <Button
          startIcon={<RefreshOutlinedIcon />}
          onClick={getRestaurants}
          sx={{
            mt: 2,
            color: tokens.chili,
            fontWeight: 700,
            textTransform: "none",
          }}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        fontFamily:
          '"Plus Jakarta Sans", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* =========================
          Header
      ========================= */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
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
              <RestaurantOutlinedIcon />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: { xs: 22, sm: 26 },
                  fontWeight: 800,
                  color: tokens.ink,
                  lineHeight: 1.2,
                }}
              >
                Your Restaurants
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: tokens.muted,
                }}
              >
                Manage, edit and approve your restaurants
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1}>
          <Chip
            label={`${datas.length} ${
              datas.length === 1 ? "Restaurant" : "Restaurants"
            }`}
            sx={{
              height: 36,
              borderRadius: 2,
              backgroundColor: "#EAF3EE",
              color: tokens.basil,
              fontWeight: 800,
              border: `1px solid ${tokens.line}`,
            }}
          />

          <Tooltip title="Refresh restaurants">
            <IconButton
              onClick={getRestaurants}
              sx={{
                width: 36,
                height: 36,
                border: `1px solid ${tokens.line}`,
                backgroundColor: "#fff",
                color: tokens.basil,
                "&:hover": {
                  backgroundColor: "#EAF3EE",
                },
              }}
            >
              <RefreshOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      {/* =========================
          Empty State
      ========================= */}
      {datas.length === 0 ? (
        <Box
          sx={{
            backgroundColor: "#fff",
            border: `1px solid ${tokens.line}`,
            borderRadius: 3,
            py: 7,
            px: 3,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#EAF3EE",
              color: tokens.basil,
            }}
          >
            <RestaurantOutlinedIcon fontSize="large" />
          </Box>

          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 800,
              color: tokens.ink,
            }}
          >
            No restaurants found
          </Typography>

          <Typography
            sx={{
              mt: 0.7,
              fontSize: 14,
              color: tokens.muted,
            }}
          >
            Create your first restaurant to get started.
          </Typography>
        </Box>
      ) : (
        /* =========================
           Restaurant Grid
        ========================= */
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
            gap: 2.5,
          }}
        >
          {datas.map((data) => (
            <Card
              key={data?._id}
              sx={{
                borderRadius: 3,
                border: `1px solid ${tokens.line}`,
                backgroundColor: "#fff",
                boxShadow: "none",
                overflow: "hidden",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 30px rgba(19, 58, 45, 0.08)",
                  borderColor: "#C9D2CD",
                },
              }}
            >
              {/* =========================
                  Image
              ========================= */}
              <Box
                sx={{
                  position: "relative",
                  height: { xs: 190, sm: 200 },
                  backgroundColor: "#EAF0ED",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={data?.imageUrl || "/placeholder-restaurant.jpg"}
                  alt={data?.restaurantName || "Restaurant"}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(event) => {
                    event.currentTarget.src =
                      "/placeholder-restaurant.jpg";
                  }}
                />

                {/* Image Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.5))",
                  }}
                />

                {/* Restaurant Status */}
                <Chip
                  size="small"
                  icon={
                    data?.isOpen ? (
                      <CheckCircleIcon />
                    ) : (
                      <CancelIcon />
                    )
                  }
                  label={data?.isOpen ? "Open" : "Closed"}
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    height: 30,
                    backgroundColor: data?.isOpen
                      ? "#EAF3EE"
                      : "#FFF1EF",
                    color: data?.isOpen
                      ? tokens.basil
                      : tokens.chiliDark,
                    fontWeight: 800,
                    border: `1px solid ${
                      data?.isOpen ? "#C9E3D3" : "#F3CCC6"
                    }`,
                    "& .MuiChip-icon": {
                      color: "inherit",
                      fontSize: 17,
                    },
                  }}
                />

                {/* Action Buttons */}
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                  }}
                >
                  <Tooltip title="Edit restaurant">
                    <IconButton
                      onClick={() => handleEdit(data?._id)}
                      sx={{
                        width: 34,
                        height: 34,
                        backgroundColor: "rgba(255,255,255,0.95)",
                        color: tokens.basil,
                        "&:hover": {
                          backgroundColor: "#fff",
                          color: tokens.chili,
                        },
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete restaurant">
                    <IconButton
                      onClick={() => handleDelete(data?._id)}
                      sx={{
                        width: 34,
                        height: 34,
                        backgroundColor: "rgba(255,255,255,0.95)",
                        color: tokens.chili,
                        "&:hover": {
                          backgroundColor: "#FFF1EF",
                        },
                      }}
                    >
                      <ClearOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>

              <CardContent sx={{ p: 2.2 }}>
                {/* Restaurant Name */}
                <Typography
                  sx={{
                    fontSize: 19,
                    fontWeight: 800,
                    color: tokens.ink,
                    lineHeight: 1.3,
                    mb: 0.8,
                  }}
                >
                  {data?.restaurantName || "Unnamed Restaurant"}
                </Typography>

                {/* Category */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.7}
                  sx={{ mb: 1.2 }}
                >
                  <CategoryOutlinedIcon
                    sx={{
                      fontSize: 17,
                      color: tokens.chili,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 13,
                      color: tokens.muted,
                      fontWeight: 700,
                    }}
                  >
                    {data?.category || "General"}
                  </Typography>
                </Stack>

                {/* Description */}
                <Typography
                  sx={{
                    fontSize: 13.5,
                    color: tokens.muted,
                    lineHeight: 1.65,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: 66,
                    mb: 2,
                  }}
                >
                  {data?.details || "No restaurant description available."}
                </Typography>

                {/* Restaurant Information */}
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1} alignItems="flex-start">
                    <PhoneOutlinedIcon
                      sx={{
                        fontSize: 18,
                        color: tokens.basilSoft,
                        mt: 0.1,
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 12.5,
                        color: tokens.muted,
                        wordBreak: "break-word",
                      }}
                    >
                      {data?.contactNumber || "No contact number"}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="flex-start">
                    <EmailOutlinedIcon
                      sx={{
                        fontSize: 18,
                        color: tokens.basilSoft,
                        mt: 0.1,
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 12.5,
                        color: tokens.muted,
                        wordBreak: "break-word",
                      }}
                    >
                      {data?.email || "No email"}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="flex-start">
                    <LocationOnOutlinedIcon
                      sx={{
                        fontSize: 18,
                        color: tokens.basilSoft,
                        mt: 0.1,
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 12.5,
                        color: tokens.muted,
                        lineHeight: 1.5,
                      }}
                    >
                      {data?.address || "No address"}
                    </Typography>
                  </Stack>
                </Stack>

                {/* Status Section */}
                <Box
                  sx={{
                    mt: 2,
                    pt: 1.7,
                    borderTop: `1px solid ${tokens.line}`,
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                  >
                    {/* Open / Closed */}
                    <Chip
                      size="small"
                      icon={
                        data?.isOpen ? (
                          <CheckCircleIcon />
                        ) : (
                          <CancelIcon />
                        )
                      }
                      label={data?.isOpen ? "Open" : "Closed"}
                      onClick={() => handleApprove(data?._id)}
                      sx={{
                        backgroundColor: data?.isOpen
                          ? "#EAF3EE"
                          : "#F1F3F2",
                        color: data?.isOpen
                          ? tokens.basil
                          : tokens.muted,
                        fontWeight: 800,
                        cursor: "pointer",
                        "& .MuiChip-icon": {
                          color: "inherit",
                          fontSize: 16,
                        },
                        "&:hover": {
                          backgroundColor: data?.isOpen
                            ? "#DCEDE4"
                            : "#E7EBE9",
                        },
                      }}
                    />

                    {/* Approved / Pending */}
                    <Chip
                      size="small"
                      icon={
                        data?.isApproved ? (
                          <CheckCircleIcon />
                        ) : (
                          <CancelIcon />
                        )
                      }
                      label={
                        data?.isApproved ? "Approved" : "Pending"
                      }
                      sx={{
                        backgroundColor: data?.isApproved
                          ? "#EAF3EE"
                          : "#FFF5E6",
                        color: data?.isApproved
                          ? tokens.basil
                          : "#A86200",
                        fontWeight: 800,
                        "& .MuiChip-icon": {
                          color: "inherit",
                          fontSize: 16,
                        },
                      }}
                    />
                  </Stack>
                </Box>

                {/* Edit Button */}
                <Button
                  fullWidth
                  startIcon={<EditOutlinedIcon />}
                  onClick={() => handleEdit(data?._id)}
                  sx={{
                    mt: 2,
                    height: 42,
                    borderRadius: 1.8,
                    backgroundColor: tokens.basil,
                    color: "#fff",
                    fontWeight: 800,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: tokens.basilSoft,
                    },
                  }}
                >
                  Edit Restaurant
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* =========================
          Update Restaurant Modal
      ========================= */}
      {openEdit && (
        <UpdateRestaurantModal
          setOpenEdit={setOpenEdit}
          editId={idToEdit}
          getAll={getRestaurants}
        />
      )}
    </Box>
  );
};

export default RestaurantCard;