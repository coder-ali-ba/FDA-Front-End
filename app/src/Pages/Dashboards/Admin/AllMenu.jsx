import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Components/LayoutComp/AdminLayout";
import axios from "axios";
import { BASE_URL } from "../../../Utils/utility.js";
import endPoints from "../../../Constants/apiEndPoints.js";
import Cookies from "js-cookie";

import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";


// ==========================================
// Theme Tokens
// ==========================================
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


// ==========================================
// All Menu
// ==========================================
function AllMenu() {
  const [menus, setMenus] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [actionLoading, setActionLoading] = useState(null);


  // ==========================================
  // Get All Menus
  // ==========================================
  const getAllMenues = async (isRefresh = false) => {
    try {
      setError("");

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await axios.get(
        `${BASE_URL}${endPoints.adminMenues}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      const menuData = response?.data?.data;

      setMenus(Array.isArray(menuData) ? menuData : []);
    } catch (error) {
      console.error("GET ALL MENUS ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to load menus. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  // ==========================================
  // Initial Load
  // ==========================================
  useEffect(() => {
    getAllMenues();
  }, []);


  // ==========================================
  // Delete Menu
  // ==========================================
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);
      setError("");

      await axios.delete(
        `${BASE_URL}${endPoints.deleteMenu}/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      setDeleteDialog(false);
      setDeleteId(null);

      await getAllMenues(true);
    } catch (error) {
      console.error("DELETE MENU ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to delete menu. Please try again."
      );
    } finally {
      setDeleteLoading(false);
    }
  };


  // ==========================================
  // Activate / Deactivate Menu
  // ==========================================
  const handleActive = async (id) => {
    try {
      setActionLoading(id);
      setError("");

      await axios.patch(
        `${BASE_URL}${endPoints.menuActivate}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      await getAllMenues(true);
    } catch (error) {
      console.error("UPDATE MENU STATUS ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to change menu status."
      );
    } finally {
      setActionLoading(null);
    }
  };


  // ==========================================
  // Loading State
  // ==========================================
  if (loading) {
    return (
      <AdminLayout>
        <Box
          sx={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack spacing={2} alignItems="center">
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
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Loading menus...
            </Typography>
          </Stack>
        </Box>
      </AdminLayout>
    );
  }


  return (
    <AdminLayout>
      <Box
        sx={{
          width: "100%",
          fontFamily:
            '"Plus Jakarta Sans", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        }}
      >

        {/* ==========================================
            Header
        ========================================== */}
        <Box
          sx={{
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
            mb: 3,
          }}
        >
          <Box>
            <Stack
              direction="row"
              spacing={1.2}
              alignItems="center"
              sx={{ mb: 0.7 }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  backgroundColor: "#EAF3EE",
                  color: tokens.basil,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FastfoodOutlinedIcon />
              </Box>

              <Typography
                sx={{
                  fontSize: {
                    xs: 23,
                    md: 28,
                  },
                  fontWeight: 800,
                  color: tokens.ink,
                  letterSpacing: "-0.5px",
                }}
              >
                All Menus
              </Typography>
            </Stack>

            <Typography
              sx={{
                color: tokens.muted,
                fontSize: 14,
              }}
            >
              Manage all food items, prices, restaurants and menu status.
            </Typography>
          </Box>


          {/* Refresh */}
          <Button
            onClick={() => getAllMenues(true)}
            disabled={refreshing}
            startIcon={
              refreshing ? (
                <CircularProgress
                  size={17}
                  sx={{
                    color: "inherit",
                  }}
                />
              ) : (
                <RefreshOutlinedIcon />
              )
            }
            sx={{
              minWidth: 125,
              height: 42,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              color: "#fff",
              backgroundColor: tokens.chili,
              "&:hover": {
                backgroundColor: tokens.chiliDark,
              },
            }}
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </Box>


        {/* ==========================================
            Error Alert
        ========================================== */}
        {error && (
          <Alert
            severity="error"
            onClose={() => setError("")}
            sx={{
              mb: 3,
              borderRadius: "12px",
              border: "1px solid #F0C2BC",
              backgroundColor: "#FFF6F4",
              color: tokens.ink,
            }}
          >
            {error}
          </Alert>
        )}


        {/* ==========================================
            Summary Cards
        ========================================== */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, 1fr)",
            },
            gap: 2,
            mb: 3,
          }}
        >
          <SummaryCard
            icon={<FastfoodOutlinedIcon />}
            title="Total Menus"
            value={menus.length}
            iconBg="#EAF3EE"
            iconColor={tokens.basil}
          />

          <SummaryCard
            icon={<CheckCircleOutlineIcon />}
            title="Active Menus"
            value={
              menus.filter(
                (menu) => !menu?.isApproved
              ).length
            }
            iconBg="#EAF3EE"
            iconColor={tokens.basilSoft}
          />

          <SummaryCard
            icon={<CancelOutlinedIcon />}
            title="Inactive Menus"
            value={
              menus.filter(
                (menu) => menu?.isApproved
              ).length
            }
            iconBg="#FFF1EE"
            iconColor={tokens.chili}
          />
        </Box>


        {/* ==========================================
            Menu Section Header
        ========================================== */}
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 800,
                color: tokens.ink,
              }}
            >
              Menu Items
            </Typography>

            <Typography
              sx={{
                mt: 0.3,
                color: tokens.muted,
                fontSize: 13,
              }}
            >
              Browse and manage all food items.
            </Typography>
          </Box>

          <Chip
            label={`${menus.length} Items`}
            size="small"
            sx={{
              backgroundColor: "#F1F4F2",
              color: tokens.basil,
              fontWeight: 700,
              borderRadius: "8px",
            }}
          />
        </Box>


        {/* ==========================================
            Empty State
        ========================================== */}
        {menus.length === 0 ? (
          <Card
            sx={{
              border: `1px solid ${tokens.line}`,
              borderRadius: "16px",
              boxShadow: "none",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                py: 8,
                px: 3,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  mx: "auto",
                  mb: 2,
                  borderRadius: "18px",
                  backgroundColor: "#EAF3EE",
                  color: tokens.basil,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FastfoodOutlinedIcon fontSize="large" />
              </Box>

              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: tokens.ink,
                }}
              >
                No Menu Items Found
              </Typography>

              <Typography
                sx={{
                  mt: 0.7,
                  color: tokens.muted,
                  fontSize: 14,
                }}
              >
                There are currently no menu items available.
              </Typography>
            </Box>
          </Card>
        ) : (
          /* ==========================================
             Menu Grid
          ========================================== */
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 2.2,
            }}
          >
            {menus.map((menu) => (
              <MenuItemCard
                key={menu?._id}
                menu={menu}
                actionLoading={actionLoading}
                onDelete={() => {
                  setDeleteId(menu?._id);
                  setDeleteDialog(true);
                }}
                onToggle={() =>
                  handleActive(menu?._id)
                }
              />
            ))}
          </Box>
        )}


        {/* ==========================================
            Delete Confirmation Dialog
        ========================================== */}
        <Dialog
          open={deleteDialog}
          onClose={() => {
            if (!deleteLoading) {
              setDeleteDialog(false);
              setDeleteId(null);
            }
          }}
          PaperProps={{
            sx: {
              width: "100%",
              maxWidth: 430,
              borderRadius: "16px",
              border: `1px solid ${tokens.line}`,
              boxShadow:
                "0 20px 60px rgba(19, 58, 45, 0.16)",
            },
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: 800,
              color: tokens.ink,
              pb: 1,
            }}
          >
            Delete Menu Item?
          </DialogTitle>

          <DialogContent>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="flex-start"
              sx={{
                p: 1.5,
                borderRadius: "12px",
                backgroundColor: "#FFF6F4",
              }}
            >
              <WarningAmberOutlinedIcon
                sx={{
                  color: tokens.chili,
                  mt: 0.2,
                }}
              />

              <Typography
                sx={{
                  color: tokens.muted,
                  fontSize: 13.5,
                  lineHeight: 1.6,
                }}
              >
                Are you sure you want to delete this menu
                item? This action cannot be undone.
              </Typography>
            </Stack>
          </DialogContent>

          <DialogActions
            sx={{
              px: 3,
              pb: 2.5,
              gap: 1,
            }}
          >
            <Button
              onClick={() => {
                setDeleteDialog(false);
                setDeleteId(null);
              }}
              disabled={deleteLoading}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                color: tokens.muted,
                borderRadius: "9px",
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleDelete}
              disabled={deleteLoading}
              variant="contained"
              startIcon={
                deleteLoading ? (
                  <CircularProgress
                    size={16}
                    sx={{ color: "#fff" }}
                  />
                ) : (
                  <DeleteOutlineOutlinedIcon />
                )
              }
              sx={{
                textTransform: "none",
                fontWeight: 700,
                borderRadius: "9px",
                backgroundColor: tokens.chili,
                "&:hover": {
                  backgroundColor: tokens.chiliDark,
                },
              }}
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
}


// ==========================================
// Menu Item Card
// ==========================================
function MenuItemCard({
  menu,
  actionLoading,
  onDelete,
  onToggle,
}) {
  const image =
    menu?.imageURL ||
    "https://via.placeholder.com/600x400?text=Food";

  const isLoading = actionLoading === menu?._id;

  /*
    Existing backend logic:
    isApproved = true  -> button shows "inActive"
    isApproved = false -> button shows "Active"

    So the toggle below intentionally follows
    the same logic as your original component.
  */

  const isActive = !menu?.isApproved;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${tokens.line}`,
        borderRadius: "16px",
        boxShadow: "none",
        overflow: "hidden",
        backgroundColor: "#fff",
        transition:
          "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",

        "&:hover": {
          transform: "translateY(-3px)",
          borderColor: "#C8D2CD",
          boxShadow:
            "0 12px 30px rgba(19, 58, 45, 0.08)",
        },
      }}
    >

      {/* ==========================================
          Image
      ========================================== */}
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#EEF2F0",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={menu?.itemName || "Menu item"}
          sx={{
            width: "100%",
            height: 190,
            objectFit: "cover",
            display: "block",
          }}
          onError={(event) => {
            event.currentTarget.src =
              "https://via.placeholder.com/600x400?text=Food";
          }}
        />

        {/* Status */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
          }}
        >
          <Chip
            size="small"
            icon={
              isActive ? (
                <CheckCircleOutlineIcon
                  sx={{
                    fontSize:
                      "15px !important",
                  }}
                />
              ) : (
                <CancelOutlinedIcon
                  sx={{
                    fontSize:
                      "15px !important",
                  }}
                />
              )
            }
            label={isActive ? "Active" : "Inactive"}
            sx={{
              backgroundColor: isActive
                ? "#EAF3EE"
                : "#FFF1EE",
              color: isActive
                ? tokens.basil
                : tokens.chili,
              fontWeight: 800,
              borderRadius: "8px",
              backdropFilter: "blur(8px)",
              "& .MuiChip-icon": {
                color: isActive
                  ? tokens.basilSoft
                  : tokens.chili,
              },
            }}
          />
        </Box>
      </Box>


      {/* ==========================================
          Content
      ========================================== */}
      <CardContent
        sx={{
          p: 2,
          flexGrow: 1,
          "&:last-child": {
            pb: 1.5,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: 17,
            fontWeight: 800,
            color: tokens.ink,
            lineHeight: 1.3,
            mb: 1,
          }}
        >
          {menu?.itemName || "Unnamed Item"}
        </Typography>


        {/* Restaurant */}
        <Stack
          direction="row"
          spacing={0.8}
          alignItems="center"
          sx={{
            mb: 1.4,
          }}
        >
          <RestaurantOutlinedIcon
            sx={{
              fontSize: 17,
              color: tokens.basilSoft,
            }}
          />

          <Typography
            sx={{
              fontSize: 12.5,
              color: tokens.muted,
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {menu?.restaurantName || "Restaurant not available"}
          </Typography>
        </Stack>


        {/* Description */}
        <Typography
          sx={{
            color: tokens.muted,
            fontSize: 13,
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 62,
          }}
        >
          {menu?.itemDesc || "No description available."}
        </Typography>


        {/* Price */}
        <Box
          sx={{
            mt: 1.8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 11.5,
              color: tokens.muted,
              fontWeight: 600,
            }}
          >
            PRICE
          </Typography>

          <Box
            sx={{
              px: 1.2,
              py: 0.6,
              borderRadius: "8px",
              backgroundColor: "#EAF3EE",
              color: tokens.basil,
              fontWeight: 800,
              fontSize: 14,
            }}
          >
            Rs. {menu?.itemPrice ?? "0"}
          </Box>
        </Box>
      </CardContent>


      {/* ==========================================
          Actions
      ========================================== */}
      <CardActions
        sx={{
          px: 2,
          pb: 2,
          pt: 0,
          gap: 1,
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          startIcon={
            <DeleteOutlineOutlinedIcon />
          }
          onClick={onDelete}
          sx={{
            height: 38,
            borderRadius: "9px",
            textTransform: "none",
            fontWeight: 700,
            color: tokens.chili,
            borderColor: "#F0C2BC",
            "&:hover": {
              borderColor: tokens.chili,
              backgroundColor: "#FFF6F4",
            },
          }}
        >
          Delete
        </Button>


        <Button
          fullWidth
          variant="contained"
          startIcon={
            isLoading ? (
              <CircularProgress
                size={15}
                sx={{
                  color: "#fff",
                }}
              />
            ) : (
              <AutorenewIcon />
            )
          }
          onClick={onToggle}
          disabled={isLoading}
          sx={{
            height: 38,
            borderRadius: "9px",
            textTransform: "none",
            fontWeight: 700,
            backgroundColor: tokens.basil,
            "&:hover": {
              backgroundColor: tokens.basilSoft,
            },
          }}
        >
          {isLoading
            ? "Updating..."
            : isActive
            ? "Inactivate"
            : "Activate"}
        </Button>
      </CardActions>
    </Card>
  );
}


// ==========================================
// Summary Card
// ==========================================
function SummaryCard({
  icon,
  title,
  value,
  iconBg,
  iconColor,
}) {
  return (
    <Card
      sx={{
        border: `1px solid ${tokens.line}`,
        borderRadius: "14px",
        boxShadow: "none",
        backgroundColor: "#fff",
      }}
    >
      <CardContent
        sx={{
          p: 2.2,
          "&:last-child": {
            pb: 2.2,
          },
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "12px",
              backgroundColor: iconBg,
              color: iconColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 12,
                color: tokens.muted,
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                mt: 0.2,
                fontSize: 24,
                lineHeight: 1.1,
                fontWeight: 800,
                color: tokens.ink,
              }}
            >
              {value}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}


export default AllMenu;
