import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

export default function MenuCard({allCards}) {
    
    
  return (
    <Stack direction={"row"} gap={"5px"} flexWrap={"wrap"} mt={"20px"}>

    {allCards.map((card , index)=>(
    <Card sx={{ maxWidth: 345 }} key={index}>
      <CardMedia
        sx={{ height: 140 }}
        image={card.imageURL}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Item Name : {card.itemName}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Restaurant Name : {card.restaurantName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Item Description : {card.itemDesc}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Item Price : {card.itemPrice}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    ))}
    </Stack>
  );
}
