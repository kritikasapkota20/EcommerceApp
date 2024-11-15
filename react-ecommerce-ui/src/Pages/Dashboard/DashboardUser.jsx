import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Search from '@mui/icons-material/Search';
import { FormControl } from "@mui/material";
import {InputLabel} from "@mui/material";
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import {Button} from "@mui/material";
import { useQuery,useMutation } from "@tanstack/react-query";
import Chip from "@mui/material/Chip";
import Avatar  from "@mui/material/Avatar";
import useDebounce from "../../hooks/useDebounce";
import React, { useState } from "react"
import { ToastContainer,toast } from "react-toastify";
const STATUS_COLOR = {
  pending: "secondary",
  cancelled: "error",
  completed: "success",
};

// pagination

export default function DashboardUser() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [search,setsearch]=useState("");
const debouncedsearch=useDebounce(search,1000)

  const handleChangePage = (event, newPage) => {
    setPage(newPage+1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  const mutation=useMutation({
    mutationFn:async(id)=>{
      const windowconfirm=window.confirm("Are u sure u wanna  delete the user?")
      if(windowconfirm){
      const res=await axios.delete(`/api/user/${id}`);
      // console.log(res);
   return res.data
      }
    },
    onSuccess:(data)=>{
      // console.log(data.message);
toast.success(data.message);
refetch();
// queryclient.invalidateQueries("product")




    },
    onError:(err)=>{
// console.log(err.response.data.message);
toast.error(err.response.data.message)

    }
    
  })
  

  const {data ,isLoading,refetch}=useQuery({
    queryKey:["users"
    ,{page,rowsPerPage,debouncedsearch}],
    queryFn:async()=>{
     try{ const res=await axios.get("/api/user"
        ,{
        params:{
          
          page,
          limit:rowsPerPage,
          search:debouncedsearch
        }
  
      }
    )

    return res.data.data
    console.log(res.data)
  }catch(error){
    console.log(error);
    return { data: [] }
  }
  return [];
  
  }
  })

  return (
    <TableContainer component={Paper}>
     <FormControl variant="standard"
      sx={{display:"flex",justifyContent:"flex-end", mb:5}} 
      >
        
        <Input  onChange={(e)=>{
          setsearch(e.target.value)
        }}
        placeholder="Search users"
          id="input-with-icon-adornment"
          value={search}
          startAdornment={
            <InputAdornment position="start" sx={{mx:1}}>
              <Search />
            </InputAdornment>
          }
        />
      </FormControl>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >S NO.</TableCell>
            <TableCell >Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <>
              <TableRow>
                <TableCell colSpan={3}>
                  <Skeleton width="100%" height="50px" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  <Skeleton width="100%" height="50px" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  <Skeleton width="100%" height="50px" />
                </TableCell>
              </TableRow>
            </>
          ) : (
            data?.data?.map(({ _id, image, name }, index) => (
              <TableRow
                key={_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <Avatar src={` http://localhost:4001/${image}`} alt={name}/>
                  </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell >
                  <Button   variant="contained"color="secondary">Edit</Button>
                <Button sx={{ml:2}} 
                  variant="contained" onClick={()=>{
                    mutation.mutate(_id);
                  }} color="error">Delete</Button>
                </TableCell>
                {/* <TableCell>Rs {price}</TableCell> */}

              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
      component="div"
      count={data?.total??0}
      page={page-1}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[4,8,12]}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </TableContainer>
  );
}