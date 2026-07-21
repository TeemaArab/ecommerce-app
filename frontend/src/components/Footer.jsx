import React from 'react'
import {assets} from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img className='mb-5 w-32' src={assets.logo} alt="Logo" />
            <p className='w-full md:w-2/3 text-gray-600'> 
                Your company description goes here.
            </p>
        </div>

        <div>
            <p className='font-medium text-xl mb-5'> COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>

            </ul>
        </div>

        <div > 
          <p className='font-medium text-xl mb-5'> GET IN TOUCH </p>
          <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+1-423-678-9090</li>
                    <li>contact@company.com</li>
          </ul>
        </div>

      </div>

      <div>
       <hr/>
       <p className='py-5 text-sm text-center'> &copy; 2026 Your Company. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
