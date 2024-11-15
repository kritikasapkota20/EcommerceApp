import { useState,useEffect } from "react";
export default function useDebounce(value,delay){
    const [debouncedsearch,setdebouncedsearch]=useState(null);
  useEffect(()=>{
const id=setTimeout(()=>{
  setdebouncedsearch(value)
},1000);
return ()=>{
  clearTimeout(id);
}
  },[value,delay])
  return debouncedsearch
}