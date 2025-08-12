
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login, Signup } from './Pages/Auths'
import VendorDashboard from './Pages/Dashboards/Vendor/dashboard/Index'
import Menu from './Pages/Dashboards/Vendor/menu'
import Order from './Pages/Dashboards/Vendor/order'
import Restaurant from './Pages/Dashboards/Vendor/restaurant'
import Admindashboard from './Pages/Dashboards/Admin/Dashboard'
import AdminDashboard from './Pages/Dashboards/Admin/Dashboard'
import AllRestaurants from './Pages/Dashboards/Admin/All-Restaurants'
import Orders from './Pages/Dashboards/Admin/Orders'
import AllMenu from './Pages/Dashboards/Admin/AllMenu'
import ClientDashboard from './Pages/Dashboards/Client/ClientDashboard'
import ClientRestaurant from './Pages/Dashboards/Client/ClientRestaurant'
import ClientMenu from './Pages/Dashboards/Client/ClientMenu'
import ClientOrders from './Pages/Dashboards/Client/ClientOrders'
import VendorRoutes from './Components/Routes/VendorRoutes'
import AdminRoutes from './Components/Routes/AdminRoutes'
import ClientRoutes from './Components/Routes/ClientRoutes'
import AllVendors from './Pages/Dashboards/Admin/AllVendors'
import AllCustomers from './Pages/Dashboards/Admin/AllCustomers'

function App() {
  

  return (
    <>
    
    <Routes>
      
         <Route path='/' element={<Login />}></Route>
         <Route path='/signup' element={<Signup />}></Route>
     


      
       <Route element={<VendorRoutes/>}>
         <Route path='/vendor-dashboard' element={<VendorDashboard />}></Route>
         <Route path='/vendor-menu' element={<Menu />}></Route>
         <Route path='/vendor-order' element={<Order />}></Route>
         <Route path='/vendor-restaurant' element={<Restaurant />}></Route>
       </Route>

      //AdminRoutes
       <Route element={<AdminRoutes/>}>
         <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
         <Route path="/all-restaurant" element={<AllRestaurants/>}></Route> 
         <Route path="/admin-order"  element={<Orders />}></Route>
         <Route path="/admin-menu"  element={<AllMenu />}></Route>
         <Route path="/admin-allvendors"  element={<AllVendors />}></Route>
         <Route path="/admin-allcustomers"  element={<AllCustomers />}></Route>
       </Route>

       //Client
       <Route element={<ClientRoutes/>}>
         <Route path='/client-dashboard' element={<ClientDashboard/>}></Route>
         <Route path='/client-restaurant' element={<ClientRestaurant/>}></Route>
         <Route path='/client-menu' element={<ClientMenu/>}></Route>
         <Route path='/client-order' element={<ClientOrders/>}></Route>
       </Route>


    </Routes>
      
    </>
  )
}

export default App
