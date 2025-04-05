import React, { useState, useEffect, createContext , useContext} from "react";
import { useAuth } from "./AuthContext";
import { addToCart,removeToCart,updateCartItem } from "../util/cartActionsUtil";

//Context items to provide
const CartContext=createContext({
    cart:[],
    handleCartActions:()=>{}
})
//Using the Context
export const useCartContext = () => useContext(CartContext);

//Provider function
export const CartProvider = ({ children }) => {
    const [cart, setCart]=useState([])

    //Add, Delete, Update
    //For getting all the cartItems just use the cart state
    const handleCartActions = (action, cartItem, count=1, item_discount=0)=>{
        switch(action){
            case "addToCart":
                addToCart(cart, cartItem,item_discount, setCart,)
                break;
            case "removeToCart":
                removeToCart(cart, cartItem, setCart)
                break;  
            case "updateCartItem":
                updateCartItem(cart, cartItem, count,setCart)
                break;
        }
        
    }
    return(
        <CartContext.Provider value={{ cart, handleCartActions }}>
        {children}
        </CartContext.Provider>
    )
}