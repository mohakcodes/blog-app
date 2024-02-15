import React, { useContext, useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {FaBars} from 'react-icons/fa'
import Toggle from './Toggle.jsx'
import { UserContext } from '../context/Usercontext.jsx'

const Navbar = () => {

  const navigate = useNavigate();
  const path = useLocation().pathname;

  const [prompt,setPrompt] = useState("");
  const [toggle,setToggle] = useState(false);

  const toggleMenu = () => {
    setToggle(!toggle);
  }

  const {user} = useContext(UserContext);

  return (
    <div className='flex items-center justify-between px-[20px] md:px-[100px] py-4 bg-indigo-300'>
      <h1 className='md:text-xl text-lg font-bold'><Link to="/">Blog Book</Link></h1>
      {
        (user && path === '/') ?
        <div className='flex justify-center items-center space-x-0'>
          <p onClick={()=>navigate(prompt ? `?search=` + prompt : '/')} className='px-1 cursor-pointer'><BsSearch/></p>
          <input
            onChange={(e)=>setPrompt(e.target.value)}
            type="text" 
            placeholder='Search' 
            className='md:px-4 px-2 py-[2px] rounded-md outline-none w-[90px] md:w-48 lg:w-56'
          />
        </div>
        : <></>
      }
      <div className='hidden sm:flex items-center justify-center space-x-2 md:space-x-6 font-medium text-[16px] '>
        {user ? <h3><Link to='/write'>Write</Link></h3> : <h3><Link to='/login'>Login</Link></h3>}
        {user ? 
          <div onClick={toggleMenu}>
            <p className='cursor-pointer'><FaBars/></p>
            {toggle && <Toggle/>}
          </div> 
          : 
          <h3><Link to='/signup'>SignUp</Link></h3>}
      </div>
      <div className='sm:hidden text-lg' onClick={toggleMenu}>
        <p><FaBars/></p>
        {
          toggle && <Toggle/>
        }
      </div>
    </div>
  )
}

export default Navbar
