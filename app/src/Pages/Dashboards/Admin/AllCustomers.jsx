import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Components/LayoutComp/AdminLayout";
import axios from "axios";
import { BASE_URL } from "../../../Utils/utility";
import endPoints from "../../../Constants/apiEndPoints";
import Cookies from "js-cookie";

import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
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
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

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

function AllCustomers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const getCustomers = async () => {
    try {
      setError("");

      const response = await axios.get(
        `${BASE_URL}${endPoints.getAllCustomers}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      const { data } = response.data;

      setAllUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("GET CUSTOMERS ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to load customers. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleApproval = async (id) => {
    try {
      setActionLoading(id);

      await axios.patch(
        `${BASE_URL}${endPoints.changeCustomerStatus}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      await getCustomers();
    } catch (error) {
      console.error("CHANGE CUSTOMER STATUS ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to change customer status."
      );
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <AdminLayout>
      <Box
        sx={{
          minHeight: "100%",
          backgroundColor: tokens.surface,
          p: { xs: 1.5, sm: 2.5, md: 3 },
          fontFamily:
            '"Plus Jakarta Sans", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Header */}
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
            <Stack direction="row" spacing={1.2} alignItems="center">
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2.5,
                  backgroundColor: tokens.basil,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                <PeopleOutlineIcon />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: 20, sm: 24 },
                    fontWeight: 800,
                    color: tokens.ink,
                    lineHeight: 1.2,
                  }}
                >
                  All Customers
                </Typography>

                <Typography
                  sx={{
                    color: tokens.muted,
                    fontSize: 13,
                    mt: 0.4,
                  }}
                >
                  Manage and verify registered customers
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Chip
            icon={<PeopleOutlineIcon />}
            label={`${allUsers.length} Customers`}
            sx={{
              backgroundColor: "#EAF3EE",
              color: tokens.basil,
              fontWeight: 700,
              borderRadius: 2,
              "& .MuiChip-icon": {
                color: tokens.basil,
              },
            }}
          />
        </Box>

        {/* Error */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2.5,
              borderRadius: 2,
              border: `1px solid #F0C2BC`,
              backgroundColor: "#FFF5F3",
            }}
          >
            {error}
          </Alert>
        )}

        {/* Main Card */}
        <Paper
          elevation={0}
          sx={{
            border: `1px solid ${tokens.line}`,
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          {/* Card Header */}
          <Box
            sx={{
              px: { xs: 2, sm: 2.5 },
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
                  fontSize: 16,
                  fontWeight: 800,
                  color: tokens.ink,
                }}
              >
                Customer List
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: tokens.muted,
                  mt: 0.3,
                }}
              >
                View customer accounts and verification status
              </Typography>
            </Box>

            <Tooltip title="Refresh customers">
              <IconButton
                onClick={getCustomers}
                disabled={loading}
                sx={{
                  color: tokens.basil,
                  border: `1px solid ${tokens.line}`,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#EAF3EE",
                  },
                }}
              >
                <AutorenewIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Loading */}
          {loading ? (
            <Box
              sx={{
                minHeight: 280,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 1.5,
              }}
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
                Loading customers...
              </Typography>
            </Box>
          ) : allUsers.length === 0 ? (
            /* Empty State */
            <Box
              sx={{
                minHeight: 280,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 1,
                px: 2,
              }}
            >
              <PeopleOutlineIcon
                sx={{
                  fontSize: 48,
                  color: "#AAB3AF",
                }}
              />

              <Typography
                sx={{
                  fontWeight: 700,
                  color: tokens.ink,
                }}
              >
                No customers found
              </Typography>

              <Typography
                sx={{
                  color: tokens.muted,
                  fontSize: 13,
                }}
              >
                There are currently no customer accounts to display.
              </Typography>
            </Box>
          ) : (
            /* Table */
            <TableContainer
              sx={{
                overflowX: "auto",
              }}
            >
              <Table
                sx={{
                  minWidth: 760,
                }}
              >
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#F8FAF9",
                    }}
                  >
                    <TableCell
                      sx={{
                        fontWeight: 800,
                        color: tokens.ink,
                        borderBottom: `1px solid ${tokens.line}`,
                        py: 1.8,
                      }}
                    >
                      Customer
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 800,
                        color: tokens.ink,
                        borderBottom: `1px solid ${tokens.line}`,
                      }}
                    >
                      Email
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 800,
                        color: tokens.ink,
                        borderBottom: `1px solid ${tokens.line}`,
                      }}
                    >
                      Type
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 800,
                        color: tokens.ink,
                        borderBottom: `1px solid ${tokens.line}`,
                      }}
                    >
                      Verification
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 800,
                        color: tokens.ink,
                        borderBottom: `1px solid ${tokens.line}`,
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {allUsers.map((user, index) => (
                    <TableRow
                      key={user?._id || user?.name || index}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#FAFCFB",
                        },
                        "& td": {
                          borderBottom: `1px solid ${tokens.line}`,
                        },
                      }}
                    >
                      {/* Customer */}
                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={1.3}
                          alignItems="center"
                        >
                          <Box
                            sx={{
                              width: 38,
                              height: 38,
                              borderRadius: "50%",
                              backgroundColor: "#EAF3EE",
                              color: tokens.basil,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <PersonOutlineIcon fontSize="small" />
                          </Box>

                          <Box>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: 14,
                                color: tokens.ink,
                              }}
                            >
                              {user?.name || "N/A"}
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: 11,
                                color: tokens.muted,
                              }}
                            >
                              Customer
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      {/* Email */}
                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                        >
                          <EmailOutlinedIcon
                            sx={{
                              fontSize: 18,
                              color: tokens.muted,
                            }}
                          />

                          <Typography
                            sx={{
                              fontSize: 13,
                              color: tokens.ink,
                            }}
                          >
                            {user?.email || "N/A"}
                          </Typography>
                        </Stack>
                      </TableCell>

                      {/* Type */}
                      <TableCell>
                        <Chip
                          label={user?.type || "Customer"}
                          size="small"
                          sx={{
                            backgroundColor: "#F1F3F2",
                            color: tokens.ink,
                            fontWeight: 700,
                            borderRadius: 1.5,
                            textTransform: "capitalize",
                          }}
                        />
                      </TableCell>

                      {/* Verification */}
                      <TableCell>
                        {user?.isVarified ? (
                          <Chip
                            icon={<VerifiedOutlinedIcon />}
                            label="Verified"
                            size="small"
                            sx={{
                              backgroundColor: "#EAF3EE",
                              color: tokens.basil,
                              fontWeight: 700,
                              borderRadius: 1.5,
                              "& .MuiChip-icon": {
                                color: tokens.basil,
                              },
                            }}
                          />
                        ) : (
                          <Chip
                            label="Not Verified"
                            size="small"
                            sx={{
                              backgroundColor: "#FFF1EE",
                              color: tokens.chili,
                              fontWeight: 700,
                              borderRadius: 1.5,
                            }}
                          />
                        )}
                      </TableCell>

                      {/* Action */}
                      <TableCell align="center">
                        <Tooltip title="Change customer status">
                          <span>
                            <IconButton
                              onClick={() => handleApproval(user?._id)}
                              disabled={
                                actionLoading === user?._id ||
                                !user?._id
                              }
                              sx={{
                                width: 38,
                                height: 38,
                                color: "#fff",
                                backgroundColor: tokens.chili,
                                borderRadius: 2,

                                "&:hover": {
                                  backgroundColor: tokens.chiliDark,
                                },

                                "&.Mui-disabled": {
                                  backgroundColor: "#E5E8E6",
                                  color: "#9AA39F",
                                },
                              }}
                            >
                              {actionLoading === user?._id ? (
                                <CircularProgress
                                  size={18}
                                  thickness={4}
                                  sx={{
                                    color: "inherit",
                                  }}
                                />
                              ) : (
                                <AutorenewIcon fontSize="small" />
                              )}
                            </IconButton>
                          </span>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
    </AdminLayout>
  );
}

export default AllCustomers;