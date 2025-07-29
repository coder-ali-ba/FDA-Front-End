
import React, { useEffect, useState } from 'react';
import VendorLayout from '../../../../Components/LayoutComp/VendorLayout'
import MenuModal from "../../../../Modals/MenuModals"
import { Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../../../Utils/utility';
import endPoints from '../../../../Constants/apiEndPoints';
import Cookies from 'js-cookie';
import MenuCard from "../../../../Components/MenuCards/MenuCards"


function Menu() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [cards , setCards] = useState([])


    useEffect(()=>{
      getAllMenues()
    }, [])

    const getAllMenues = async() => {
      const response = await axios.get(`${BASE_URL}${endPoints.getAllMenues}`,{
        headers : {
          Authorization : `Bearer ${Cookies.get("authToken")}`
        }
      }) 

      setCards(response.data.data)
      
    }
  
  return (
    <VendorLayout>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h5" align="center" gutterBottom>
          Menu Items
          </Typography>
          <Button variant='contained' onClick={handleOpen}>Create Menu</Button>
        </Stack>


      {open && <MenuModal   Close={handleClose}/>}

        < MenuCard  allCards={cards} />
      
    </VendorLayout>
  )
}

export default Menu
