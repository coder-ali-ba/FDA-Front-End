import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
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
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

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

export default function MenuModal({ Close }) {
  const [open, setOpen] = useState(true);
  const [names, setNames] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [namesLoading, setNamesLoading] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemName: "",
      restaurantName: "",
      itemPrice: "",
      itemDesc: "",
    },
  });

  /*
   * Get restaurant names
   */
  useEffect(() => {
    getNames();
  }, []);

  const getNames = async () => {
    try {
      setNamesLoading(true);

      const response = await axios.get(
        `${BASE_URL}${endPoints.getAllNames}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      setNames(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching restaurants:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to load restaurants."
      );
    } finally {
      setNamesLoading(false);
    }
  };

  /*
   * Close modal
   */
  const handleClose = () => {
    if (loading) return;

    setOpen(false);
    setImage(null);
    reset();

    if (Close) {
      Close();
    }
  };

  /*
   * Image selection
   */
  const handleImageChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setImage(selectedFile);
    }
  };

  /*
   * Create menu
   */
  const submitHandler = async (obj) => {
    try {
      setLoading(true);

      let profileURL = null;

      /*
       * Upload image
       */
      if (image) {
        const api = `${BASE_URL}${endPoints.addPhoto}`;

        const formData = new FormData();
        formData.append("image", image);

        const uploadImage = await axios.post(
          api,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${Cookies.get(
                "authToken"
              )}`,
            },
          }
        );

        /*
         * Your original API returned:
         * uploadImage.data.data
         */
        profileURL =
          uploadImage?.data?.data ||
          uploadImage?.data?.url ||
          null;
      }

      /*
       * Object sent to menu API
       */
      const objToSend = {
        ...obj,
        imageURL: profileURL,
      };

      const response = await axios.post(
        `${BASE_URL}${endPoints.addmenuEndpoint}`,
        objToSend,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get(
              "authToken"
            )}`,
          },
        }
      );

      alert(
        response?.data?.message ||
          "Menu created successfully."
      );

      reset();
      setImage(null);

      handleClose();
    } catch (error) {
      console.error("Menu creation error:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to create menu. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      aria-labelledby="create-menu-title"
      aria-describedby="create-menu-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
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
              sm: 540,
              md: 600,
            },

            maxHeight: "90vh",
            overflowY: "auto",

            backgroundColor: "#fff",
            border: `1px solid ${tokens.line}`,
            borderRadius: "18px",
            boxShadow:
              "0 24px 70px rgba(19, 58, 45, 0.20)",
            outline: "none",
          }}
        >
          {/* Header */}
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
                  backgroundColor:
                    "rgba(255,255,255,0.10)",
                  border:
                    "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <RestaurantMenuOutlinedIcon
                  sx={{
                    color: tokens.mint,
                    fontSize: 23,
                  }}
                />
              </Box>

              <Box>
                <Typography
                  id="create-menu-title"
                  sx={{
                    fontSize: 18,
                    fontWeight: 800,
                    lineHeight: 1.3,
                  }}
                >
                  Create Menu Item
                </Typography>

                <Typography
                  id="create-menu-description"
                  sx={{
                    mt: 0.3,
                    color: "rgba(255,255,255,0.65)",
                    fontSize: 11.5,
                  }}
                >
                  Add a new item to your restaurant menu.
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
                backgroundColor:
                  "rgba(255,255,255,0.06)",

                "&:hover": {
                  color: "#fff",
                  backgroundColor:
                    "rgba(255,255,255,0.12)",
                },
              }}
            >
              <CloseOutlinedIcon
                sx={{ fontSize: 19 }}
              />
            </IconButton>
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit(submitHandler)}
            sx={{
              p: {
                xs: 2,
                sm: 3,
              },
            }}
          >
            <Stack spacing={2}>
              {/* Item Name */}
              <Controller
                control={control}
                name="itemName"
                rules={{
                  required: "Item name is required",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    label="Item Name"
                    placeholder="e.g. Chicken Burger"
                    error={Boolean(errors.itemName)}
                    helperText={
                      errors.itemName?.message
                    }
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
                          borderColor:
                            tokens.basilSoft,
                          borderWidth: "1px",
                        },
                      },

                      "& .MuiInputLabel-root": {
                        color: tokens.muted,
                        fontSize: 13,
                      },

                      "& .MuiInputLabel-root.Mui-focused":
                        {
                          color: tokens.basilSoft,
                        },
                    }}
                  />
                )}
              />

              {/* Restaurant */}
              <Controller
                name="restaurantName"
                control={control}
                rules={{
                  required:
                    "Restaurant name is required",
                }}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    required
                    size="small"
                    error={Boolean(
                      errors.restaurantName
                    )}
                  >
                    <InputLabel>
                      Restaurant Name
                    </InputLabel>

                    <Select
                      {...field}
                      label="Restaurant Name"
                      sx={{
                        borderRadius: "10px",
                        backgroundColor: "#fff",

                        "& .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: tokens.line,
                          },

                        "&:hover .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#BFC9C4",
                          },

                        "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor:
                              tokens.basilSoft,
                          },
                      }}
                    >
                      {namesLoading ? (
                        <MenuItem disabled>
                          Loading restaurants...
                        </MenuItem>
                      ) : names.length === 0 ? (
                        <MenuItem disabled>
                          No restaurants found
                        </MenuItem>
                      ) : (
                        names.map((name, index) => (
                          <MenuItem
                            key={
                              name?._id || index
                            }
                            value={
                              name?.restaurantName
                            }
                          >
                            {name?.restaurantName}
                          </MenuItem>
                        ))
                      )}
                    </Select>

                    {errors.restaurantName && (
                      <Typography
                        sx={{
                          mt: 0.5,
                          ml: 1.5,
                          color: "#D32F2F",
                          fontSize: 10.5,
                        }}
                      >
                        {
                          errors.restaurantName
                            .message
                        }
                      </Typography>
                    )}
                  </FormControl>
                )}
              />

              {/* Price */}
              <Controller
                control={control}
                name="itemPrice"
                rules={{
                  required: "Item price is required",
                  validate: (value) => {
                    const price = Number(value);

                    if (Number.isNaN(price)) {
                      return "Enter a valid price";
                    }

                    if (price < 0) {
                      return "Price cannot be negative";
                    }

                    return true;
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    type="number"
                    label="Item Price"
                    placeholder="e.g. 500"
                    error={Boolean(errors.itemPrice)}
                    helperText={
                      errors.itemPrice?.message
                    }
                    size="small"
                    slotProps={{
                      htmlInput: {
                        min: 0,
                      },
                    }}
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
                          borderColor:
                            tokens.basilSoft,
                          borderWidth: "1px",
                        },
                      },

                      "& .MuiInputLabel-root": {
                        color: tokens.muted,
                        fontSize: 13,
                      },

                      "& .MuiInputLabel-root.Mui-focused":
                        {
                          color: tokens.basilSoft,
                        },
                    }}
                  />
                )}
              />

              {/* Description */}
              <Controller
                control={control}
                name="itemDesc"
                rules={{
                  required:
                    "Item description is required",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    label="Item Description"
                    placeholder="Describe this menu item..."
                    multiline
                    rows={3}
                    error={Boolean(errors.itemDesc)}
                    helperText={
                      errors.itemDesc?.message
                    }
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
                          borderColor:
                            tokens.basilSoft,
                          borderWidth: "1px",
                        },
                      },

                      "& .MuiInputLabel-root": {
                        color: tokens.muted,
                        fontSize: 13,
                      },

                      "& .MuiInputLabel-root.Mui-focused":
                        {
                          color: tokens.basilSoft,
                        },
                    }}
                  />
                )}
              />

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
                      Menu Item Image
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.3,
                        color: tokens.muted,
                        fontSize: 11,
                      }}
                    >
                      Upload a clear image of the
                      menu item.
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
                    startIcon={
                      <CloudUploadOutlinedIcon />
                    }
                    sx={{
                      minWidth: {
                        xs: "100%",
                        sm: 145,
                      },
                      minHeight: 40,
                      borderRadius: "9px",
                      borderColor:
                        tokens.basilSoft,
                      color: tokens.basil,
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "none",

                      "&:hover": {
                        borderColor: tokens.basil,
                        backgroundColor:
                          "#EAF3EE",
                      },
                    }}
                  >
                    {image
                      ? "Change Image"
                      : "Upload Image"}

                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={
                        handleImageChange
                      }
                    />
                  </Button>
                </Stack>
              </Box>

              {/* Buttons */}
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
                        sx={{
                          color: "#fff",
                        }}
                      />
                    ) : (
                      <AddCircleOutlineOutlinedIcon />
                    )
                  }
                  sx={{
                    minHeight: 42,
                    px: 2.5,
                    borderRadius: "9px",
                    backgroundColor:
                      tokens.chili,
                    color: "#fff",
                    fontSize: 12.5,
                    fontWeight: 800,
                    textTransform: "none",
                    boxShadow: "none",

                    "&:hover": {
                      backgroundColor:
                        tokens.chiliDark,
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
                    : "Create Menu"}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
