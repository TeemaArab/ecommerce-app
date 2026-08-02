import React ,{useState}from 'react'

const Login = () => {
  const[currentState, setCurrentState] = useState('Sign Up');

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
  }
  return (
    <div>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
         <div className='flex items-center gap-2 mb-2 mt-10'>
             <p className='prata-regular text-3xl'>{currentState}</p>
             <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
         </div>
       

       {/* -----login or sign up options ----- */}
         {currentState === 'login'? '': 
         <input type="text" placeholder='Name' className='w-full px-3 border border-gray-800 py-2 ' required/>}
         
         <input type="email" placeholder='Email' className='w-full px-3 border border-gray-800 py-2 ' required/>
         <input type="password" placeholder='Password' className='w-full px-3 border border-gray-800 py-2 ' required/>

         <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p classname='cursor-pointer'>Forgot your password?</p>
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
