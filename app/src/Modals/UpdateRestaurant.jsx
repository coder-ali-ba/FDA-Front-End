import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Controller, useForm } from 'react-hook-form';
import { Stack, TextField } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import { BASE_URL } from '../Utils/utility';
import endPoints from '../Constants/apiEndPoints';
import Cookies from 'js-cookie';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UpdateRestaurantModal({setOpenEdit , editId , getAll}) {
 
 const {handleSubmit , control } = useForm() 


 
 const onSubmit = async(obj) => {
  try {
    const response = await axios.put(`${BASE_URL}${endPoints.editResEndPoint}/${editId}` , obj ,{
      headers : {
        Authorization : `Bearer ${Cookies.get("authToken")}`
      }
    });
    console.log(response);
    
    setOpenEdit(false)
    getAll()
  } catch (error) {
    console.log(error.message);    
  }
  
    
 }

  return (
    <div>
  
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         
        <Box sx={style}>
          <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
          
                <Typography  variant="h5" margin={"auto"} mb={"10px"}>Create Restaurant
                  <HighlightOffIcon sx={{ml:"30px"}} onClick={()=>setOpenEdit(false)}></HighlightOffIcon>
                </Typography>
                 
                <Controller
                  control={control}
                  name="restaurantName"
                  render={({field , formState : {errors},
                  }) => (
                    <TextField 

                      {...field}
                      required
                      label ='Name'
                    />
                   )}
                />

                <Controller
                  control={control}
                  name="details"
                  render={({field , formState : {errors},
                  }) => (
                    <TextField 

                      {...field}
                      required
                      label ='Details'
                    />
                   )}
                />

                <Controller
                  control={control}
                  name="contactNumber"
                  render={({field , formState : {errors},
                  }) => (
                    <TextField 

                      {...field}
                      required
                      label ='PhNumber'
                    />                   
                   )}
                />

                <Controller
                  control={control}
                  name="address"
                  render={({field , formState : {errors},
                  }) => (
                    <TextField 

                      {...field}
                      required
                      label ='Address'
                    />                   
                   )}
                />

                <Controller
                  control={control}
                  name="email"
                  render={({field , formState : {errors},
                  }) => (
                    <TextField 

                      {...field}
                      required
                      label ='email'
                    />                   
                   )}
                />

                <Controller
                  control={control}
                  name="category"
                  render={({field , formState : {errors},
                  }) => (
                    <TextField 

                      {...field}
                      required
                      label ='category'
                    />                   
                   )}
                />

                <Button variant='contained' type='submit'>Update Restaurant</Button>
            </Stack>
        </Box>
      </Modal>
    </div>
  );
}
