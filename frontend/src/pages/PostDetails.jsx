import React, { useContext, useEffect, useState } from 'react'
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import Comments from '../components/Comments'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { URL,IF } from '../url.js'
import { UserContext } from '../context/Usercontext'
import Loader from '../components/Loader.jsx'

const PostDetails = () => {

    const {user} = useContext(UserContext);

    const [post,setPost] = useState({});
    const [loader,setLoader] = useState(false);

    const postId = useParams().id;

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

  useEffect(()=>{
    fetchPost();
  },[])

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
                            <p><BiEdit/></p>
                            <p><MdDelete/></p>
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
                className='w-[65%] mx-auto my-8'
                />
                <p className='mx-auto'>{post.desc}</p>
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
                <div className='flex flex-col'>
                    <h3 className='mb-2 font-semibold'>Comments :</h3>
                    {/*comment*/}
                    <Comments/>
                    <Comments/>
                    <Comments/>
                    <Comments/>
                </div>
                {/* write a comment */}
                <div className='flex flex-col mb-4 md:flex-row justify-center items-center space-x-2'>
                    <input
                        className='w-[80%] px-4 mt-2 py-3 md:mt-0 border-black border-2'
                        type="text"
                        placeholder='Write a Comment'
                    />
                    <button className='bg-emerald-400 text-black hover:bg-black hover:text-emerald-400 font-bold px-[2px] sm:px-[6px] py-[2px] sm:py-[6px] w-[40%] md:w-[20%] mt-4 md:mt-0 border-black'>Add Comment</button>
                </div>
            </div>
        }
    </div>
  )
}

export default PostDetails