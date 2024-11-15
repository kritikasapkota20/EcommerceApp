import * as React from "react";

import Bannerimg from "../assets/banners.jpg";
// import Products from "../components/Products";
import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import {useQuery} from "@tanstack/react-query"
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Products from "./Products";


//featured and latest product
function Fandl({forl,title,querykey}){

const {data,isLoading}=useQuery({
  queryKey:[querykey],
  queryFn:async()=>{
    try{
    const res=await axios.get(`/api/products/${forl}`)
    // console.log(res.data.data);
    return res.data.data
  }catch(error){
    console.log(error);
  }
  return []
}})
  return (
    <>
  
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" textAlign="center" my={4}>
         { title}
        </Typography>
        <Grid container spacing={3} justifyContent="space-around">
          {isLoading ?(
            <>
            <Grid size="3">
            <Skeleton height="550px" width="300px" />
          </Grid>
          <Grid size="3">
            <Skeleton height="550px" width="300px" />
          </Grid>
          <Grid size="3">
            <Skeleton height="550px" width="300px"/>
          </Grid>
          <Grid size="3">
            <Skeleton height="550px" width="300px" />
          </Grid>
            </>
          ):(
            <>
            {data.map((product)=>{
              return(
                <Grid key={product._id}size="3">
                <Products product={product} />
              </Grid>
              )
            })}

          
          </>
          )}
        </Grid>
      </Box>
      
    </>
  );
}
export default Fandl;
