import { createContext, useState, useEffect } from "react";
import {products} from '../assets/assets'
import { toast } from "react-toastify";

export const shopContext = createContext();

const shopContextProvider =(props)=>{
      
    const currency = '$';
    const dellivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    
    const addToCart = async(itemId, size) =>{
      
        if(!size){
           toast.error('Please select a size');
           return;
      }

        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][size] ){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

       setCartItems(cartData);
    }

    // To get cart count
    const getCartCount = () => {
        let TotalCount = 0;
        for(const itemId in cartItems){
            for(  let size in cartItems[itemId]){
                try{
                    if(cartItems[itemId][size] > 0 ){
                        TotalCount += cartItems[itemId][size];
                    }
                }catch(error){
                  
                }
            }
        }
        return TotalCount;
    }

//    to update the cart page by making the delete and quantity change work, we need to update the cartItems state in the context provider.
     const updateQuantity = async(itemId, size, quantity)=>{
         let cartData = structuredClone(cartItems);
         cartData[itemId][size] = quantity;
         setCartItems(cartData);
     }




    useEffect(()=>{
       
    },[cartItems])


    const value ={
        products,
        currency,
        dellivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity

    }
    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )
}

export default shopContextProvider;