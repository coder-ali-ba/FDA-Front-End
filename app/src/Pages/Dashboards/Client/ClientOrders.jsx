import ClientLayout from '../../../Components/LayoutComp/ClientLayout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Utils/utility.js'
import endPoints from '../../../Constants/apiEndPoints.js'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

function ClientOrders() {
  const[orders , setOrders] =useState([]) 

  useEffect(()=>{
    getMyOrders()
  },[])


  const getMyToken = Cookies.get("authToken")

  const getMyOrders = async() => {
    const response = await axios.get(`${BASE_URL}${endPoints.getMyOrders}/${getMyToken}`,{
      headers : {
        Authorization : `Bearer ${getMyToken}`
      }
    })

    const {data} =response.data;
    setOrders(data)   
  }


  return (
    <ClientLayout>
        <h3 style={{textAlign:"center"}}>your Orders</h3>
         <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Items
              </TableCell>
              <TableCell>
                Price
              </TableCell>
              <TableCell>
                Restaurant
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
              {orders.map((order , index)=>(
                  <TableRow key={index}>
                    
                      <TableCell>
                        {
                          order.items.map((item)=>(
                            <Typography>{item}</Typography>
                          ))
                         }
                        
                      </TableCell>
                      
                                       
                    
                   <TableCell>
                       {order.totalPrice}
                  </TableCell>
                  <TableCell>
                    {order.restaurant}
                  </TableCell>
                  <TableCell>
                    {order.status === "pending"
                     ? "Pending"
                     : order.status === "accepted"
                     ? "Accepted"
                     : "Delivered"}
                  </TableCell>
                </TableRow>
              ))
                
             
              }
              
          </TableBody>
         </Table>
    </ClientLayout> 
  )
}

export default ClientOrders




