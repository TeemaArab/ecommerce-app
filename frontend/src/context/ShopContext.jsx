import { createContext, useState, useEffect } from "react";
import {products} from '../assets/assets'

export const shopContext = createContext();

const shopContextProvider =(props)=>{
      
    const currency = '$';
    const dellivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cardItems, setCardItems] = useState({});

    
    const addToCart = async(itemId, size) =>{
        let cartData = structuredClone(cardItems);

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

       setCardItems(cartData);
    }

    useEffect(()=>{
       console.log(cardItems);
    },[cardItems])


    const value ={
        products,
        currency,
        dellivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cardItems,
        addToCart

    }
    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )
}

export default shopContextProvider;