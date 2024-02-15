import React from 'react'
import { IF } from '../url.js'

const HomePosts = ({post}) => {
  return (
    <div className='w-full flex mt-6 mb-6 space-x-4 justify-evenly'>
      <div className='w-[50%] md:w-[40%] h-[200px] flex justify-center items-center'>
        <img 
          src={IF+post.photo} 
          alt="img" 
          className='h-full w-full object-cover'
        />
      </div>
      <div className='flex flex-col w-[50%] sm:w-[60%]'>
        <h1 className='text-md md:text-[20px] font-bold mb-1 md:mb-2 leading-[18px]'>
          {post.title}
        </h1>
        <div className='flex sm:flex-row flex-col mb-2 md:mb-3 sm:text-sm text-xs text-gray-600 sm:items-center justify-between leading-[12px]'>
          <p className='font-semibold'>@{post.username}</p>
          <div className='flex space-x-1 sm:space-x-2'>  
            <p>{new Date(post.updatedAt).toString().slice(4,15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
          </div>
        </div>
        <p className='text-[13px] sm:text-base leading-[15px]'>
          {post.desc.length > 200 ? post.desc.slice(0,200) + " ...Read More" : post.desc}
        </p>
      </div>  
    </div>
  )
}

export default HomePosts