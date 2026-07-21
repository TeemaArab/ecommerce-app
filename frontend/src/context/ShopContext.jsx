import { createContext } from "react";
import {products} from '../assets/assets'

export const shopContext = createContext();

const shopContextProvider =(props)=>{
      
    const currency = '$';
    const dellivery_fee = 10;


    const value ={
        products,
        currency,
        dellivery_fee

    }
    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )
}

export default shopContextProvider;