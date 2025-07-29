import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ClientRoutes() {
  const isLogged = localStorage.getItem("user")
  
  if(isLogged == "customer"){
    return <Outlet />
  }
  return <Navigate to="/"  replace/>
}

export default ClientRoutes
