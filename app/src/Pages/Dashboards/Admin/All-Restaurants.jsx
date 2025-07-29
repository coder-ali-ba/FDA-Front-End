import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../Components/LayoutComp/AdminLayout'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import axios from 'axios'
import { BASE_URL } from '../../../Utils/utility'
import endPoints from '../../../Constants/apiEndPoints'
import Cookies from 'js-cookie'
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew';


 
function AllRestaurants() {
 
const [datas , setDatas] =useState([])

  useEffect(()=>{     
       getAllRestaurants()
  } , [])

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

  const handleDelete = async(id) => {
      const response = await axios.delete(`${BASE_URL}${endPoints.deleteResEndPoint}/${id}` , {
        headers : {
          Authorization : `Bearer ${Cookies.get("authToken")}`
        }
      })         
        getAllRestaurants()      
  }

  const handleApproval = async (id) => {
     const response = await axios.patch(`${BASE_URL}${endPoints.approveEndPoint}/${id}`,{},{
      headers :{
        Authorization : `Bearer ${Cookies.get("authToken")}`
      }
     })
     getAllRestaurants()       
  }
  
  return (
    <AdminLayout>
        <h3 style={{textAlign:"center", marginTop:"-20px"}}>All Restaurants</h3>
        <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Restaurant Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Category</strong></TableCell>
            <TableCell><strong>Is Open</strong></TableCell>
            <TableCell><strong>Is Approved</strong></TableCell>
            <TableCell><strong>Created By</strong></TableCell>
            <TableCell><strong>Is Deleted</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { datas.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{data.restaurantName}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.category}</TableCell>
              <TableCell>{data.isOpen ? "Opened" : "Closed"}</TableCell>
              <TableCell>{data.isApproved ? "Approved" : "UnApproved"}</TableCell>
              <TableCell>{data.createBy}</TableCell>
              <TableCell>{data.isDeleted ? "Deleted" : "Active"}</TableCell>
              <TableCell>
                <Tooltip title="delete">
                  <DeleteIcon onClick={()=>{handleDelete(data._id)}}></DeleteIcon>
                </Tooltip>
                <Tooltip title="change status">
                  <AutorenewIcon onClick={()=>{handleApproval(data._id)}}></AutorenewIcon>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </AdminLayout>
    
  )
}

export default AllRestaurants
