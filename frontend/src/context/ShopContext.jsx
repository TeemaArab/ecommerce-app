import { createContext, useState, useEffect } from "react";
import {products} from '../assets/assets'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const shopContext = createContext();

const shopContextProvider =(props)=>{
      
    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();

    
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

     //get cart amount

     const getCartAmount = ()=>{
        let totalAmount = 0;
        for (const itemId in cartItems){
            let itemInfo = products.find((product)=> product._id === itemId);
            for(const size in cartItems[itemId]){
                try{
                  if(cartItems[itemId][size] > 0){
                    totalAmount += cartItems[itemId][size] * itemInfo.price;
                  }
                }catch(error){

                }
            }
        }
        return totalAmount;
     }




    useEffect(()=>{
       
    },[cartItems])


    const value ={
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate

    }
    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )
}

export default shopContextProvider;