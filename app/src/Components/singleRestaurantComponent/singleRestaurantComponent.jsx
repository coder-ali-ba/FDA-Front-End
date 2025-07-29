import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../Utils/utility';
import endPoints from '../../Constants/apiEndPoints';
import Cookies from 'js-cookie';
import { Box, Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import OrderSlip from '../OrderSlip/OrderSlip';



function SingleRestaurantComponent({openClose , restId}) {
    const [menues , setMenues] =useState([])
    const [count , setCount] = useState(0)
    const [addedItems, setAddedItems] = useState([]);
    const [openSlip , setOpenSlip] =useState(false)
    const [selectedMenu , setSelectedMenu] =useState([])
    

    useEffect(()=>{
        getSinglerest()
    })

    const getSinglerest = async ()=>{
        const response =await axios.get(`${BASE_URL}${endPoints.getSingleRest}/${restId}`,{
            headers : {
                Authorization : `Bearer ${Cookies.get("authToken")}`
            }
        }) 
        
        const {data} =response.data
        setMenues(data)       
    }


    
    const handleAddToCart = (menu) => {
         setAddedItems((prev) => [...prev , menu.itemName])
         setCount((prevCount) => prevCount + 1);
         setSelectedMenu((prev)=> [...prev , menu])        
    }
    
  return (
    <div >
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <h1>Selected Restaurant Menu</h1>
            <CloseIcon onClick={()=>close(openClose(false))}></CloseIcon>
        </Box>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <FoodBankIcon fontSize='large' onClick={()=>setOpenSlip(true)}></FoodBankIcon> 
            {count}
        </Box>
        {openSlip && <OrderSlip  menu={selectedMenu}/>}
        
      {!openSlip && (<Box display={"flex"} gap={"20px"} width={"100%"} flexWrap={"wrap"}>
        {
            menues.map((menu)=>(
              <Card key={menu.itemName} sx={{ width: 350, display: "flex", flexDirection: "column" }}>
          <CardMedia
            component="img"
            height="200"
            image={menu.imageURL}
            alt={menu.itemName}
            sx={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {menu.itemName}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {menu.itemDesc}
            </Typography>
            <Typography variant="subtitle1" color="primary" fontWeight="bold">
              ${menu.itemPrice}
            </Typography>
          </CardContent>
          <Box textAlign="center" pb={2}>
            <Button
              variant="contained"
              color="primary"
              disabled={addedItems.includes(menu.itemName)}
              onClick={() => handleAddToCart(menu)}
            >
              {addedItems.includes(menu.itemName) ? "Added" : "Add to Cart"}
            </Button>
          </Box>
        </Card>
            ))
        }
      </Box>)}
    </div>
  )
}

export default SingleRestaurantComponent
