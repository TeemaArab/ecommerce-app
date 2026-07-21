import React from 'react'
import {assets} from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700' >
        <div>
            <img src={assets.exchange_icon} alt="" className='w-12 mx-auto mb-5' />
            <p className='font-semi-bold'> Easy Exchange Policy</p>
            <p className='text-gray-400'> We Offer Hassle-Free exchange.</p>
        </div>

        <div>
            <img src={assets.quality_icon} alt="" className='w-12 mx-auto mb-5' />
            <p className='font-semi-bold'> 30 days return Policy</p>
            <p className='text-gray-400'> We provide 30 days free return policy.</p>
        </div>

        <div>
            <img src={assets.support_img} alt="" className='w-12 mx-auto mb-5' />
            <p className='font-semi-bold'> Best Customer Support</p>
            <p className='text-gray-400'> We provide 24/7 customer support.</p>
        </div>
    </div>
  )
}

export default OurPolicy
