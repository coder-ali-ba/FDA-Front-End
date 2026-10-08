
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Stack,
  TextField,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";

import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";

import { BASE_URL } from "../Utils/utility";
import endPoints from "../Constants/apiEndPoints";

const tokens = {
  ink: "#1B1F1D",
  muted: "#5E6763",
  line: "#DADFDC",
  surface: "#F5F7F6",
  chili: "#D93A26",
  chiliDark: "#B92E1D",
  basil: "#133A2D",
  basilSoft: "#1D5A45",
};

export default function UpdateRestaurantModal({
  setOpenEdit,
  editId,
  getAll,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      restaurantName: "",
      details: "",
      contactNumber: "",
      address: "",
      email: "",
      category: "",
    },
  });

  // ==========================================
  // Close Modal
  // ==========================================
  const handleClose = () => {
    if (loading) return;

    setError("");
    reset();
    setOpenEdit(false);
  };

  // ==========================================
  // Update Restaurant
  // ==========================================
  const onSubmit = async (obj) => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.put(
        `${BASE_URL}${endPoints.editResEndPoint}/${editId}`,
        obj,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      console.log("Update restaurant response:", response.data);

      reset();
      setOpenEdit(false);

      // Refresh restaurant list
      if (getAll) {
        await getAll();
      }
    } catch (error) {
      console.error(
        "Update restaurant error:",
        error?.response?.data || error
      );

      setError(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Unable to update restaurant. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="update-restaurant-title"
      aria-describedby="update-restaurant-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",

          width: {
            xs: "calc(100% - 28px)",
            sm: 560,
          },

          maxHeight: "90vh",
          overflowY: "auto",

          backgroundColor: "#fff",
          borderRadius: 3,
          border: `1px solid ${tokens.line}`,

          boxShadow:
            "0 24px 70px rgba(19, 58, 45, 0.18)",

          outline: "none",

          "&::-webkit-scrollbar": {
            width: 6,
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#C8D1CC",
            borderRadius: 10,
          },
        }}
      >
        {/* ==========================================
            HEADER
        ========================================== */}
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            py: 2,
            backgroundColor: tokens.basil,
            color: "#fff",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1.2}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.12)",
                }}
              >
                <RestaurantOutlinedIcon />
              </Box>

              <Box>
                <Typography
                  id="update-restaurant-title"
                  sx={{
                    fontSize: 19,
                    fontWeight: 800,
                    lineHeight: 1.2,
                  }}
                >
                  Update Restaurant
                </Typography>

                <Typography
                  id="update-restaurant-description"
                  sx={{
                    mt: 0.4,
                    fontSize: 12,
                    color: "rgba(255,255,255,0.72)",
                  }}
                >
                  Update your restaurant information
                </Typography>
              </Box>
            </Stack>

            <IconButton
              onClick={handleClose}
              disabled={loading}
              sx={{
                color: "#fff",
                width: 38,
                height: 38,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <HighlightOffIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* ==========================================
            FORM
        ========================================== */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            p: { xs: 2, sm: 3 },
          }}
        >
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                borderRadius: 2,
                border: "1px solid #F2C4BE",
                backgroundColor: "#FFF5F3",
              }}
            >
              {error}
            </Alert>
          )}

          <Stack spacing={2}>
            {/* Restaurant Name */}
            <Controller
              control={control}
              name="restaurantName"
              rules={{
                required: "Restaurant name is required",
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  label="Restaurant Name"
                  placeholder="Enter restaurant name"
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  disabled={loading}
                  sx={fieldStyle}
                />
              )}
            />

            {/* Details */}
            <Controller
              control={control}
              name="details"
              rules={{
                required: "Restaurant details are required",
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  multiline
                  rows={4}
                  label="Details"
                  placeholder="Enter restaurant description"
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  disabled={loading}
                  sx={fieldStyle}
                />
              )}
            />

            {/* Contact Number */}
            <Controller
              control={control}
              name="contactNumber"
              rules={{
                required: "Contact number is required",
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  label="Contact Number"
                  placeholder="Enter contact number"
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  disabled={loading}
                  sx={fieldStyle}
                />
              )}
            />

            {/* Address */}
            <Controller
              control={control}
              name="address"
              rules={{
                required: "Address is required",
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  label="Address"
                  placeholder="Enter restaurant address"
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  disabled={loading}
                  sx={fieldStyle}
                />
              )}
            />

            {/* Email */}
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  type="email"
                  label="Email"
                  placeholder="restaurant@example.com"
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  disabled={loading}
                  sx={fieldStyle}
                />
              )}
            />

            {/* Category */}
            <Controller
              control={control}
              name="category"
              rules={{
                required: "Category is required",
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  label="Category"
                  placeholder="e.g. Northern, Fast Food"
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  disabled={loading}
                  sx={fieldStyle}
                />
              )}
            />
          </Stack>

          {/* ==========================================
              ACTIONS
          ========================================== */}
          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            justifyContent="flex-end"
            spacing={1.2}
            sx={{ mt: 3 }}
          >
            <Button
              type="button"
              onClick={handleClose}
              disabled={loading}
              sx={{
                minWidth: 110,
                height: 42,
                borderRadius: 1.8,
                color: tokens.muted,
                border: `1px solid ${tokens.line}`,
                fontWeight: 700,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: tokens.surface,
                },
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress
                    size={17}
                    sx={{ color: "#fff" }}
                  />
                ) : null
              }
              sx={{
                minWidth: 160,
                height: 42,
                borderRadius: 1.8,
                backgroundColor: tokens.chili,
                color: "#fff",
                fontWeight: 800,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: tokens.chiliDark,
                  boxShadow: "none",
                },
              }}
            >
              {loading ? "Updating..." : "Update Restaurant"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}

// ==========================================
// TextField Styling
// ==========================================
const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 1.8,
    backgroundColor: "#fff",

    "& fieldset": {
      borderColor: tokens.line,
    },

    "&:hover fieldset": {
      borderColor: "#B8C3BD",
    },

    "&.Mui-focused fieldset": {
      borderColor: tokens.basil,
      borderWidth: 1.5,
    },
  },

  "& .MuiInputLabel-root": {
    color: tokens.muted,
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: tokens.basil,
  },
};

{/* <Modal open={open}>

<Modal open={true}>

{openEdit && (
  <UpdateRestaurantModal
    setOpenEdit={setOpenEdit}
    editId={idToEdit}
    getAll={getRestaurants}
  />
)} */}
