import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const shopContext = createContext();

const shopContextProvider =(props)=>{
      
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
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

     // to import products from the backend, we will use useEffect hook to fetch the products from the backend and set the products state.

    const getProductsData = async()=>{
        try{
            
            const response = await axios.get(backendUrl+'/api/product/list');
            if(response.data.success){
                setProducts(response.data.products);
            }else{
                toast.error(response.data.message);
            }
           
        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }


    useEffect(()=>{
        getProductsData();
    },[])


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
        navigate,
        backendUrl
    }
    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )
}

export default shopContextProvider;