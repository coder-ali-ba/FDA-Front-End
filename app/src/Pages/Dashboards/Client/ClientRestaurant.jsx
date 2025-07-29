import React, { useEffect, useState } from 'react'
import ClientLayout from "../../../Components/LayoutComp/ClientLayout"
import endPoints from '../../../Constants/apiEndPoints.js';
import { BASE_URL } from '../../../Utils/utility.js';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Stack, Typography } from '@mui/material';
import { Email, Info, LocationOn, Restaurant } from '@mui/icons-material';






function ClientRestaurant() {
    const [datas , setDatas] = useState([])

    useEffect(()=>{
        getAllRestaurants()
    },[])


  const getAllRestaurants = async()=>{
    try {
      const response = await axios.get(`${BASE_URL}${endPoints.getAdminEndPoint}`,{
         headers : {
          Authorization : `Bearer ${Cookies.get("authToken")}`
         }
      });     
       setDatas(response.data.data)
    } catch (error) {
      console.log(error.message);     
    }   
  }
  
  

  return (
<ClientLayout>
  <h3 style={{textAlign:"center"}}>All Restaurants</h3>
    <Stack direction={"row"} gap={"40px"} flexWrap={"wrap"} justifyContent={"center"}>
       {datas.map((data)=>(
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
           sx={{ height: 140 }}
           image={data.imageUrl}
           title="green iguana"
           />
          <CardContent>
             <Typography gutterBottom variant="h5" component="div">
               {data.restaurantName}
             </Typography>
             <Typography gutterBottom variant="h6" component="div">
               {data.category}
             </Typography>
             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
               {data.email}
             </Typography>
             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
               {data.details}
             </Typography>
          </CardContent>
          <CardActions>
             <Button size="small"sx={{
                backgroundColor : data.isOpen ? "#148fe7ff" : "orange",
                color : 'white'
             }}>{data.isOpen ? "Opened" : "Closed"}</Button>
          </CardActions>
       </Card>
       ))}
    </Stack>
</ClientLayout>
  )
  
}

export default ClientRestaurant
