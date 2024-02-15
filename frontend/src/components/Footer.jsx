import React from 'react'

const Footer = () => {
  return (
    <div className='relative bottom-0 left-0 right-0'>
      <div className='w-full bg-black px-4 md:px-[100px] flex justify-around text-xs sm:text-base py-8 border-white border-2'>
        <div className='flex flex-col text-white'>
          <p>More Blogs</p>
          <p>Featured Blogs</p>
          <p>Readers Choice</p>
        </div>
        <div className='flex flex-col text-white'>
          <p>Forum</p>
          <p>Support</p>
          <p>Latest Posts</p>
        </div>
        <div className='flex flex-col text-white'>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>About Us</p>
        </div>
      </div>
      <p className='text-sm sm:text-lg py-2 pb-2 text-center text-white bg-black border-white border-x-2 border-b-2'>All Rights Reserved | BlogBook | 2023</p>
    </div>
  )
}

export default Footer