import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";

import { BASE_URL } from "../Utils/utility";
import endPoints from "../Constants/apiEndPoints";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";

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

export default function AddResortModal() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      restaurantName: "",
      details: "",
      contactNumber: "",
      address: "",
      email: "",
      category: "",
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (loading) return;

    setOpen(false);
    setImage(null);
    reset();
  };
const handleImageChange = (event) => {
  const selectedFile = event.target.files?.[0];

  if (selectedFile) {
    setImage(selectedFile);
  }
};

const onSubmit = async (obj) => {
  try {
    setLoading(true);

    let profileURL = "";

    // Upload restaurant image first
    if (image) {
      const api = `${BASE_URL}${endPoints.addPhoto}`;

      const formData = new FormData();
      formData.append("image", image);

      const uploadImage = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });

      console.log("IMAGE UPLOAD RESPONSE:", uploadImage.data);

      // Get Cloudinary URL
      profileURL =
        uploadImage?.data?.data?.url ||
        uploadImage?.data?.data ||
        uploadImage?.data?.url ||
        "";

      console.log("PROFILE URL:", profileURL);
    }

    // Create restaurant
    const objToSend = {
      ...obj,
      imageUrl: profileURL,
    };

    console.log("RESTAURANT DATA:", objToSend);

    const response = await axios.post(
      `${BASE_URL}${endPoints.createResEndPoint}`,
      objToSend,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );

    console.log("CREATE RESTAURANT RESPONSE:", response.data);

    alert(
      response?.data?.message || "Restaurant created successfully."
    );

    reset();
    setImage(null);
    setOpen(false);
  } catch (error) {
    console.error(
      "Restaurant creation error:",
      error?.response?.data || error
    );

    alert(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to create restaurant. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  const renderField = (
    name,
    label,
    options = {}
  ) => {
    return (
      <Controller
        name={name}
        control={control}
        rules={{
          required: `${label} is required`,
          ...options.rules,
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            required
            label={label}
            error={Boolean(errors[name])}
            helperText={errors[name]?.message}
            multiline={options.multiline || false}
            rows={options.rows || undefined}
            type={options.type || "text"}
            placeholder={options.placeholder || ""}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "#fff",

                "& fieldset": {
                  borderColor: tokens.line,
                },

                "&:hover fieldset": {
                  borderColor: "#BFC9C4",
                },

                "&.Mui-focused fieldset": {
                  borderColor: tokens.basilSoft,
                  borderWidth: "1px",
                },
              },

              "& .MuiInputLabel-root": {
                color: tokens.muted,
                fontSize: 13,
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: tokens.basilSoft,
              },

              "& .MuiFormHelperText-root": {
                fontSize: 10.5,
                marginLeft: 0,
              },
            }}
          />
        )}
      />
    );
  };

  return (
    <Box>
      {/* Open Modal Button */}
      <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<AddBusinessOutlinedIcon />}
        sx={{
          minHeight: 42,
          px: 2,
          borderRadius: "10px",
          backgroundColor: tokens.chili,
          color: "#fff",
          fontSize: 12.5,
          fontWeight: 800,
          textTransform: "none",
          boxShadow: "none",

          "&:hover": {
            backgroundColor: tokens.chiliDark,
            boxShadow: "0 6px 16px rgba(217, 58, 38, 0.18)",
          },
        }}
      >
        Create Restaurant
      </Button>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby="create-restaurant-title"
        aria-describedby="create-restaurant-description"
        slots={{
          backdrop: Backdrop,
        }}
        slotProps={{
          backdrop: {
            timeout: 300,
            sx: {
              backgroundColor: "rgba(11, 25, 18, 0.58)",
            },
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",

              width: {
                xs: "calc(100% - 24px)",
                sm: 560,
                md: 620,
              },

              maxHeight: "90vh",
              overflowY: "auto",

              backgroundColor: "#fff",
              border: `1px solid ${tokens.line}`,
              borderRadius: "18px",
              boxShadow: "0 24px 70px rgba(19, 58, 45, 0.20)",
              outline: "none",
            }}
          >
            {/* Modal Header */}
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
                    rgba(159, 216, 190, 0.16),
                    transparent 38%
                  )
                `,
                color: "#fff",
                position: "relative",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.4}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "11px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <RestaurantOutlinedIcon
                    sx={{
                      color: tokens.mint,
                      fontSize: 23,
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    id="create-restaurant-title"
                    sx={{
                      fontSize: 18,
                      fontWeight: 800,
                      lineHeight: 1.3,
                    }}
                  >
                    Create Restaurant
                  </Typography>

                  <Typography
                    id="create-restaurant-description"
                    sx={{
                      mt: 0.3,
                      color: "rgba(255,255,255,0.65)",
                      fontSize: 11.5,
                    }}
                  >
                    Add your restaurant information below.
                  </Typography>
                </Box>
              </Stack>

              <IconButton
                onClick={handleClose}
                disabled={loading}
                aria-label="close"
                sx={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  width: 34,
                  height: 34,
                  color: "rgba(255,255,255,0.75)",
                  backgroundColor: "rgba(255,255,255,0.06)",

                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "rgba(255,255,255,0.12)",
                  },
                }}
              >
                <CloseOutlinedIcon sx={{ fontSize: 19 }} />
              </IconButton>
            </Box>

            {/* Form */}
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                p: {
                  xs: 2,
                  sm: 3,
                },
              }}
            >
              <Stack spacing={2}>
                {/* Name + Category */}
                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  spacing={2}
                >
                  <Box sx={{ flex: 1 }}>
                    {renderField(
                      "restaurantName",
                      "Restaurant Name",
                      {
                        placeholder: "Enter restaurant name",
                      }
                    )}
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    {renderField(
                      "category",
                      "Category",
                      {
                        placeholder: "e.g. Fast Food",
                      }
                    )}
                  </Box>
                </Stack>

                {/* Details */}
                {renderField(
                  "details",
                  "Restaurant Details",
                  {
                    multiline: true,
                    rows: 3,
                    placeholder:
                      "Describe your restaurant...",
                  }
                )}

                {/* Contact + Email */}
                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  spacing={2}
                >
                  <Box sx={{ flex: 1 }}>
                    {renderField(
                      "contactNumber",
                      "Phone Number",
                      {
                        type: "tel",
                        placeholder: "03XXXXXXXXX",
                      }
                    )}
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    {renderField(
                      "email",
                      "Email",
                      {
                        type: "email",
                        placeholder:
                          "restaurant@example.com",
                        rules: {
                          pattern: {
                            value:
                              /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message:
                              "Enter a valid email address",
                          },
                        },
                      }
                    )}
                  </Box>
                </Stack>

                {/* Address */}
                {renderField(
                  "address",
                  "Restaurant Address",
                  {
                    multiline: true,
                    rows: 2,
                    placeholder:
                      "Enter complete restaurant address",
                  }
                )}

                {/* Image Upload */}
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    border: `1px dashed ${tokens.line}`,
                    backgroundColor: tokens.surface,
                  }}
                >
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    alignItems={{
                      xs: "flex-start",
                      sm: "center",
                    }}
                    justifyContent="space-between"
                    spacing={1.5}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: tokens.ink,
                          fontSize: 13,
                          fontWeight: 800,
                        }}
                      >
                        Restaurant Image
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.3,
                          color: tokens.muted,
                          fontSize: 11,
                        }}
                      >
                        Upload a clear image of your restaurant.
                      </Typography>

                      {image && (
                        <Typography
                          sx={{
                            mt: 0.8,
                            color: tokens.basilSoft,
                            fontSize: 11.5,
                            fontWeight: 700,
                            wordBreak: "break-word",
                          }}
                        >
                          Selected: {image.name}
                        </Typography>
                      )}
                    </Box>

                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<CloudUploadOutlinedIcon />}
                      sx={{
                        minWidth: {
                          xs: "100%",
                          sm: 145,
                        },
                        minHeight: 40,
                        borderRadius: "9px",
                        borderColor: tokens.basilSoft,
                        color: tokens.basil,
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: "none",

                        "&:hover": {
                          borderColor: tokens.basil,
                          backgroundColor: "#EAF3EE",
                        },
                      }}
                    >
                      {image ? "Change Image" : "Upload Image"}

                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Button>
                  </Stack>
                </Box>

                {/* Actions */}
                <Stack
                  direction={{
                    xs: "column-reverse",
                    sm: "row",
                  }}
                  justifyContent="flex-end"
                  spacing={1.2}
                  sx={{
                    pt: 1,
                  }}
                >
                  <Button
                    type="button"
                    onClick={handleClose}
                    disabled={loading}
                    variant="outlined"
                    sx={{
                      minHeight: 42,
                      px: 2.5,
                      borderRadius: "9px",
                      borderColor: tokens.line,
                      color: tokens.muted,
                      fontSize: 12.5,
                      fontWeight: 700,
                      textTransform: "none",

                      "&:hover": {
                        borderColor: "#BFC9C4",
                        backgroundColor: "#F8FAF9",
                      },
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={loading}
                    variant="contained"
                    startIcon={
                      loading ? (
                        <CircularProgress
                          size={17}
                          sx={{ color: "#fff" }}
                        />
                      ) : (
                        <AddBusinessOutlinedIcon />
                      )
                    }
                    sx={{
                      minHeight: 42,
                      px: 2.5,
                      borderRadius: "9px",
                      backgroundColor: tokens.chili,
                      color: "#fff",
                      fontSize: 12.5,
                      fontWeight: 800,
                      textTransform: "none",
                      boxShadow: "none",

                      "&:hover": {
                        backgroundColor: tokens.chiliDark,
                        boxShadow:
                          "0 6px 16px rgba(217, 58, 38, 0.18)",
                      },

                      "&.Mui-disabled": {
                        backgroundColor: "#D9DEDC",
                        color: "#fff",
                      },
                    }}
                  >
                    {loading
                      ? "Creating..."
                      : "Create Restaurant"}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}