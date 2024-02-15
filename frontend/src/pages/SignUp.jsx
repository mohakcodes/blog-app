import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import {URL} from "../url.js"

const SignUp = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async() => {
    if(username==="" || email==="" || password===""){
      setError(true);
      return;
    }
    try {
      const res = await axios.post(`${URL}/api/auth/signup` , {
        username,
        email,
        password,
      });
      console.log("res->",res);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate("/login");
    }
    catch (err) {
      setError(true);
      console.log(err);
    }
  }

  return (
    <div className='w-full flex justify-center items-center h-[70vh]'>
        <div className='w-[80%] md:w-[35%] flex flex-col justify-center items-center space-y-4'>
            <h1 className='text-2xl font-bold text-left p-2'>Create Your Account</h1>
            <input
              onChange={(e)=>setUsername(e.target.value)}
              className='w-full px-4 py-2 border-2 border-black' 
              type="text" 
              placeholder='Enter Username'
            />
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
            <button onClick={handleSubmit} className='w-full p-2 text-md font-bold bg-emerald-400 rounded-lg hover:bg-black hover:text-emerald-400'>SIGN UP</button>
            {error && <h3 className='text-red-500 text-sm'>Something Went Wrong</h3>}
            <div className='w-full flex justify-start items-center space-x-2'>
                <p className='italic'>Already Registered?</p>
                <p className='font-semibold px-4 py-[4px] bg-slate-400 hover:bg-fuchsia-300 rounded-lg'><Link to='/login'>Login</Link></p>
            </div>
        </div>
    </div>
  )
}

export default SignUp