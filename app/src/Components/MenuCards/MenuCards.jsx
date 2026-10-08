// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { Stack } from '@mui/material';

// export default function MenuCard({allCards}) {
    
    
//   return (
//     <Stack direction={"row"} gap={"5px"} flexWrap={"wrap"} mt={"20px"}>

//     {allCards.map((card , index)=>(
//     <Card sx={{ maxWidth: 345 }} key={index}>
//       <CardMedia
//         sx={{ height: 140 }}
//         image={card.imageURL}
//         title="green iguana"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           Item Name : {card.itemName}
//         </Typography>
//         <Typography gutterBottom variant="h5" component="div">
//           Restaurant Name : {card.restaurantName}
//         </Typography>
//         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//           Item Description : {card.itemDesc}
//         </Typography>
//         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//           Item Price : {card.itemPrice}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Share</Button>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
//     ))}
//     </Stack>
//   );
// }



import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

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

export default function MenuCard({ allCards = [] }) {
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      gap={2.5}
      sx={{
        width: "100%",
        mt: 2.5,
        alignItems: "stretch",
      }}
    >
      {allCards.map((card, index) => (
        <Card
          key={card?._id || index}
          sx={{
            width: {
              xs: "100%",
              sm: "calc(50% - 10px)",
              md: "calc(33.333% - 17px)",
            },
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
            border: `1px solid ${tokens.line}`,
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "none",
            transition:
              "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",

            "&:hover": {
              transform: "translateY(-4px)",
              borderColor: "#C8D1CC",
              boxShadow: "0 12px 30px rgba(19, 58, 45, 0.08)",
            },
          }}
        >
          {/* Image */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: {
                xs: 190,
                sm: 180,
                md: 175,
              },
              backgroundColor: "#E9EEEB",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image={card?.imageURL}
              alt={card?.itemName || "Menu item"}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease",

                ".MuiCard-root:hover &": {
                  transform: "scale(1.04)",
                },
              }}
            />

            {/* Price Badge */}
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                px: 1.4,
                py: 0.7,
                borderRadius: "9px",
                backgroundColor: tokens.chili,
                color: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.16)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                Rs. {card?.itemPrice ?? "0"}
              </Typography>
            </Box>
          </Box>

          {/* Content */}
          <CardContent
            sx={{
              p: 2.2,
              pb: "16px !important",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Item Name */}
            <Typography
              sx={{
                color: tokens.ink,
                fontSize: 17,
                fontWeight: 800,
                lineHeight: 1.3,
                letterSpacing: "-0.3px",
                mb: 1,
              }}
            >
              {card?.itemName || "Unnamed Item"}
            </Typography>

            {/* Restaurant */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.7}
              sx={{ mb: 1.5 }}
            >
              <RestaurantOutlinedIcon
                sx={{
                  fontSize: 17,
                  color: tokens.basilSoft,
                }}
              />

              <Typography
                sx={{
                  color: tokens.basilSoft,
                  fontSize: 12.5,
                  fontWeight: 700,
                }}
              >
                {card?.restaurantName || "Restaurant"}
              </Typography>
            </Stack>

            {/* Description */}
            <Typography
              sx={{
                color: tokens.muted,
                fontSize: 13,
                lineHeight: 1.65,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: 63,
              }}
            >
              {card?.itemDesc || "No description available for this item."}
            </Typography>

            {/* Bottom Section */}
            <Box
              sx={{
                mt: "auto",
                pt: 2,
              }}
            >
              <Box
                sx={{
                  borderTop: `1px solid ${tokens.line}`,
                  pt: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Chip
                  icon={
                    <LocalOfferOutlinedIcon
                      sx={{
                        fontSize: "15px !important",
                      }}
                    />
                  }
                  label={`Rs. ${card?.itemPrice ?? "0"}`}
                  size="small"
                  sx={{
                    height: 30,
                    borderRadius: "8px",
                    backgroundColor: "#FFF0ED",
                    color: tokens.chiliDark,
                    fontSize: 12,
                    fontWeight: 800,

                    "& .MuiChip-icon": {
                      color: tokens.chili,
                    },
                  }}
                />

                <Typography
                  sx={{
                    color: tokens.muted,
                    fontSize: 11.5,
                    fontWeight: 500,
                  }}
                >
                  Menu Item
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* Empty State */}
      {allCards.length === 0 && (
        <Box
          sx={{
            width: "100%",
            py: 8,
            px: 3,
            textAlign: "center",
            backgroundColor: "#fff",
            border: `1px dashed ${tokens.line}`,
            borderRadius: "16px",
          }}
        >
          <RestaurantOutlinedIcon
            sx={{
              fontSize: 42,
              color: "#A8B2AD",
              mb: 1,
            }}
          />

          <Typography
            sx={{
              color: tokens.ink,
              fontSize: 17,
              fontWeight: 800,
              mb: 0.5,
            }}
          >
            No menu items found
          </Typography>

          <Typography
            sx={{
              color: tokens.muted,
              fontSize: 13,
            }}
          >
            There are currently no menu items to display.
          </Typography>
        </Box>
      )}
    </Stack>
  );
}
