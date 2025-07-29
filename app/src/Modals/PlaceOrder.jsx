import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { Paper, TextField } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../Utils/utility.js';
import endPoints from '../Constants/apiEndPoints.js';
import Cookies from 'js-cookie';




export default function PlaceOrder({close , item}) {
  

  

  const handleOrder = async()=>{ 
        const obj ={
          itemName : item.itemName,
          restaurant :item.restaurantName,
          price :item.itemPrice,
          detail:item.itemDesc
        }  
    
        const response = await axios.post(`${BASE_URL}${endPoints.placeOrder}`,obj,{
          headers : {
            Authorization : `Bearer ${Cookies.get("authToken")}`
          }
        })
        console.log(response);
        

        alert("your Order has been placed please wait for response")
  }




  return (
    <div>
      <Button >Open modal</Button>
      <Modal
        keepMounted
        open={open}
        onClose={close}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        
      >
       <Box sx={{backgroundColor: "white", width:"350px", margin:"auto", padding:"20px", borderRadius:"10px"}}>
        <img src={item.imageURL} alt="" />
         <Typography variant="h4" align="center" gutterBottom>
           Place Order
         </Typography>
         <Typography variant="h5" align="center" gutterBottom>
           Item Name : {item.itemName}
         </Typography>
         <Typography variant="h6" align="center" gutterBottom>
         { ` Item Price : Rs-${item.itemPrice}`}
         </Typography>
         <Typography align="center" gutterBottom>
           Item Details : {item.itemDesc}
         </Typography>
         <Button variant='contained' onClick={handleOrder} fullWidth>PalceOrder</Button>
       </Box>
      
      </Modal>
    </div>
  );
}
