import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../Components/LayoutComp/AdminLayout'
import axios from 'axios'
import { BASE_URL } from '../../../Utils/utility'
import Cookies from 'js-cookie'
import endPoints from '../../../Constants/apiEndPoints'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'


function Orders() {
  const [datas , setDatas] =useState([])

  useEffect(()=>{
         getAllOrders()
  })

  const getAllOrders = async() => {
    const response = await axios.get(`${BASE_URL}${endPoints.allOrders}`,{
      headers : {
        Authorization : `Bearer ${Cookies.get("authToken")}`
      }
    })
    
    const {data} = response.data
    setDatas(data)
  }

  // console.log(datas);
  
  return (
        <AdminLayout>
            
            
            <TableContainer component={Paper} sx={{ margin: 'auto' }}>
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        Order Details
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Items</TableCell>
            <TableCell>Restaurant</TableCell>
            <TableCell>Prices</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Ordered By</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
          
        </TableHead>
        <TableBody>
          {datas.map((data , index)=>(
             <TableRow key={index}>
                  <TableCell>
                  {data.items.map((item )=>(                     
                        <Typography>{item}</Typography>                     
                  ))}
                  </TableCell>
                  <TableCell>{data.restaurant}</TableCell>
                  <TableCell>
                    {
                      data.prices.map((price)=>(
                        <Typography>{price}</Typography>
                      ))
                    }
                  </TableCell>
                  <TableCell>{data.totalPrice}</TableCell>
                  <TableCell>{data.orderedBy}</TableCell>
                  <TableCell 
                     sx={{
                      backgroundColor:
                         data.status === 'accepted'
                        ? 'success.main'
                        : data.status === 'cancelled'
                        ? 'error.main'
                        : data.status === 'pending'
                        ? 'warning.main'
                        : data.status === 'delivered'
                        ? 'primary.main'
                        : 'grey.300', // fallback
                        color: 'white' // optional: makes text readable
                     }}
                  >
                    {data.status === 'accepted' &&  "accepted"}
                    {data.status === 'cancelled' && "cancelled"}
                    {data.status === 'pending' && "pending"}
                    {data.status === 'delivered' &&  "delivered"}
                  </TableCell>
             </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
            
        </AdminLayout>    
  )
}

export default Orders
