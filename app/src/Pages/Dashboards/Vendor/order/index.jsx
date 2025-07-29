import { useEffect, useState } from 'react'
import VendorLayout from '../../../../Components/LayoutComp/VendorLayout'
import axios from 'axios'
import { BASE_URL } from '../../../../Utils/utility.js'
import endPoints from '../../../../Constants/apiEndPoints.js'
import Cookies from 'js-cookie'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';


function Order() {
  const[myOrders , setMyOrders] = useState([])
  useEffect(()=>{
     getOrders()
  },[])

  const getOrders = async () => {
    const response = await axios.get(`${BASE_URL}${endPoints.orderTomyRest}`,{
      headers : {
        Authorization : `Bearer ${Cookies.get("authToken")}`
      }
    })
    
    const {data} = response.data
    setMyOrders(data)    
  }



  const handleAccepted = async (id) => {
    const response = await axios.patch(`${BASE_URL}${endPoints.acceptOrder}/${id}`,{},{
      headers : {
        Authorization : `Bearer ${Cookies.get("authToken")}`
      }     
    }) 
    getOrders()
  }

  const handleCancel = async(id) => {
    const response = await axios.patch(`${BASE_URL}${endPoints.cancelOrder}/${id}`,{},{
      headers : {
        Authorization : (`Bearer ${Cookies.get("authToken")}`)
      }
    })
    getOrders()
    
  }
  const handlePending   = () => {
    console.log("handlePending");
    
  }
  const handleDelivered = async(id) => {
    const response = await axios.patch(`${BASE_URL}${endPoints.deliverOrder}/${id}`,{},{
      headers : {
        Authorization : `Bearer ${Cookies.get("authToken")}`
      }
    })
    getOrders()   
  }
  

  return (
    <VendorLayout>
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
              <TableCell>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
              {myOrders.map((order , index)=>(
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
                    {order.status === 'accepted' &&  "accepted"}
                    {order.status === 'cancelled' && "cancelled"}
                    {order.status === 'pending' && "pending"}
                    {order.status === 'delivered' &&  "delivered"}
                  </TableCell>
                  <TableCell>
                    {<CheckCircleIcon onClick={()=>handleAccepted(order._id)} color="success" />}
                    {<CancelIcon onClick={()=>handleCancel(order._id)} color="error" />}
                    {<HourglassEmptyIcon onClick={handlePending} color="warning" />}
                    {<LocalShippingIcon onClick={()=>handleDelivered(order._id)} color="primary" />}
                  </TableCell>
                </TableRow>
              ))
                
             
              }
              
          </TableBody>
         </Table>
    </VendorLayout>
    
  )
}

export default Order
