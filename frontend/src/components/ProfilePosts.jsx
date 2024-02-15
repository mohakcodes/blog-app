import React from 'react'

const ProfilePosts = () => {
    return (
        <div className='w-full flex mt-6 mb-6 space-x-4 justify-evenly'>
            <div className='w-[50%] md:w-[40%] h-[200px] flex justify-center items-center'>
                <img 
                src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg" 
                alt="img" 
                className='h-full w-full object-cover'
                />
            </div>
            <div className='flex flex-col w-[50%] sm:w-[60%]'>
                <h1 className='text-md md:text-[20px] font-bold mb-1 md:mb-2 leading-[18px]'>
                This Will Carry The Topic Name in Blog
                </h1>
                <div className='flex sm:flex-row flex-col mb-2 md:mb-3 sm:text-sm text-xs text-gray-600 sm:items-center justify-between leading-[12px]'>
                    <p className='font-semibold'>@username_here</p>
                    <div className='flex space-x-1 sm:space-x-2'>  
                        <p>23/03/23</p>
                        <p>12:42</p>
                    </div>
                </div>
                <p className='text-[13px] sm:text-base leading-[15px]'>Description : Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quia necessitatibus reiciendis tempora beatae nostrum?</p>
            </div>
        </div>
    )
}

export default ProfilePosts