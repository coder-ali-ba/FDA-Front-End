import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Paper
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../../../Utils/utility";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const {control , handleSubmit , reset} = useForm()



    

    const submitHandler = async(obj) => {
    setLoading(true)
     try {      
      const response = await axios.post(`${BASE_URL}auth/signup` , obj)
      reset() 
      setLoading(false)
      navigate("/")
    
     } catch (error) {
       console.log(error.message);
     } 
    }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Signup
      </Typography>
      <Box component="form" display={"flex"} flexDirection={"column"} gap={"10px"}  onSubmit={handleSubmit(submitHandler)} autoComplete="off">
        

        <Controller mt="10px"
           control={control}
           name="name"
           render={({field ,formState :{errors}}) => (
            <TextField
             fullWidth
             type="text"
             label="Name"
             required
             {...field}
           />
          )}
        />

        <Controller
           control={control}
           name="email"
           render={({field ,formState :{errors}}) => (
            <TextField
             fullWidth
             type="email"
             label="Email"
             required
             {...field}
           />
          )}
        />

        <Controller
           control={control}
           name="password"
           render={({field ,formState :{errors}}) => (
            <TextField
             fullWidth
             type="password"
             label="password"
             required
             {...field}
           />
          )}
        />

        <Controller
           control={control}
           name="phNumber"
           render={({field ,formState :{errors}}) => (
            <TextField
             label="Phone Number"
             required
             {...field}
           />
          )}
        />
        
        
       
        <FormControl fullWidth required margin="normal">
          <InputLabel>Type</InputLabel>
          <Controller
           name="type"
           control={control}
           defaultValue=""
           rules={{ required: "Account type is required" }}
           render={({ field }) => (
               <Select {...field} label="Type">
                 
                 <MenuItem value="vendor">Vendor</MenuItem>
                 <MenuItem value="customer">Customer</MenuItem>
               </Select>
            )}
          />
        </FormControl>  


       



        <Typography>Already have an account <Link to="/">Log In</Link></Typography>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>

        
      </Box>
    </Paper>
  );
};

export default Signup;

