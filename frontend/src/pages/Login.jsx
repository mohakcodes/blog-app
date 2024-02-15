import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import {URL} from "../url.js"
import { UserContext } from '../context/Usercontext.jsx';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const {setUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async() => {
    try {
      const res = await axios.post(`${URL}/api/auth/login` , {
        email,
        password,
      },{
        withCredentials:true,
      })
      setUser(res.data);
      navigate("/");
    } 
    catch (err) {
      setError(true);
      console.log(err);
    }
  }

  return (
    <div className='w-full flex justify-center items-center h-[70vh]'>
        <div className='w-[80%] md:w-[35%] flex flex-col justify-center items-center space-y-4'>
            <h1 className='text-2xl font-bold text-left p-2'>Login To Your Account</h1>
            <input 
              onChange={(e)=>setEmail(e.target.value)}
              className='w-full px-4 py-2 border-2 border-black'
              type="email"
              placeholder='Enter Your E-Mail'
            />
            <input
              onChange={(e)=>setPassword(e.target.value)}
              className='w-full px-4 py-2 border-2 border-black' 
              type="text" 
              placeholder='Enter Your Password'
            />
            <button onClick={handleLogin} className='w-full p-2 text-md font-bold bg-emerald-400 rounded-lg hover:bg-black hover:text-emerald-400'>LOGIN</button>
            {error && <h3 className='text-red-500 text-sm'>Something Went Wrong</h3>}
            <div className='w-full flex justify-start items-center space-x-2'>
                <p className='italic'>Not Registered?</p>
                <p className='font-semibold px-4 py-[4px] bg-slate-400 hover:bg-fuchsia-300 rounded-lg'><Link to='/signup'>SignUp</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Login