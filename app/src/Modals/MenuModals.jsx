import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Form } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
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

export default function MenuModal({Close}) {
  const {control, handleSubmit  } = useForm()

  const [names , setNames] = React.useState([])
  const [image , setImage] = React.useState()

 React.useEffect(()=>{
    getNames()
 })

 const getNames = async() => {
    const allNames =await axios.get(`${BASE_URL}${endPoints.getAllNames}`,{
        headers : {
            Authorization : `Bearer ${Cookies.get("authToken")}`
        }
    })
    
    
    setNames(allNames.data.data)
 }

 const handleImageChange = (event) => {
      setImage(event.target.files[0])
 }

 
 


  const submitHandler=async(obj)=>{
     let profileURL;
      const api = `${BASE_URL}${endPoints.addPhoto}`
      const formData = new FormData();
      formData.append("image" , image)

       const uploadImage = await axios.post(api , formData , {
        headers :{
          "Content-Type" : "multipart/form-data",
          "Authorization" : `Bearer ${Cookies.get("authToken")}`
        }
       })

       
      profileURL = uploadImage.data.data

      const objToSent = {
        ...obj,
        imageURL: profileURL
      }


     const response = axios.post(`${BASE_URL}${endPoints.addmenuEndpoint}`,objToSent,{
        headers : {
            Authorization : `Bearer ${Cookies.get("authToken")}`
        }
     })  
      console.log(response);      
  }


  
  

  
  

  return (
    <div>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={Close}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
            

        <Fade in={open}>
          <Box sx={style} component="form" onSubmit={handleSubmit(submitHandler)}>
            <Typography variant='h5' align='center' gutterBottom>Create Menu</Typography>
            <Controller
              control={control}
              name="itemName"
              render={({field ,formState :{errors}}) => (
              <TextField
                fullWidth
                type="text"
                label="Item Name"
                required
                {...field}
              />
              )}
            />

            <FormControl fullWidth required margin="normal">
                 <InputLabel>Restaurant Name</InputLabel>
                 <Controller
                    name="restaurantName"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Restaurant Name is required" }}
                    render={({ field }) => (
                    <Select {...field} label="Restaurant">
                        {names.map((name)=>(
                            <MenuItem value={name.restaurantName}>{name.restaurantName}</MenuItem>
                        ))}
                    
                    </Select>
                    )}
                 />
            </FormControl>  
         

            <Controller
              control={control}
              name="itemPrice"
              render={({field ,formState :{errors}}) => (
              <TextField
                fullWidth
                type="text"
                label="Item Price"
                required
                {...field}
              />
              )}
            />


            <Controller
              control={control}
              name="itemDesc"
              render={({field ,formState :{errors}}) => (
              <TextField
                fullWidth
                type="text"
                label="Item Description"
                required
                {...field}
              />
              )}
            />


            <Button variant="contained" component="label" sx={{marginTop:"10px", marginBottom:"10px"}}>
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(event)=>{handleImageChange(event)}}
                        />
                 </Button>

            <Button
               fullWidth
               variant="contained"
               type="submit"
               sx={{ mt: 2 }}
             >
             Ctreate Menu
            </Button>



          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
