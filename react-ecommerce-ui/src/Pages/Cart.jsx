import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
// import { Mutation } from '@tanstack/react-query';
import { useMutation, } from '@tanstack/react-query';
import {useNavigate, Navigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Chip,Button } from '@mui/material';
import { toast } from 'react-toastify';
import  { cartcontext } from '../context/CartContextProvider';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function Cart() {
 const {cart,setcart}=useContext(cartcontext)
 const navigate=useNavigate();
 const mutation=useMutation({
   mutationFn:async(data)=>{
     const res=await axios.post("/api/products/order",data);
     // console.log(res);
  return res.data
   },
   onSuccess:(data)=>{
     // console.log(data.message);
toast.success(data.message);


 navigate("/");
 
// navigate("/sign-in")

   },
   onError:(err)=>{
// console.log(err.response.data.message);
// toast.error(err.response.data.message)

   }
   
 })
 console.log(mutation.error)
 const handledelete=(id)=>{
  const confirmdelete=window.confirm("Do you really want to delete this item from cart?")
  if(confirmdelete){
const newcartitems=cart.filter((product)=>!(product._id===id));
setcart(newcartitems);
 }
 }
 const handledecrement=(index)=>{
cart[index].quantity--;
if(cart[index].quantity===0){
  const confirmdel=window.confirm("Quantity is zero. Do you want to remove this item?");
  if(confirmdel){
  handledelete(cart[index]._id);
  }else{
    cart[index].quantity=1;
  }
  return ;
}
setcart([...cart])
 }
 const handleincrement=(index)=>{
  cart[index].quantity++;
  
  setcart([...cart])
   }
   const handleOrders=()=>{
    const products=cart.map(({_id,quantity})=>({
      product:_id,
      quantity
    }))
    mutation.mutate({products
    })
   }
   const total=cart.reduce((acc,curr)=>{
    return acc + (curr.quantity*curr.price)
   },0)
  return (
    <>
     { (cart.length!==0)?(<Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Your Items in cart:
          </Typography>
          <Demo>
            <List >
              {cart.map((product,index)=>{
                return ( <ListItem key={product._id}
                  secondaryAction={
                    <>
                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                      handledecrement(index)
                    }}>
                      <RemoveCircleIcon/>
                    </IconButton>
                    <Chip sx={{ml:1}}label={product.quantity}/>
                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                   handleincrement(index)
                    }}>
                      <AddCircleIcon/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                      handledelete(product._id)
                    }}>
                      <DeleteIcon />
                    </IconButton>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={product.image} alt={product.name}/>
                  { console.log(product.image)}
                    
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.name}
                    secondary={`${product.quantity} X Rs ${product.price}  =Rs ${product.price*product.quantity}`}
                  />
                </ListItem>)
              })}
              <Typography sx={{ml:2}}><b>Total :</b>Rs {total}</Typography>
              <Button 
            variant="contained" 
            color="primary" 
            sx={{ mt: 2, ml: 2 }} 
            disabled={cart.length===0}
            onClick={()=>{
              handleOrders()
            }}
          >
            Proceed to Payment
          </Button>
            </List>
          </Demo>
        </Grid>):
         <Typography sx={{my:20}} ><b>There is no items in the cart</b></Typography>
        }


        
   </>
  );
}
