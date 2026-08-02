import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets.js';
import NewsletterBox from '../components/NewsletterBox';


const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
         <Title  text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row  gap-16'>
           <img className='w-full md:max-w-[450px]' src={assets.about_img}/>
           <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-500'>
             <p> We are a team of passionate individuals dedicated to providing the best shopping experience for our customers.</p>
             <p> Since our inception, we have been committed to delivering exceptional value and service to our community. From fashion and beauty to electronics and home essentials, we strive to meet the needs of our customers with the highest standards of quality and care. </p>
             <b className='text-gray-800'> Our Mission</b>
             <p>Our mission at Forever is to empower customers with choice, convenience, and quality. We are dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
           </div>
      </div>

      <div className='text-xl py-4'>
         <Title text1={'WHY'} text2={'CHOOUSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border bg-gray-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
             <b> Quality Assurance:</b>
             <p className='text-gray-500'> We maintain the highest standards of quality control to ensure that every product meets our customers' expectations.</p>
          </div>

           <div className='border bg-gray-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
             <b> Convenience:</b>
             <p className='text-gray-500'> We provide a convenient shopping experience that saves our customers time and effort.</p>
          </div>
           <div className='border bg-gray-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
             <b> Exceptional Customer Service:</b>
             <p className='text-gray-500'> We are committed to providing outstanding customer service and support to all our customers.</p>
             </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About;
