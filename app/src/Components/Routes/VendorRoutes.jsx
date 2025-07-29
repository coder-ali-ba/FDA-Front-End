import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function VendorRoutes() {

    const islogged =localStorage.getItem("user")
    console.log(islogged);
    
    if (islogged == "vendor") {
      return <Outlet/>;
    }

    return <Navigate to="/" replace />;
}

export default VendorRoutes
