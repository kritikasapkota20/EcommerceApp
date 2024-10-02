import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import {Link} from "react-router-dom"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const schema = yup
.object()
.shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  // password: yup.string().matches(passwordRules,{message:"please enter a strong password"}).required("Password is Required"),
  password: yup.string().matches({message:"please enter a strong password"}).required("Password is Required"),
})
.required();
export default function SignUp() {
  const [showPassword,setshowpassword]=useState(false);
  const handleclickpassword=()=>setshowpassword((show)=>!show);
  const { register, handleSubmit,formState:{errors} } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log("Form Data:", data);  
  };

 
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
          Sign up
        </Typography>
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
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField
              id="name"
              type="name"
              name="name"
              placeholder=""
              autoComplete="name"

              autoFocus
              
              fullWidth
              variant="outlined"
              sx={{ ariaLabel: "name" }}
              {...register("name")}
              error={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message}
             
            />
          
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
            Sign up
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <span>
            <Link to="/sign-up" sx={{ color: 'black' }}>Sign in</Link>

            </span>
          </Typography>
        </Box>
      </Card>
    </Stack>
  );
}