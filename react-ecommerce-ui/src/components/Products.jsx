import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {authcontext} from "../context/AuthContextProvider"
import { cartcontext } from '../context/CartContextProvider';
import { useState,useEffect,useContext } from "react";

export default function Products({product}) {

const {authUser,setAuthUser}=useContext(authcontext)
const {cart,setcart}=useContext(cartcontext)

  return (
    <Card sx={{ maxWidth: 345,width:"300px" }}>
      <CardMedia
        sx={{ height: 230 }}
        // image="https://5.imimg.com/data5/SELLER/Default/2022/11/KE/VX/MV/116453489/white-casual-shoes-for-men-500x500.jpg"
        image={` http://localhost:4001/${product?.image}`}


        // image={`/api/${product?.image}`}


        
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Price:Rs {product?.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>{
          const productExist=cart.find(({_id})=>_id===product._id
        )
        //  console.log(productExist)
const  newcartitems=[...cart];
if(productExist){
  productExist.quantity+=1;
}else{
  newcartitems.push({_id:product._id,
    name:product.name,
    price:product.price,
    image:product.image,
    quantity:1})
}
// console.log(newcartitems)
setcart(newcartitems)
// const authUser = JSON.parse(localStorage.getItem("authUser"));
// if (authUser) {
//   localStorage.setItem(`cart_${authUser.email}`, JSON.stringify(newcartitems));
// }
// localStorage.setItem("cart",JSON.stringify(newcartitems))
        }}>Add To Cart</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
