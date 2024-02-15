import React from 'react'
import ProfilePosts from '../components/ProfilePosts'

const ProfilePage = () => {
  return (
    <div className='px-8 md:px-[70px] mt-8 flex flex-col md:flex-row pb-20'>
        <div className='w-full md:w-[40%] flex flex-col space-y-4 md:items-center'>
            <div className='flex flex-col space-y-4'>
                <h1 className='text-xl font-bold mb-4'>Profile</h1>
                <input type="text" placeholder='Your Username' className='outline-none px-4 py-2 text-gray-500 border-black border-2'/>
                <input type="email" placeholder='Your E-Mail' className='outline-none px-4 py-2 text-gray-500 border-black border-2'/>
                <input type="text" placeholder='Your Password' className='outline-none px-4 py-2 text-gray-500 border-black border-2'/>
                <div className='flex items-center space-x-4 mt-8'>
                    <button className='text-white bg-black font-semibold px-4 py-2 hover:text-black hover:bg-gray-400'>Update</button>
                    <button className='text-white bg-black font-semibold px-4 py-2 hover:text-black hover:bg-gray-400'>Delete</button>
                </div>
            </div>
        </div>
        <div className='w-full md:w-[70%] flex flex-col'>
            <h1 className='text-xl font-bold mb-0 mt-6 md:mt-0 md:mb-4'>Your Posts</h1>
            <ProfilePosts/>
            <ProfilePosts/>
            <ProfilePosts/>
            <ProfilePosts/>
        </div>
        
    </div>
  )
}

export default ProfilePage