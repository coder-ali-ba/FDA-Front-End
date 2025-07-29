import React, { useEffect, useState } from 'react'
import VendorLayout from '../../../../Components/LayoutComp/VendorLayout'
import axios from 'axios'
import { BASE_URL } from '../../../../Utils/utility'
import endPoints from '../../../../Constants/apiEndPoints'
import Cookies from 'js-cookie'
import { Stack, Typography } from '@mui/material'


function VendorDashboard() {
  const [datas , setDatas]=useState([])

  useEffect(()=>{
    getMyDATAS()
  } ,[])

  const getMyDATAS = async()=>{
     const response = await axios.get(`${BASE_URL}${endPoints.getMyData}`,{
      headers : {
        Authorization : `Bearer ${Cookies.get("authToken")}`
      }
    }) 
    const {data} = response.data
    setDatas(data)        
  }

  
 
  
  return (
    <VendorLayout>
      <h3 style={{
        marginTop:"-10px",
        textAlign:"center"
      }}>DashBoard</h3>
      <Stack direction={"row"} alignItems={"center"} flexWrap={"wrap"} justifyContent={"space-between"} bgcolor={"green"}mt={"-10px"} padding={"10px"} color={"white"}>      
        <Typography>Name# {datas.name}</Typography>
        <Typography>Email# {datas.email}</Typography>
        <Typography>Type# {datas.type}</Typography>
        <Typography>Ph# {datas.phNumber}</Typography>
      </Stack>
    </VendorLayout>
  )
}

export default VendorDashboard
