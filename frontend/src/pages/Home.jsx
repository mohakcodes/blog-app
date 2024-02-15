import React, { useContext, useEffect, useState } from 'react'
import HomePosts from '../components/HomePosts'
import axios from 'axios';
import {URL} from '../url.js'
import { Link, useLocation } from 'react-router-dom';
import Loader from '../components/Loader.jsx'
import { UserContext } from '../context/Usercontext';

const Home = () => {

  const [posts,setPosts] = useState([]);
  const [noFeed,setNoFeed] = useState(false);
  const [loader,setLoader] = useState(false);

  const {user} = useContext(UserContext);

  const {search} = useLocation();

  const fetchPosts = async() => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/post/${search}`);
      setPosts(res.data);
      if(res.data.length === 0){
        setNoFeed(true);
      }
      else{
        setNoFeed(false);
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
    <div className='px-8 md:px-[200px] min-h-[66vh]'>
      {
        loader ?
        <div className='h-[40vh] flex justify-center items-center'><Loader/></div>
        :
        !noFeed ?
        posts.map((post)=>(
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
  )
}

export default Home