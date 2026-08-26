import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';
import { currency } from '../App';

const List = ({token}) => {

  // get all data from api
  const [list, setList] = useState([]);

  const getList = async()=>{
    try{
      const response = await axios.get(backendURL + '/api/product/list');
      if(response.data.success){
        setList(response.data.products);
      }else{
        toast.error(response.data.message);
      }
    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }
  
   // functionallity to remove product from the list
  const removeProduct = async(id)=>{
    try{
      const response = await axios.delete(backendURL + '/api/product/remove/' + id ,{
        headers:{token}
      });

      if(response.data.success){
        toast.success(response.data.message);
        await getList();
      }else{
        toast.error(response.data.message);
      }
    }
    catch(error){
      console.log(error);
      toast.error(error.message);
    }
   }

useEffect(()=>{
  getList();
},[])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* list table title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* product items */}
        {
          list.map((item, index)=>(
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-12' src={item.image[0]} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p className='text-right md:text-center cursor-pointer text-lg' onClick={()=>removeProduct(item._id)}>X</p>
            </div>
          ))
        }
      </div>
    </>
  )
}


export default List
