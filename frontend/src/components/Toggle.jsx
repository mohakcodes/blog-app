import React, { useContext } from 'react'
import { UserContext } from '../context/Usercontext'
import axios from 'axios';
import { URL } from '../url';
import { Link } from 'react-router-dom';

const Toggle = () => {

  const {user} = useContext(UserContext);
  const {setUser} = useContext(UserContext);

  const handleLogout = async() => {
    try {
      const res = await axios.get(`${URL}/api/auth/logout`,{
        withCredentials:true,
      })  
      console.log(res);
      setUser(null);
    } 
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='bg-black w-[130px] flex flex-col items-start absolute top-12 right-4 md:space-y-2 px-8 py-2 rounded-md'>
        {!user && <h3 className='text-white text-base hover:text-gray-300 cursor-pointer'>Login</h3>}
        {!user && <h3 className='text-white text-base hover:text-gray-300 cursor-pointer'>Register</h3>}
        {user && <h3 className='text-white text-base hover:text-gray-300 cursor-pointer'><Link to={`/profile/${user._id}`}>My Posts</Link></h3>}
        {user && <h3 className='text-white text-base hover:text-gray-300 cursor-pointer'><Link to={`/write`}>Write</Link></h3>}
        {user && <h3 onClick={handleLogout} className='text-white text-base hover:text-gray-300 cursor-pointer'>Logout</h3>}
    </div>
  )
}

export default Toggle