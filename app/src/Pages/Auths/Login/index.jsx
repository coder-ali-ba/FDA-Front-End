import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../../../Utils/utility"; 
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, reset , formState: { errors } } = useForm();
  const navigate = useNavigate()

  const onSubmit = async (obj) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}auth/login`, obj);
      const {token , data} =response.data;
      const message =response.data.message
       alert(message);
       const verify =data.type
     
          
      
      if(token){
        Cookies.set("authToken" , token)
        if(verify =="admin"){
         
          localStorage.setItem("user" , "admin")
          navigate("/admin-dashboard")
          alert("ADMIN")
          
        }
         if(verify=="vendor"){
          localStorage.setItem("user" , "vendor")
          navigate('/vendor-dashboard')
          alert('VENDOR')
          

        }
         if(verify == "customer"){
          localStorage.setItem("user" , "customer")
          navigate("/client-dashboard")
          alert("CUSTOMER")
          

        }
      }
      
    } catch (error) {
      console.error("Login Error:" , error.message);
    } finally {

      setLoading(false);
      reset()
      
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        {/* Email */}
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format"
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="Password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        <Typography>Don't have an account <Link to="/signup">Sign Up</Link></Typography>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;

