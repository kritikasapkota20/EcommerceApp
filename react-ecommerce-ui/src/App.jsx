import React, { useEffect } from 'react'
import { BrowserRouter,Route,Routes,Outlet, Navigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import SignIn from './Pages/Signin';
import SignUp from './Pages/Signup';
import Orders from './Pages/orders';
import {authcontext} from "./context/AuthContextProvider"
import AuthContextProvider from "./context/AuthContextProvider"

import {cartcontext} from "./context/CartContextProvider"
import CartContextProvider from "./context/CartContextProvider"

import Homepage from './Pages/Homepage';
import Product from './Pages/product';
import Navbar from "./components/Navbar"
import Homelayout from './layout/Homelayout';
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import {useState,useContext,createContext} from "react";
import Cart from './Pages/Cart';
import  Dashboard  from './Pages/Dashboard';
import Dashboardlayout from "./layout/Dashboardlayout"
import DashboardProduct from "./Pages/Dashboard/DashboardProduct"
import DashboardUser from "./Pages/Dashboard/DashboardUser"
import Productform from './Pages/Dashboard/Productform';

const queryclient=new QueryClient();
export const ProtectedRoutes=()=>{
  const {authUser}=useContext(authcontext);
  if(authUser)return <Outlet/>
  return <Navigate to="/sign-in"/>
}
const App = () => {
  
  
  return (
    <div>
     <AuthContextProvider>
<CartContextProvider>
        <QueryClientProvider client={queryclient}>
    <BrowserRouter>
    <Routes>
      <Route element={<Homelayout/>}>
    <Route path='/' element={<Homepage/>}/>
    <Route element={<ProtectedRoutes/>} >    <Route path='/order' element={<Orders/>}/></Route>


    <Route path='/products' element={<Product/>}/>

    <Route path='/cart' element={<Cart/>}
    />
    </Route>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route element={<Dashboardlayout/>}>

      <Route path='/Dashboard/products' element={<DashboardProduct/>}/>
      <Route path='/Dashboard/products/add' element={<Productform/>}/>
      <Route path='/Dashboard/products/edit/:productId' element={<Productform/>}/>

      <Route path='/Dashboard/users' element={<DashboardUser/>}/>



      </Route>

<Route path="*" element={<h1>Route not found</h1>}></Route>
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    </CartContextProvider>
    </AuthContextProvider>
    </div>
  )
}

export default App
