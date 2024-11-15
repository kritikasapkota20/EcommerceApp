import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState,useEffect,useContext } from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import {Link,useNavigate} from "react-router-dom"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import {authcontext} from "../context/AuthContextProvider"
import {
  useQuery,
  useMutation,
} from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const schema = yup
.object()
.shape({

  email: yup.string().email().required("Email is required"),
  // password: yup.string().matches(passwordRules,{message:"please enter a strong password"}).required("Password is Required"),
  password: yup.string().required("Password is Required"),
})
.required();
export default function SignIn() {
  const {setAuthUser}=useContext(authcontext)
  const navigate=useNavigate();
  const mutation=useMutation({
    mutationFn:async(data)=>{
      const res=await axios.post("/api/user/signin",data);
      // console.log(res);
   return res.data
    },
    onSuccess:(data)=>{
      // console.log(data.message);
toast.success(data.message);
setAuthUser(data.user);
localStorage.setItem("authUser",JSON.stringify(data.user));
// console.log(data.user);
setTimeout(() => {
  navigate("/");
}, 1000); 
// navigate("/sign-in")

    },
    onError:(err)=>{
// console.log(err.response.data.message);
// toast.error(err.response.data.message)

    }
    
  })
  // console.log(mutation.error)
  
  const [showPassword,setshowpassword]=useState(false);
  const handleclickpassword=()=>setshowpassword((show)=>!show);
  const { register, handleSubmit,formState:{errors},reset} = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    // console.log("Form Data:", data);  
  mutation.mutate(data);

  };
  
  useEffect(()=>{
    if(mutation.error){
reset();
    }
  },[mutation.error,reset])
  return (
    <Stack
      sx={{ width: "80%", mx: "auto" }}
      direction="column"
      justifyContent="space-between"
    >
      <Card sx={{ p: 10 }} variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign In
        </Typography>
        {mutation.error &&<Alert sx={{my:2}} severity="error">
 {mutation.error.response.data.message} 
 {/* {console.log(mutation.error.response.data.message)} */}
 </Alert>}
        
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
           
          
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              {...register("email")}
              error={Boolean(errors?.email?.message)}
              helperText={errors.email?.message} 
              sx={{ ariaLabel: "email" }}

            />
          
          
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">Password</FormLabel>
            </Box>
            <TextField
              name="password"
              placeholder="••••••"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              {...register("password")}  
            error={Boolean(errors.password)}  
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleclickpassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            />
         
          <Button type="submit" fullWidth variant="contained">
            Sign in
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <span>
            <Link to="/sign-in" sx={{ color: 'black' }}>Sign up</Link>

            </span>
          </Typography>
        </Box>
      </Card>
      <ToastContainer />
    </Stack>
  );
}
