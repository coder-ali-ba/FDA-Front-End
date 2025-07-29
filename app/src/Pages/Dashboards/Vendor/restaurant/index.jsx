import React, { useState } from 'react'
import VendorLayout from '../../../../Components/LayoutComp/VendorLayout'
import RestaurantCard from '../../../../Components/restaurantCards/Card'
import { Button, Stack, Typography } from '@mui/material'
import AddResortModal from '../../../../Modals/AddRestaurant'

function Restaurant() {
  const[openCreate , setOpenCreate] = useState(false)
  // const createRestaurant = () => {
  //   setOpenCreate(!openCreate)
  // }
  return (
    <VendorLayout>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant='h4'>Restaurants</Typography>
          
            <AddResortModal/>       
          
        </Stack>
        <RestaurantCard />
    </VendorLayout>
    
  )
}

export default Restaurant


