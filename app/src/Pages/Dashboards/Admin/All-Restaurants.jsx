import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Components/LayoutComp/AdminLayout";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../Utils/utility";
import endPoints from "../../../Constants/apiEndPoints";
import Cookies from "js-cookie";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";


// ==============================
// Theme Tokens
// ==============================
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


// ==============================
// All Restaurants
// ==============================
function AllRestaurants() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [actionLoading, setActionLoading] = useState(null);


  // ==============================
  // Get All Restaurants
  // ==============================
  const getAllRestaurants = async (isRefresh = false) => {
    try {
      setError("");

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await axios.get(
        `${BASE_URL}${endPoints.getAdminEndPoint}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      const restaurants = response?.data?.data;

      setDatas(Array.isArray(restaurants) ? restaurants : []);
    } catch (error) {
      console.error("GET ALL RESTAURANTS ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to load restaurants. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  useEffect(() => {
    getAllRestaurants();
  }, []);


  // ==============================
  // Delete Restaurant
  // ==============================
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);
      setError("");

      await axios.delete(
        `${BASE_URL}${endPoints.deleteResEndPoint}/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      setDeleteDialog(false);
      setDeleteId(null);

      await getAllRestaurants(true);
    } catch (error) {
      console.error("DELETE RESTAURANT ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to delete restaurant. Please try again."
      );
    } finally {
      setDeleteLoading(false);
    }
  };


  // ==============================
  // Approval / Status
  // ==============================
  const handleApproval = async (id) => {
    try {
      setActionLoading(id);
      setError("");

      await axios.patch(
        `${BASE_URL}${endPoints.approveEndPoint}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      await getAllRestaurants(true);
    } catch (error) {
      console.error("UPDATE RESTAURANT STATUS ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to change restaurant status."
      );
    } finally {
      setActionLoading(null);
    }
  };


  // ==============================
  // Loading
  // ==============================
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
              sx={{ color: tokens.chili }}
            />

            <Typography
              sx={{
                color: tokens.muted,
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              Loading restaurants...
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

        {/* ==============================
            Header
        ============================== */}
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
            mb: 3,
            flexDirection: { xs: "column", sm: "row" },
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
                <RestaurantOutlinedIcon />
              </Box>

              <Typography
                sx={{
                  fontSize: { xs: 23, md: 28 },
                  fontWeight: 800,
                  color: tokens.ink,
                  letterSpacing: "-0.5px",
                }}
              >
                All Restaurants
              </Typography>
            </Stack>

            <Typography
              sx={{
                color: tokens.muted,
                fontSize: 14,
              }}
            >
              Manage, approve and monitor all restaurants on the platform.
            </Typography>
          </Box>

          <Button
            onClick={() => getAllRestaurants(true)}
            disabled={refreshing}
            startIcon={
              refreshing ? (
                <CircularProgress size={17} sx={{ color: "inherit" }} />
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


        {/* ==============================
            Error
        ============================== */}
        {error && (
          <Alert
            severity="error"
            onClose={() => setError("")}
            sx={{
              mb: 3,
              borderRadius: "12px",
              border: `1px solid #F0C2BC`,
              backgroundColor: "#FFF6F4",
              color: tokens.ink,
            }}
          >
            {error}
          </Alert>
        )}


        {/* ==============================
            Summary Cards
        ============================== */}
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
            icon={<RestaurantOutlinedIcon />}
            title="Total Restaurants"
            value={datas.length}
            iconBg="#EAF3EE"
            iconColor={tokens.basil}
          />

          <SummaryCard
            icon={<CheckCircleOutlineIcon />}
            title="Approved"
            value={datas.filter((item) => item?.isApproved).length}
            iconBg="#EAF3EE"
            iconColor={tokens.basilSoft}
          />

          <SummaryCard
            icon={<CancelOutlinedIcon />}
            title="Pending"
            value={datas.filter((item) => !item?.isApproved).length}
            iconBg="#FFF1EE"
            iconColor={tokens.chili}
          />
        </Box>


        {/* ==============================
            Restaurant Table
        ============================== */}
        <Card
          sx={{
            border: `1px solid ${tokens.line}`,
            borderRadius: "16px",
            boxShadow: "none",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              px: { xs: 2, md: 2.5 },
              py: 2,
              borderBottom: `1px solid ${tokens.line}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: tokens.ink,
                }}
              >
                Restaurant List
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  color: tokens.muted,
                  fontSize: 12.5,
                }}
              >
                {datas.length} restaurant
                {datas.length !== 1 ? "s" : ""} found
              </Typography>
            </Box>

            <Chip
              label={`${datas.length} Total`}
              size="small"
              sx={{
                backgroundColor: "#F1F4F2",
                color: tokens.basil,
                fontWeight: 700,
                borderRadius: "8px",
              }}
            />
          </Box>


          {/* Empty State */}
          {datas.length === 0 ? (
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
                <RestaurantOutlinedIcon fontSize="large" />
              </Box>

              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: tokens.ink,
                }}
              >
                No Restaurants Found
              </Typography>

              <Typography
                sx={{
                  mt: 0.7,
                  color: tokens.muted,
                  fontSize: 14,
                }}
              >
                There are currently no restaurants available.
              </Typography>
            </Box>
          ) : (
            <TableContainer
              sx={{
                overflowX: "auto",
              }}
            >
              <Table
                sx={{
                  minWidth: 1050,
                }}
              >
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#F8FAF9",
                    }}
                  >
                    <TableCell sx={headCellStyle}>
                      Restaurant
                    </TableCell>

                    <TableCell sx={headCellStyle}>
                      Email
                    </TableCell>

                    <TableCell sx={headCellStyle}>
                      Category
                    </TableCell>

                    <TableCell sx={headCellStyle}>
                      Open Status
                    </TableCell>

                    <TableCell sx={headCellStyle}>
                      Approval
                    </TableCell>

                    <TableCell sx={headCellStyle}>
                      Created By
                    </TableCell>

                    <TableCell sx={headCellStyle}>
                      Record
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={headCellStyle}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>


                <TableBody>
                  {datas.map((data) => (
                    <TableRow
                      key={data?._id}
                      hover
                      sx={{
                        "&:last-child td": {
                          borderBottom: 0,
                        },
                        "&:hover": {
                          backgroundColor: "#FCFDFC",
                        },
                      }}
                    >

                      {/* Restaurant */}
                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                        >
                          <Box
                            sx={{
                              width: 42,
                              height: 42,
                              flexShrink: 0,
                              borderRadius: "12px",
                              backgroundColor: "#EAF3EE",
                              color: tokens.basil,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <RestaurantOutlinedIcon fontSize="small" />
                          </Box>

                          <Box>
                            <Typography
                              sx={{
                                fontSize: 13.5,
                                fontWeight: 800,
                                color: tokens.ink,
                                maxWidth: 180,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {data?.restaurantName || "N/A"}
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: 11.5,
                                color: tokens.muted,
                                mt: 0.3,
                              }}
                            >
                              Restaurant
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>


                      {/* Email */}
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: 12.5,
                            color: tokens.muted,
                            maxWidth: 200,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {data?.email || "N/A"}
                        </Typography>
                      </TableCell>


                      {/* Category */}
                      <TableCell>
                        <Chip
                          icon={
                            <CategoryOutlinedIcon
                              sx={{ fontSize: "15px !important" }}
                            />
                          }
                          label={data?.category || "N/A"}
                          size="small"
                          sx={{
                            backgroundColor: "#F1F4F2",
                            color: tokens.basil,
                            fontWeight: 700,
                            borderRadius: "8px",
                            "& .MuiChip-icon": {
                              color: tokens.basilSoft,
                            },
                          }}
                        />
                      </TableCell>


                      {/* Is Open */}
                      <TableCell>
                        <StatusChip
                          active={Boolean(data?.isOpen)}
                          activeLabel="Opened"
                          inactiveLabel="Closed"
                        />
                      </TableCell>


                      {/* Approval */}
                      <TableCell>
                        <StatusChip
                          active={Boolean(data?.isApproved)}
                          activeLabel="Approved"
                          inactiveLabel="Unapproved"
                        />
                      </TableCell>


                      {/* Created By */}
                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={0.7}
                          alignItems="center"
                        >
                          <PersonOutlineOutlinedIcon
                            sx={{
                              fontSize: 17,
                              color: tokens.muted,
                            }}
                          />

                          <Typography
                            sx={{
                              fontSize: 12.5,
                              color: tokens.muted,
                              maxWidth: 140,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {data?.createBy || "N/A"}
                          </Typography>
                        </Stack>
                      </TableCell>


                      {/* Deleted */}
                      <TableCell>
                        <Chip
                          label={
                            data?.isDeleted
                              ? "Deleted"
                              : "Active"
                          }
                          size="small"
                          sx={{
                            backgroundColor: data?.isDeleted
                              ? "#FFF1EE"
                              : "#EAF3EE",
                            color: data?.isDeleted
                              ? tokens.chili
                              : tokens.basil,
                            fontWeight: 700,
                            borderRadius: "8px",
                          }}
                        />
                      </TableCell>


                      {/* Actions */}
                      <TableCell align="center">
                        <Stack
                          direction="row"
                          spacing={0.5}
                          justifyContent="center"
                        >
                          <Tooltip title="Delete restaurant">
                            <IconButton
                              onClick={() => {
                                setDeleteId(data?._id);
                                setDeleteDialog(true);
                              }}
                              disabled={deleteLoading}
                              sx={{
                                width: 36,
                                height: 36,
                                color: tokens.chili,
                                border: "1px solid #F0C2BC",
                                borderRadius: "9px",
                                "&:hover": {
                                  backgroundColor: "#FFF1EE",
                                },
                              }}
                            >
                              <DeleteOutlineOutlinedIcon
                                fontSize="small"
                              />
                            </IconButton>
                          </Tooltip>


                          <Tooltip title="Change approval status">
                            <span>
                              <IconButton
                                onClick={() =>
                                  handleApproval(data?._id)
                                }
                                disabled={
                                  actionLoading === data?._id
                                }
                                sx={{
                                  width: 36,
                                  height: 36,
                                  color: tokens.basil,
                                  border: `1px solid ${tokens.line}`,
                                  borderRadius: "9px",
                                  "&:hover": {
                                    backgroundColor: "#EAF3EE",
                                  },
                                }}
                              >
                                {actionLoading === data?._id ? (
                                  <CircularProgress
                                    size={17}
                                    sx={{
                                      color: tokens.basil,
                                    }}
                                  />
                                ) : (
                                  <AutorenewIcon fontSize="small" />
                                )}
                              </IconButton>
                            </span>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>


        {/* ==============================
            Delete Confirmation Dialog
        ============================== */}
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
              boxShadow: "0 20px 60px rgba(19, 58, 45, 0.16)",
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
            Delete Restaurant?
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
                Are you sure you want to delete this restaurant?
                This action cannot be undone.
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


// ==============================
// Summary Card
// ==============================
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


// ==============================
// Status Chip
// ==============================
function StatusChip({
  active,
  activeLabel,
  inactiveLabel,
}) {
  return (
    <Chip
      size="small"
      icon={
        active ? (
          <CheckCircleOutlineIcon
            sx={{ fontSize: "15px !important" }}
          />
        ) : (
          <CancelOutlinedIcon
            sx={{ fontSize: "15px !important" }}
          />
        )
      }
      label={active ? activeLabel : inactiveLabel}
      sx={{
        backgroundColor: active ? "#EAF3EE" : "#FFF1EE",
        color: active ? tokens.basil : tokens.chili,
        fontWeight: 700,
        borderRadius: "8px",
        "& .MuiChip-icon": {
          color: active ? tokens.basilSoft : tokens.chili,
        },
      }}
    />
  );
}


// ==============================
// Table Header Style
// ==============================
const headCellStyle = {
  fontSize: 11.5,
  fontWeight: 800,
  color: tokens.muted,
  textTransform: "uppercase",
  letterSpacing: "0.4px",
  borderBottom: `1px solid ${tokens.line}`,
  whiteSpace: "nowrap",
};


export default AllRestaurants;
