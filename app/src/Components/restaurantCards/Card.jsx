import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  Button
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { BASE_URL } from '../../Utils/utility';
import Cookies from 'js-cookie';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import endPoints from '../../Constants/apiEndPoints';
import UpdateRestaurantModal from '../../Modals/UpdateRestaurant';


const RestaurantCard = () => {
 

  const [datas , setDatas] = React.useState([])
  const [openEdit , setOpenEdit] =useState(false)
  const [idToEdit , setIdToEdit] = useState(null)

  
  useEffect(()=>{
     getRestaurants()
  },[])
  const getRestaurants = async() => {
    try {
      const response = await axios.get(`${BASE_URL}${endPoints.getResEndPoint}`, {
      headers:{
        Authorization : `Bearer ${Cookies.get("authToken")}`
      }
    })
    // console.log(response);
    
    setDatas(response.data.data)  
      
    } catch (error) {
      console.log(error.message);
      
    }
     
  }
   
  

  const handleEdit = (id) => {
    console.log("Edit Restaurant");  
    setIdToEdit(id)
    setOpenEdit(true)  
  }

  const handleDelete = async(id) => {    
    try {
      const response = await axios.delete(`${BASE_URL}${endPoints.deleteResEndPoint}/${id}` ,{
      headers :{
        Authorization : `Bearer ${Cookies.get("authToken")}` 
      }
    })
    getRestaurants()
    } catch (error) {
      console.log(error.message);
    }   
  }

  const handleApprove = async(id) =>{    
      try {
        const response = await axios.patch(`${BASE_URL}${endPoints.approveResEndPoint}/${id}`,{} ,{
        headers :{
          Authorization : `Bearer ${Cookies.get("authToken")}` 
        }
      })
      alert(response.data.message)     
      getRestaurants()
       
      } catch (error) {
        console.log(error.message);       
      }     
  }

  
  
  return (

   < >
   <div style={{display :"flex" , flexWrap:"wrap", gap:"5px"}}>
   {datas.map((data)=>(
      <Card sx={{ maxWidth: 350,  borderRadius: 3, boxShadow: 3 }} >
      <CardContent>
        
        <Stack direction={"row"} justifyContent={'space-between'}>
           
           <Typography variant="h5" gutterBottom>
             {data.restaurantName}
           </Typography>
           <Stack direction={"row"} gap={"10px"}>
            <EditOutlinedIcon onClick={()=>handleEdit(data._id)}></EditOutlinedIcon>
            <ClearOutlinedIcon onClick={()=>{
              handleDelete(data._id)
              }}>
            </ClearOutlinedIcon>
           </Stack>
           
        </Stack>
        <img src={data.imageUrl} style={{height:"200px", width:"100%"}} />

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {data.details}
        </Typography>

        <Box sx={{ mt: 1 }}> 
               {openEdit && <UpdateRestaurantModal setOpenEdit={setOpenEdit} editId={idToEdit} getAll={getRestaurants}/>}       
             
              <Typography variant="body2"><strong>Contact:</strong> {data.contactNumber}</Typography>
              <Typography variant="body2"><strong>Email:</strong> {data.email}</Typography>
              <Typography variant="body2"><strong>Address:</strong> {data.address}</Typography>
              <Typography variant="body2"><strong>Category:</strong> {data.category}</Typography>
        </Box>  

        <Stack direction="row" spacing={1} sx={{ mt: 1, mb: 2 }}>
          <Chip
            label={data.isOpen ? 'Open' : 'Closed'}
            color={data.isOpen ? 'success' : 'default'}
            icon={data.isOpen ? <CheckCircleIcon /> : <CancelIcon />}
            onClick={()=>{
              handleApprove(data._id)
            }}
          />
          <Chip
            label={data.isApproved ? 'Approved' : 'Pending'}
            color={data.isApproved ? 'primary' : 'warning'}
            icon={data.isApproved ? <CheckCircleIcon /> : <CancelIcon />}
          />
        </Stack>      
                
      </CardContent>
    </Card>

   ))
    }
    {/* <h1>iyuihi</h1> */}
    </div>
    </>
 
  );
};

export default RestaurantCard;