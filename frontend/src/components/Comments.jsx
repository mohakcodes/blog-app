import React from 'react'
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'

const Comments = () => {
  return (
    <div className='px-2 py-2 bg-gray-200 rounded-lg my-2'>
        <div className=' flex items-center justify-between'>
            <h3 className='text-sm sm:text-base font-bold text-gray-600'>@curr_fakeuser</h3>
            <div className='flex justify-center items-center space-x-2 sm:space-x-4'>
                <p className='text-xs sm:text-sm font-medium text-gray-600'>23/03/23</p>
                <p className='text-xs sm:text-sm font-medium text-gray-600'>10:23</p>
                <div className='flex items-center justify-center space-x-1 sm:space-x-2'>
                    <p><BiEdit/></p>
                    <p><MdDelete/></p>
                </div>
            </div>
        </div>
        <p className='px-2'>Good Information</p>
    </div>
  )
}

export default Comments