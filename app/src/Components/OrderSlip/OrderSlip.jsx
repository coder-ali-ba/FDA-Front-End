import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../Utils/utility';
import endPoints from '../../Constants/apiEndPoints';
import Cookies from 'js-cookie';


function OrderSlip({ menu }) {
  const [menuItems , setMenuItems] =useState([])
  const [menuPrice ,setMenuPrice] =useState([])

  // console.log(menu);
  
  const totalPrice = menu.reduce((sum, item) => {
  const price = parseFloat(item.itemPrice);
  return sum + price;
}, 0);


// setMenuItems(menu.map(item => item.itemName));
useEffect(() => {
  setMenuItems(menu.map(item => item.itemName));
  setMenuPrice(menu.map(item => item.itemPrice));
}, [])
  



const handlePlaceOrder = async() => {
  

  const orderObj = {
    items :menuItems,
    prices :menuPrice,
    restaurant : menu[0].restaurantName,
    totalPrice : totalPrice
  }


  const response = await axios.post(`${BASE_URL}${endPoints.multipleOrders}`,orderObj,{
    headers : {
      Authorization : `Bearer ${Cookies.get("authToken")}`
    }
  })
  
  alert('Your Order Has Been placed')
  
  
}
  
    
    
    
  return (
    <div>
      <Stack>
        

        <TableContainer component={Paper} sx={{padding:"10px"}}>
          <Typography align='center' variant='h5' sx={{backgroundColor:"#076aebff", color:"white"}}>Sale Reciept</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Item Description</strong></TableCell>
            <TableCell><strong>Item Name</strong></TableCell>
            <TableCell><strong>Item Price</strong></TableCell>
            <TableCell><strong>Restaurant Name</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {menu.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.itemDesc}</TableCell>
              <TableCell>{row.itemName}</TableCell>
              <TableCell>{row.itemPrice}</TableCell>
              <TableCell>{row.restaurantName}</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
        
      </Table>
      <Box align="center">
        <Typography>Total = {totalPrice} </Typography>
        <Button variant="contained" onClick={handlePlaceOrder}>Order</Button>
      </Box>
      
    </TableContainer>
        
      </Stack>
    </div>
  )
}

export default OrderSlip
