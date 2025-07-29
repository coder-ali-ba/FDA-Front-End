import React, { useEffect, useState } from 'react'
import Clientlayout from "../../../Components/LayoutComp/ClientLayout"
import axios from 'axios'
import { BASE_URL } from '../../../Utils/utility'
import endPoints from '../../../Constants/apiEndPoints'
import Cookies from "js-cookie"
import { Box, Button, Stack, Typography } from '@mui/material'
import SingleRestaurantComponent from '../../../Components/singleRestaurantComponent/singleRestaurantComponent'


function  ClientDashboard () {
  const [rests , setRests] = useState([])
  // const [approvedMenu , setApprovedMenu]=useState([])
  const [open , setOpen] = useState(false)
  const [id , setId]=useState()


 useEffect(()=>{
  getFunc()
  // getMenu()
 },[])


  const getFunc = async() =>{
      const allRestaurants = await axios.get(`${BASE_URL}${endPoints.getApprovedRestaurant}`,{
         headers : {
           Authorization : `Bearer ${Cookies.get("authToken")}`
         }
      })

     const{data} = allRestaurants.data
     setRests(data)
  }

  // const getMenu = async()=>{
  //       const response = await axios.get(`${BASE_URL}${endPoints.approvedMenu}`,{
  //           headers : {
  //               Authorization : `Bearer ${Cookies.get("authToken")}`
  //           }
  //       })       
  //       setApprovedMenu(response.data.data)
  //   }

  // console.log(approvedMenu);
  

  const handleOpen = (id) => {
    setOpen(true)
    setId(id)
  };
  
  
  
  return (
    <Clientlayout>
             {
              open && (<SingleRestaurantComponent  openClose={setOpen} restId={id}/>)
             }
            {!open && <div>
        <Typography align='center' variant='h6'>Restaurants</Typography>
      <Stack direction={"row"} flexWrap={"wrap"} gap={"50px"} justifyContent={"center"}>
        {rests.map((rest , index)=>(
          <Box component={"button"} onClick={()=>handleOpen(rest.restaurantName)} key={index} sx={{ width:"350px",borderRadius:"5px", boxShadow:"3px 3px 3px 3px lightGray", padding:"10px"}}>
             <Box>
              <img src={rest.imageUrl} alt=""
                 width={"180px"}
                 style={{borderRadius:"10px"}}
              />
             </Box>
             <Box pl={"10px"} >
              <Typography variant='h5' mr={"10px"}>{rest.restaurantName}</Typography>
              <Typography mr={"10px"}>{rest.details}</Typography>
              <Typography color='green' mr={"10px"}>{rest.address}</Typography>
              <Typography color='blue' mr={"10px"}>{rest.email}</Typography>             
             </Box>
             
          </Box>
             
        ))}
      </Stack>


      
      {/* <Stack>
        <Typography>jdnfjkd</Typography>
      </Stack> */}


      </div>}
             

    </Clientlayout>
  )
}


export default ClientDashboard
