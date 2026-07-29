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
        for(const items in cartItems){
            for(  let item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0 ){
                        TotalCount += cartItems[items][item];
                    }
                }catch(error){
                  
                }
            }
        }
        return TotalCount;
    }

    useEffect(()=>{
       console.log(cartItems);
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
        getCartCount

    }
    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )
}

export default shopContextProvider;