import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../Components/LayoutComp/AdminLayout'
import axios from 'axios'
import { BASE_URL } from '../../../Utils/utility'
import endPoints from '../../../Constants/apiEndPoints'
import Cookies from 'js-cookie'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import AutorenewIcon from '@mui/icons-material/Autorenew';



function AllCustomers() {
    const[allUsers , setAllUsers] =useState([])

    useEffect(()=>{
       getCustomers()
    } , [])

    const getCustomers = async() => {
        const response =await axios.get(`${BASE_URL}${endPoints.getAllCustomers}`,{
            headers : {
                Authorization : `Bearer ${Cookies.get("authToken")}`
            }
        })
        const {data} =response.data  
        setAllUsers(data)     
    }

    const handleApproval = async(id) => {
         
         const response = await axios.patch(`${BASE_URL}${endPoints.changeCustomerStatus}/${id}`,{},{
            headers : {
                Authorization : `Bearer ${Cookies.get("authToken")}`
            }
         })        
          getCustomers()
    }
    
  return (
    <AdminLayout>
        <TableContainer sx={{backgroundColor:"lightgray", marginTop:"-10px"}}>
           <h4 style={{textAlign:"center", borderBottom :"2px solid gray"}}>ALL CUSTOMERS</h4>
          <Table>
            <TableHead>
                <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Type</strong></TableCell>
                    <TableCell><strong>Is Varified</strong></TableCell>
                    <TableCell><strong>Action</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {allUsers.map((user)=>(
                    <TableRow key={user.name}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.type}</TableCell>
                      <TableCell>{user.isVarified ? "Yes" : "No"}</TableCell>
                      <TableCell>
                         <Tooltip title="change status">
                            <AutorenewIcon onClick={()=>{handleApproval(user._id)}}></AutorenewIcon>
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

export default AllCustomers
