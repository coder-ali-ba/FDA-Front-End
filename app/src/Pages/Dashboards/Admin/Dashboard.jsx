import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../Components/LayoutComp/AdminLayout'
import axios from 'axios'
import { BASE_URL } from '../../../Utils/utility'
import endPoints from '../../../Constants/apiEndPoints'
import Cookies from 'js-cookie'
import { Box, Stack, Typography } from '@mui/material'
import logo from '../../../assets/ChatGPT Image Jul 25, 2025, 07_16_33 PM.png'



function AdminDashboard() {
  const [datas , setDatas]=useState([])
  const [rests , setRests]=useState([])
  const [menues , setMenus] =useState([])
  const [allVendors , setAllVendors] =useState([])
  const[allUsers , setAllUsers] =useState([])

  useEffect(()=>{
    myDatas()
    getAllRests()
    getVendors()
    getCustomers()
    getAllMenues() 
  } , [])

  const myDatas = async() => {
    const response = await axios.get(`${BASE_URL}${endPoints.getMyData}`,{
      headers : {
        Authorization : `Bearer ${Cookies.get("authToken")}`
      }
    })
  
    const {data} = response.data
    setDatas(data)
     
  }

  const getAllRests = async () => {
    const response = await axios.get(`${BASE_URL}${endPoints.getAdminEndPoint}`,{
         headers : {
          Authorization : `Bearer ${Cookies.get("authToken")}`
         }
      });
    const {data} = response.data
    setRests(data) 
    
  }


   const getAllMenues = async()=> {
        const response = await axios.get(`${BASE_URL}${endPoints.adminMenues}`,{
            headers : {
               Authorization : `Bearer ${Cookies.get("authToken")}`
            }
        })
        setMenus(response.data.data)       
    }


  
  const getVendors = async()=>{
        const response = await axios.get(`${BASE_URL}${endPoints.allVendors}`,{
            headers : {
                Authorization : `Bearer ${Cookies.get("authToken")}`
            }
        })

        // console.log(response.data);
        const{data}=response.data
        setAllVendors(data)       
    }  


    
    const getCustomers = async() => {
        const response =await axios.get(`${BASE_URL}${endPoints.getAllCustomers}`,{
            headers : {
                Authorization : `Bearer ${Cookies.get("authToken")}`
            }
        })
        const {data} =response.data  
        setAllUsers(data)     
    }
  
  

  return (
    <AdminLayout>
      <h4 style={{textAlign:'center', marginTop:"-20px"}}>Dashboard</h4>
      <Stack direction={"row"} alignItems={"center"} flexWrap={"wrap"} justifyContent={"space-between"} bgcolor={"green"}mt={"-10px"} padding={"10px"} color={"white"}>      
        <Typography>Name# {datas.name}</Typography>
        <Typography>Email# {datas.email}</Typography>
        <Typography>Type# {datas.type}</Typography>
        <Typography>Ph# {datas.phNumber}</Typography>
      </Stack>
      <Stack direction={"row"} mt={"20px"} gap={"5px"} flexWrap={"wrap"} justifyContent={"space-between"}>
        <Box sx={{
          width:"300px",
          textAlign:"center",
          padding:"10px",
          
        }}>
          <img src={logo} alt="" style={{height:"170px"}}/>
          <Typography variant='h6'>Number Of Approved Restaurants</Typography>
          <Typography variant='h6' sx={{backgroundColor:"#3B82F6" ,color:"white"}}>{rests.length}</Typography>
        </Box>       
        <Box sx={{
          width:"300px",
          textAlign:"center",
          padding:"10px", 
          
          display:"flex",
          flexDirection:"column",
          justifyContent:"space-between"        
        }}>
          <img src={logo} alt="" style={{height:"170px"}}/>
           <Typography variant='h6'>Number Of Approved Menues</Typography>
           <Typography variant='h6' sx={{backgroundColor:"#3B82F6", color:"white"}}>{menues.length}</Typography>
        </Box>       
        <Box sx={{
          width:"300px",
          textAlign:"center",
          padding:"10px",
          display:"flex",
          flexDirection:"column",
          justifyContent:"space-between"          
        }}>
          <img src={logo} alt="" style={{height:"170px"}}/>
           <Typography variant='h6'>Number Of Approved Merchants</Typography>
           <Typography variant='h6' sx={{backgroundColor:"#3B82F6" , color:"white"}}>{allVendors.length}</Typography>
        </Box>       
        <Box sx={{
          width:"300px",
          textAlign:"center",
          padding:"10px",
          display:"flex",
          flexDirection:"column",
          justifyContent:"space-between"          
        }}>
           <img src={logo} alt="" style={{height:"170px"}}/>
           <Typography variant='h6'>Number Of Approved Customer</Typography>
           <Typography variant='h6' sx={{backgroundColor:"#3B82F6" , color:"white"}}>{allUsers.length}</Typography>
        </Box>       
        {/* <Box sx={{
          width:"300px",
          backgroundColor : "yellowgreen",
          textAlign:"center",
          padding:"10px",
          
        }}></Box>        */}
      </Stack>
    </AdminLayout>
  )
}

export default AdminDashboard
