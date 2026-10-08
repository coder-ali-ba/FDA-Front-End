import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Components/LayoutComp/AdminLayout";
import axios from "axios";
import { BASE_URL } from "../../../Utils/utility";
import endPoints from "../../../Constants/apiEndPoints";
import Cookies from "js-cookie";

import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
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

import AutorenewIcon from "@mui/icons-material/Autorenew";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";


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
// All Vendors
// ==========================================
function AllVendors() {
  const [allVendors, setAllVendors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [actionLoading, setActionLoading] = useState(null);


  // ==========================================
  // Get Vendors
  // ==========================================
  const getVendors = async (isRefresh = false) => {
    try {
      setError("");

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      // Endpoint kept exactly as provided
      const response = await axios.get(
        `${BASE_URL}${endPoints.allVendors}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      const { data } = response?.data || {};

      setAllVendors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("GET VENDORS ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to load vendors. Please try again."
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
    getVendors();
  }, []);


  // ==========================================
  // Change Vendor Status
  // ==========================================
  const handleApproval = async (id) => {
    try {
      setActionLoading(id);
      setError("");

      // Endpoint kept exactly as provided
      await axios.patch(
        `${BASE_URL}${endPoints.changeVendorStatus}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      await getVendors(true);
    } catch (error) {
      console.error("CHANGE VENDOR STATUS ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to change vendor status."
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
              Loading vendors...
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
                <PeopleAltOutlinedIcon />
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
                All Vendors
              </Typography>
            </Stack>

            <Typography
              sx={{
                color: tokens.muted,
                fontSize: 14,
              }}
            >
              Manage vendor accounts and their verification status.
            </Typography>
          </Box>


          {/* Refresh */}
          <Button
            onClick={() => getVendors(true)}
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
            Error
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
            icon={<PeopleAltOutlinedIcon />}
            title="Total Vendors"
            value={allVendors.length}
            iconBg="#EAF3EE"
            iconColor={tokens.basil}
          />

          <SummaryCard
            icon={<VerifiedOutlinedIcon />}
            title="Verified"
            value={
              allVendors.filter(
                (vendor) => vendor?.isVarified
              ).length
            }
            iconBg="#EAF3EE"
            iconColor={tokens.basilSoft}
          />

          <SummaryCard
            icon={<CancelOutlinedIcon />}
            title="Unverified"
            value={
              allVendors.filter(
                (vendor) => !vendor?.isVarified
              ).length
            }
            iconBg="#FFF1EE"
            iconColor={tokens.chili}
          />
        </Box>


        {/* ==========================================
            Vendors Table
        ========================================== */}
        <Card
          sx={{
            border: `1px solid ${tokens.line}`,
            borderRadius: "16px",
            boxShadow: "none",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >

          {/* Table Header */}
          <Box
            sx={{
              px: {
                xs: 2,
                md: 2.5,
              },
              py: 2,
              borderBottom: `1px solid ${tokens.line}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
                Vendor List
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  color: tokens.muted,
                  fontSize: 12.5,
                }}
              >
                {allVendors.length} vendor
                {allVendors.length !== 1 ? "s" : ""} found
              </Typography>
            </Box>

            <Chip
              label={`${allVendors.length} Total`}
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
          {allVendors.length === 0 ? (
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
                <PeopleAltOutlinedIcon
                  fontSize="large"
                />
              </Box>

              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: tokens.ink,
                }}
              >
                No Vendors Found
              </Typography>

              <Typography
                sx={{
                  mt: 0.7,
                  color: tokens.muted,
                  fontSize: 14,
                }}
              >
                There are currently no vendor accounts available.
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
                  minWidth: 850,
                }}
              >
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#F8FAF9",
                    }}
                  >
                    <TableCell sx={headCellStyle}>
                      Vendor
                    </TableCell>

                    <TableCell sx={headCellStyle}>
                      Email
                    </TableCell>

                    <TableCell sx={headCellStyle}>
                      Type
                    </TableCell>

                    <TableCell sx={headCellStyle}>
                      Verification
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={headCellStyle}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>


                <TableBody>
                  {allVendors.map((user, index) => {
                    const isVerified =
                      Boolean(user?.isVarified);

                    const isLoading =
                      actionLoading === user?._id;

                    return (
                      <TableRow
                        key={user?._id || index}
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

                        {/* Vendor */}
                        <TableCell>
                          <Stack
                            direction="row"
                            spacing={1.3}
                            alignItems="center"
                          >
                            <Box
                              sx={{
                                width: 42,
                                height: 42,
                                borderRadius: "12px",
                                backgroundColor: "#EAF3EE",
                                color: tokens.basil,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <PersonOutlineOutlinedIcon />
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
                                {user?.name || "N/A"}
                              </Typography>

                              <Typography
                                sx={{
                                  mt: 0.25,
                                  fontSize: 11.5,
                                  color: tokens.muted,
                                }}
                              >
                                Vendor
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>


                        {/* Email */}
                        <TableCell>
                          <Stack
                            direction="row"
                            spacing={0.8}
                            alignItems="center"
                          >
                            <EmailOutlinedIcon
                              sx={{
                                fontSize: 17,
                                color: tokens.muted,
                              }}
                            />

                            <Typography
                              sx={{
                                fontSize: 12.5,
                                color: tokens.muted,
                                maxWidth: 230,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {user?.email || "N/A"}
                            </Typography>
                          </Stack>
                        </TableCell>


                        {/* Type */}
                        <TableCell>
                          <Chip
                            label={user?.type || "N/A"}
                            size="small"
                            sx={{
                              backgroundColor: "#F1F4F2",
                              color: tokens.basil,
                              fontWeight: 700,
                              borderRadius: "8px",
                              textTransform: "capitalize",
                            }}
                          />
                        </TableCell>


                        {/* Verification */}
                        <TableCell>
                          <Chip
                            size="small"
                            icon={
                              isVerified ? (
                                <VerifiedOutlinedIcon
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
                            label={
                              isVerified
                                ? "Verified"
                                : "Unverified"
                            }
                            sx={{
                              backgroundColor: isVerified
                                ? "#EAF3EE"
                                : "#FFF1EE",
                              color: isVerified
                                ? tokens.basil
                                : tokens.chili,
                              fontWeight: 800,
                              borderRadius: "8px",
                              "& .MuiChip-icon": {
                                color: isVerified
                                  ? tokens.basilSoft
                                  : tokens.chili,
                              },
                            }}
                          />
                        </TableCell>


                        {/* Action */}
                        <TableCell align="center">
                          <Tooltip
                            title={
                              isVerified
                                ? "Change verification status"
                                : "Verify vendor"
                            }
                          >
                            <span>
                              <Button
                                onClick={() =>
                                  handleApproval(user?._id)
                                }
                                disabled={isLoading}
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
                                sx={{
                                  minWidth: 110,
                                  height: 36,
                                  borderRadius: "9px",
                                  textTransform: "none",
                                  fontSize: 12,
                                  fontWeight: 700,
                                  color: "#fff",
                                  backgroundColor:
                                    tokens.basil,
                                  "&:hover": {
                                    backgroundColor:
                                      tokens.basilSoft,
                                  },
                                }}
                              >
                                {isLoading
                                  ? "Updating..."
                                  : "Change Status"}
                              </Button>
                            </span>
                          </Tooltip>
                        </TableCell>

                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
      </Box>
    </AdminLayout>
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
      <Box
        sx={{
          p: 2.2,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
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
      </Box>
    </Card>
  );
}


// ==========================================
// Table Header Style
// ==========================================
const headCellStyle = {
  fontSize: 11.5,
  fontWeight: 800,
  color: tokens.muted,
  textTransform: "uppercase",
  letterSpacing: "0.4px",
  borderBottom: `1px solid ${tokens.line}`,
  whiteSpace: "nowrap",
};


export default AllVendors;