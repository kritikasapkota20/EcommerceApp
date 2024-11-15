import { createContext,useState } from "react";
export const authcontext=createContext();

const AuthContextProvider = ({children}) => {
   
    const [authUser,setAuthUser]=useState(()=>{
      return JSON.parse(localStorage.getItem("authUser"));
    })
    return (
      <div>
        <authcontext.Provider value={{authUser,setAuthUser}}>
         {children}
      </authcontext.Provider>
        
      </div>
    )
  }
  
  export default AuthContextProvider