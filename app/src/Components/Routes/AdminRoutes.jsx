import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function AdminRoutes() {
    const isLogged = localStorage.getItem("user")

    if(isLogged == "admin"){
        return <Outlet />
    }
    return <Navigate to="/" replace />
  
}

export default AdminRoutes
