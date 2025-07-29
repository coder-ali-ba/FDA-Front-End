import React, { useEffect, useState } from 'react'
import ClientLayout from '../../../Components/LayoutComp/ClientLayout'
import axios from 'axios'
import { BASE_URL } from '../../../Utils/utility.js'
import endPoints from '../../../Constants/apiEndPoints.js'
import Cookies from 'js-cookie'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Typography } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PlaceOrder from '../../../Modals/PlaceOrder.jsx'



function ClientMenu() {
    const[approvedMenu , setApprovedMenu] = useState([])
    const [open , setOpen]=useState(false)
    const handleOpen = ()=>setOpen(true)
    const handleClose =()=>setOpen(false)

    useEffect(()=>{
        getMenu()
    },[])

    const getMenu = async()=>{
        const response = await axios.get(`${BASE_URL}${endPoints.approvedMenu}`,{
            headers : {
                Authorization : `Bearer ${Cookies.get("authToken")}`
            }
        })       
        setApprovedMenu(response.data.data)
    }
    
  return (
    <ClientLayout>
          <h3 style={{textAlign:"center"}}>ClientMenu</h3>
        
        <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"20px"}}>
        {approvedMenu.map((menu , index)=>(

           <Card
      sx={{
        maxWidth: 360,
        borderRadius: 1,
        boxShadow: 6,
        background: '#f9fbff',
        overflow: 'hidden',
      }}
    >
      
        <CardMedia
          component="img"
          height="220"
          image={menu.imageURL}
          alt={menu.itemName}
          sx={{ objectFit: 'cover', transition: '0.3s', '&:hover': { transform: 'scale(1.02)' } }}
        />
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6" fontWeight="bold" color="primary">
              {menu.itemName}
            </Typography>
            <Chip
              icon={<AttachMoneyIcon />}
              label={`${menu.itemPrice}`}
              color="success"
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            <InfoOutlineIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
            {menu.itemDesc}
          </Typography>

          <Typography variant="caption" display="flex" alignItems="center" color="text.secondary" mb={"30px"}>
            <RestaurantIcon fontSize="small" sx={{ mr: 0.5 }} />
            {menu.restaurantName}
          </Typography>

          
          {
            open && <PlaceOrder close={handleClose} item={menu}/>
          }

                <Button variant='contained' fullWidth onClick={()=>handleOpen()}>PlaceOrder</Button>

        </CardContent>      
    </Card>

        ))}
        </div>
    </ClientLayout>
  )
}

export default ClientMenu
