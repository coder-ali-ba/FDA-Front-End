import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../Components/LayoutComp/AdminLayout'
import axios from 'axios'
import { BASE_URL } from '../../../Utils/utility.js'
import endPoints from '../../../Constants/apiEndPoints.js'
import Cookies from 'js-cookie'
import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material'

function AllMenu() {
   const [menus , setMenus] =useState([])

    useEffect(()=>{
        getAllMenues()
    })
    const getAllMenues = async()=> {
        const response = await axios.get(`${BASE_URL}${endPoints.adminMenues}`,{
            headers : {
               Authorization : `Bearer ${Cookies.get("authToken")}`
            }
        })
        setMenus(response.data.data)       
    }

    const handleDelete = async(id) => {
      const response = await axios.delete(`${BASE_URL}${endPoints.deleteMenu}/${id}`,{
        headers : {
          Authorization : `Bearer ${Cookies.get("authToken")}`
        }
      })
      console.log(response);     
    }


    const handleActive = async(id) => {
      const response = await axios.patch(`${BASE_URL}${endPoints.menuActivate}/${id}`,{},{
        headers : {
          Authorization : `Bearer ${Cookies.get("authToken")}`
        }
      })
      console.log(response);    
      console.log("handleActive" , id);
      
    }


  return (
    <AdminLayout>
        <h3 style={{textAlign:"center", marginTop:"-20px"}}>All Menues</h3>
        <Stack direction={"row"} justifyContent={"center"} flexWrap={"wrap"} gap={"30px"}>
        {menus.map((menu , index)=>(
            <Card sx={{ maxWidth: 345 }} key={index}>
             <CardMedia
              sx={{ height: 140 }}
              image={menu.imageURL}
              title="green iguana"
             />
             <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Item Name : {menu.itemName}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Restaurant : {menu.restaurantName}
                </Typography>
                <Typography gutterBottom  component="div">
                  Item Desc :{menu.itemDesc}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                 Item Price ; {menu.itemPrice}
                </Typography>
             </CardContent>
             <CardActions>
               <Button size="small" variant='contained' sx={{backgroundColor:'red'}} onClick={()=>handleDelete(menu._id)}>Delete</Button>
               <Button size="small" variant='contained' sx={{backgroundColor :'orange'}}onClick={()=>handleActive(menu._id)} >{menu.isApproved ? "inActive" : "Active"}</Button>
             </CardActions>
          </Card>
        ))
       }
       </Stack>
    </AdminLayout>
      
    
  )
}

export default AllMenu
