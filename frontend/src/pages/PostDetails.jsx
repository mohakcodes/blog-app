import React, { useContext, useEffect, useState } from 'react'
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import Comments from '../components/Comments'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import { URL,IF } from '../url.js'
import { UserContext } from '../context/Usercontext'
import Loader from '../components/Loader.jsx'

const PostDetails = () => {

    const {user} = useContext(UserContext);

    const [post,setPost] = useState({});
    const [loader,setLoader] = useState(false);

    const postId = useParams().id;

    const navigate = useNavigate();

    const fetchPost = async() => {
        setLoader(true);
        try {
            const res = await axios.get(`${URL}/api/post/${postId}`);
            setPost(res.data);
            setLoader(false);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleDeletePost = async() => {
        try{
            const res = await axios.delete(`${URL}/api/post/${postId}`,{withCredentials:true})
            console.log("del post",res.data);
            navigate("/")
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchPost();
    },[postId])

  return (
    <div>
        {
            loader ? <div className='h-[68vh] flex justify-center items-center'><Loader/></div> :
            <div className='px-8 md:px-[100px] mt-8'>
                <div className='flex justify-between items-center space-x-4'>
                    <h1 className='text-2xl font-bold text-black md:text-3xl'>{post.title}</h1>
                    {
                        user?._id === post?.userId &&
                        <div className='flex flex-col sm:flex-row justify-center items-center space-x-0 sm:space-x-2 space-y-2 sm:space-y-0'>
                            <p style={{ fontSize: '26px' }} onClick={()=>navigate(`/edit/${postId}`)}><BiEdit/></p>
                            <p style={{ fontSize: '26px' }} onClick={()=>handleDeletePost()}><MdDelete/></p>
                        </div>
                    }
                </div>
                <div className='flex justify-between items-center mt-2 md:mt-4'>
                    <p className='font-semibold'>@{post.username}</p>
                    <div className='flex space-x-1 sm:space-x-2 text-sm sm:text-base'>  
                        <p>23/03/23</p>
                        <p>12:42</p>
                    </div>
                </div>
                <img 
                src={IF+post.photo} 
                alt="img" 
                className='w-[50%] mx-auto my-8'
                />
                <p style={{ fontSize: '24px', fontFamily:'sans-serif', backgroundColor:"wheat" }} className='mx-auto p-4'>{post.desc}</p>
                <div className='flex items-center my-6 space-x-4 font-semibold'>
                    <p>Categories :</p>
                    <div className='flex justify-center items-center space-x-2'>
                        {
                            post.categories?.map((cat,i)=>(
                                <div key={i} className='bg-gray-300 rounded-lg px-5 py-1'>{cat}</div>
                            ))
                        }
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default PostDetails