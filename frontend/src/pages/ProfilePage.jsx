import React, { useContext, useEffect, useState } from 'react'
import ProfilePosts from '../components/ProfilePosts'
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/Usercontext';
import axios from 'axios';
import Loader from '../components/Loader';
import { URL } from '../url';
import HomePosts from '../components/HomePosts';

const ProfilePage = () => {

  const [UserPosts,setUserPosts] = useState([]);
  const [noUserFeed,setNoUserFeed] = useState(false);
  const [loader,setLoader] = useState(false);

  const {user} = useContext(UserContext);
  console.log("user",user);

  const {search} = useLocation();

  const fetchPosts = async() => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/post/user/${user._id}`);
      console.log("response received:", res);
      setUserPosts(res.data);
      console.log(UserPosts);
      if(res.data.length === 0){
        setNoUserFeed(true);
      }
      else{
        setNoUserFeed(false);
      }
      setLoader(false);
    } 
    catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchPosts();
  },[search]);

  return (
    <div className='px-8 md:px-[70px] mt-8 flex flex-col md:flex-row pb-20'>
        <div className='w-full md:w-[70%] flex flex-col'>
            <h1 className='text-xl font-bold mb-0 mt-6 md:mt-0 md:mb-4'>Your Posts</h1>
            <div className='px-8 md:px-[200px] min-h-[66vh]'>
            {
              loader ?
              <div className='h-[40vh] flex justify-center items-center'><Loader/></div>
              :
              !noUserFeed ?
              UserPosts.map((post)=>(
                <>
                  <Link to={user ? `/posts/post/${post._id}` : `/login`}>
                    <HomePosts key={post._id} post={post}/>
                  </Link>
                </>
              ))
              :
              <h3 className='text-center font-bold mt-16'>No Posts Found</h3>
            }
          </div>
        </div>
        
    </div>
  )
}

export default ProfilePage