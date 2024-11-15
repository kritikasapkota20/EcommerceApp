import { createContext,useState,useEffect } from "react";
export const cartcontext=createContext();

const CartContextProvider = ({children}) => {
   
    const [cart, setcart] = useState(() => {
        
       const storedcart= localStorage.getItem("cart")
    
        return storedcart? JSON.parse(storedcart):[];
    
      });
      useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart));
      },[cart])
    return (
      <div>
        <cartcontext.Provider value={{cart,setcart}}>
         {children}
      </cartcontext.Provider>
        
      </div>
    )
  }
  
  export default CartContextProvider