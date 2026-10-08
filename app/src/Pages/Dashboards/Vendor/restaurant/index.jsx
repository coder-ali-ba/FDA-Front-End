
import React from "react";
import VendorLayout from "../../../../Components/LayoutComp/VendorLayout";
import RestaurantCard from "../../../../Components/restaurantCards/Card";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import AddResortModal from "../../../../Modals/AddRestaurant";

import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

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

function Restaurant() {
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
          spacing={2}
          sx={{
            mb: 3,
          }}
        >
          {/* Title */}
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.2}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "11px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#EAF3EE",
                  color: tokens.basil,
                }}
              >
                <RestaurantOutlinedIcon />
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: tokens.ink,
                    fontSize: {
                      xs: 24,
                      sm: 28,
                    },
                    fontWeight: 800,
                    lineHeight: 1.2,
                    letterSpacing: "-0.7px",
                  }}
                >
                  Restaurants
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    color: tokens.muted,
                    fontSize: 13,
                  }}
                >
                  Manage your restaurant information and listings.
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Right Side */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            <Chip
              icon={
                <RestaurantOutlinedIcon
                  sx={{
                    fontSize: "16px !important",
                  }}
                />
              }
              label="Restaurant Management"
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                height: 34,
                borderRadius: "9px",
                backgroundColor: "#fff",
                border: `1px solid ${tokens.line}`,
                color: tokens.muted,
                fontSize: 11.5,
                fontWeight: 700,

                "& .MuiChip-icon": {
                  color: tokens.basilSoft,
                },
              }}
            />

            <Box
              sx={{
                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            >
              <AddResortModal />
            </Box>
          </Stack>
        </Stack>

        {/* Section Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            mb: 1.5,
          }}
        >
          <Typography
            sx={{
              color: tokens.ink,
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            Your Restaurants
          </Typography>

          <Typography
            sx={{
              color: tokens.muted,
              fontSize: 12,
            }}
          >
            Manage your listings below
          </Typography>
        </Stack>

        {/* Restaurant Cards */}
        <Box
          sx={{
            width: "100%",
            "& > *": {
              width: "100%",
            },
          }}
        >
          <RestaurantCard />
        </Box>
      </Box>
    </VendorLayout>
  );
}

export default Restaurant;
