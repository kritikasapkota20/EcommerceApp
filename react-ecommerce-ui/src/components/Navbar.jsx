import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useNavigate} from "react-router-dom";
import { authcontext } from '../context/AuthContextProvider';
import { useState,useEffect,useContext } from "react";
import { useMutation } from '@tanstack/react-query';
import axios from "axios";
import { ToastContainer,toast } from 'react-toastify';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard'];
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import { cartcontext } from '../context/CartContextProvider';
function Navbar() {
const {authUser,setAuthUser}=useContext(authcontext)
const {cart}=useContext(cartcontext)
const navigate=useNavigate()

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const mutation=useMutation({
    mutationFn:async()=>{
      const res=await axios.post("/api/user/signout");
      // console.log(res);
   return res.data
    },
    onSuccess:(data)=>{

      console.log(data.message);
toast.success(data.message);
setAuthUser(data.user)
localStorage.removeItem("authUser",JSON.stringify(data.user));
// localStorage.removeItem(`cart_${authUser.email}`, JSON.stringify(newcartitems));
// setTimeout(() => {
  navigate("/");
// }, 100);
},


})

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
// console.log(authUser.name)
  return (
    <AppBar position="static" sx={{mb:2}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
          onClick={()=>{
            navigate("/")
          }}
            variant="h6"
            noWrap
            component="a"
          
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor:"pointer"
            }}
          >
            Shoply
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor:"pointer"
              
            }}
          >
            Shoply
            
          </Typography>
           
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button
                onClick={()=>{
                    navigate("/products")
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Products
              </Button>
           
          </Box>
          <Box sx={{ flexGrow: 20, display: { xs: 'none', md: 'flex' } }}>
            
            {authUser&&(
              <Button
                onClick={()=>{
                    navigate("/order")
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Orders
              </Button>
           )}
          </Box>
          <Box sx={{ display:"flex",alignItems:"center"  }}>
            {authUser?
            <>     
             <Badge  badgeContent={cart.length} color="warning"sx ={{mr:10,cursor:"pointer"}} onClick={()=>{
              navigate("/cart")
             }}>
          <AddShoppingCartIcon />
         </Badge>
                    <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={authUser.name.toUpperCase()} src="/static/images/avatar/2.jpg" />
              
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) =>
              {
                // console.log(authUser)
               if(setting==="Dashboard" && !authUser.role.includes("Admin")){
                return null;
               }
               
               return (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>)
})}
<MenuItem  onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }} onClick={()=>{
                   
                    mutation.mutate();
                  }}>Logout</Typography>
                </MenuItem>
            </Menu>
</>:<>
            
            <Button
              onClick={()=>{
                  navigate("/sign-in")
              }}
              sx={{ my: 2, color: 'white', display: 'block',fontWeight:"bold"}}
            >
              Sign In
            </Button>
         
        </>
        }

      <ToastContainer />
         
          </Box>
        </Toolbar>
      </Container>

    </AppBar>
  );
}
export default Navbar;
