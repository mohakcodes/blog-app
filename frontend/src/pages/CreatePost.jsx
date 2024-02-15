import React, { useContext, useState } from 'react'
import {ImCross} from 'react-icons/im'
import { UserContext } from '../context/Usercontext';
import axios from "axios";
import { URL } from "../url.js";
import {useNavigate} from "react-router-dom";

const CreatePost = () => {

  const [title , setTitle] = useState("");
  const [desc , setDesc] = useState("");
  const [file , setFile] = useState(null);

  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const [category , setCategory] = useState("");
  const [categories , setCategories] = useState([]);

  const deleteCategory = (i) => {
    let latestCategory = [...categories];
    latestCategory.splice(i,1);
    setCategories(latestCategory);
  }

  const addCategory = () => {
    let newCategory = [...categories];
    newCategory.push(category);
    setCategory("");
    setCategories(newCategory);
  }

  const handleCreate = async(e) => {
    e.preventDefault();
    const post = {
        title,
        desc,
        username:user.username,
        userId:user._id,
        categories,
    }
    if(file){
        console.log("came");
        const data = new FormData();
        const fileName = Date.now()+file.name;
        data.append("img",fileName);
        data.append("file",file);
        post.photo=fileName;

        console.log("went here",fileName);

        //uploading image
        try {
            const uploadedImg = await axios.post(`${URL}/api/upload` , data);
            console.log("uimg",uploadedImg);
        } 
        catch (err) {
            console.log(err);
        }
        console.log("gone");
    }
    //[uploading post]
    try {
        const res = await axios.post(`${URL}/api/post/create`, post, {withCredentials:true});
        console.log(res.data);  
        navigate(`/posts/post/${res.data._id}`)
    } 
    catch (err) {
        console.log(err);
    }
  }

  return (
    <div className='px-6 md:px-[100px] mt-8 flex flex-col justify-center items-center'>
        <h1 className='font-bold text-xl md:text-2xl mb-4'>Post Your Blog</h1>
        <form className='w-[80%] flex flex-col space-y-2 md:space-y-3 pb-8'>
            <h3 className='text-xl'>TITLE</h3>
            <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Enter Blog Title' className='px-4 py-2 border-black border-2'/>
            <input onChange={(e)=>setFile(e.target.files[0])} type="file" className='py-2'/>
            <div className='flex flex-col'>
                <div className='flex items-center space-x-4 md:space-x-8'>
                    <div className='flex flex-col w-full'>
                        <h3 className='text-xl pb-3'>CATEGORY</h3>
                        <div className='flex'>
                            <input value={category} onChange={(e)=>setCategory(e.target.value)} type="text" placeholder='Enter Blog Category' className='w-full px-4 py-2 border-black border-2'/>
                            <div onClick={addCategory} className='bg-black text-white px-4 sm:px-10 py-2 font-semibold cursor-pointer'>
                                ADD
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className='flex space-x-4 mt-4'>
                    {
                        categories?.map((x,i)=>(
                            <div key={i} className='flex justify-center items-center space-x-2 bg-gray-300 px-2 py-1 rounded-md '>
                                <p className='pb-[2px]'>{x}</p>
                                <p onClick={() => deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-[10px]'><ImCross/></p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <h3 className='text-xl'>DESCRIPTION</h3>
            <textarea rows={6} cols={15} onChange={(e)=>setDesc(e.target.value)} placeholder='Enter Blog Description' className=' px-4 py-2 outline-none border-black border-2'/>
            <button onClick={handleCreate} className='w-full bg-black text-white md:w-[20%] mx-auto font-semibold px-4 py-2 text-lg md:text-xl'>CREATE</button>
        </form>
    </div>
  )
}

export default CreatePost