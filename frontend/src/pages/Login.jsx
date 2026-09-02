import React ,{useState, useEffect}from 'react'
import { useContext } from 'react';
import { shopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const[currentState, setCurrentState] = useState('Login'); // to toggle between login and sign up
  const{token,setToken,navigate,backendUrl} = useContext(shopContext);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try{

      //to call register api
       if(currentState === 'Sign Up'){
         const response = await axios.post(backendUrl+ '/api/user/register',{
          name,
          email,
          password
         });
            if(response.data.success){
              setToken(response.data.token);
              localStorage.setItem('token',response.data.token);
             
            }else{
              toast.error(response.data.message);
            }
       }
       //to call login api
       else{
          const response = await axios.post(backendUrl+'/api/user/login',{
            email,
            password
          });
          if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token',response.data.token);
           
          }else{
            toast.error(response.data.message);
          }
       }
    }catch(error){
      console.log(error.message);
      toast.error(error.message);
    }
  }

  // redirect the user to home page if the user is already logged in
  useEffect(()=>{
    if(token){
      navigate('/');
    }
  },[token]);

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
         <div className='flex items-center gap-2 mb-2 mt-10'>
             <p className='prata-regular text-3xl'>{currentState}</p>
             <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
         </div>
       

       {/* -----login or sign up options ----- */}
         {currentState === 'login'? '': 
         <input  onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Name' className='w-full px-3 border border-gray-800 py-2 ' required/>}
         
         <input  onChange={(e) => setEmail(e.target.value)} value={email}  type="email" placeholder='Email' className='w-full px-3 border border-gray-800 py-2 ' required/>
         <input  onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='w-full px-3 border border-gray-800 py-2 ' required/>

         <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot your password?</p>
          {
            currentState === 'login'
            ?
            <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Don't have an account? Sign up</p>
            :
            <p onClick={() => setCurrentState('login')} className='cursor-pointer'>Already have an account? Log in</p>
          }

         </div>
         <button className='bg-black text-white py-2 px-8 mt-4 rounded-md hover:bg-gray-800'>{currentState=== 'login' ? 'Log in' : 'Sign up'}</button>
      </form>
    </div>
  )
}

export default Login
