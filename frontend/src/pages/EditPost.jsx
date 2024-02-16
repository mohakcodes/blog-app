import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {ImCross} from 'react-icons/im'
import { useNavigate, useParams } from 'react-router-dom';
import { URL } from '../url';


const EditPost = () => {

  const [category , setCategory] = useState("");
  const [categories , setCategories] = useState([]);

  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [file,setFile]=useState(null);

  const [post,setPost] = useState({});
  const postId = useParams().id;

  const navigate = useNavigate();
  
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

    const fetchPost = async() => {
        try {
            const res = await axios.get(`${URL}/api/post/${postId}`);
            setPost(res.data);
            console.log(res);

            setCategories(res.data.categories);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setFile(res.data.photo);

            console.log("thisispost",post);
        }
        catch (err) {
            console.log(err);
        }
      }
    
    const updatePost = async(e) => {
        e.preventDefault();
        if(file){
            const data=new FormData()
            const filename=Date.now()+file.name
            data.append("img",filename)
            data.append("file",file)
            try{
              const imgUpload=await axios.post(URL+"/api/upload",data);
              post.photo=filename;
            }
            catch(err){
              console.log(err)
            }
          }
        try {
            const updatedPostData = {
              ...post,
              title: title,
              desc: desc,
              categories: categories,
            };
        
            const res = await axios.put(`${URL}/api/post/${postId}`, updatedPostData, {
                withCredentials:true
            });
            console.log('Post updated successfully:', res.data);
            navigate("/posts/post/"+res.data._id)
        } 
        catch (error) {
            console.error('Error updating post:', error);
        }
    }

    useEffect(()=>{
        fetchPost();
      },[])

  return (
    <div className='px-6 md:px-[100px] mt-8 flex flex-col justify-center items-center'>
        <h1 className='font-bold text-xl md:text-2xl mb-4'>Update Your Post</h1>
        <form className='w-[80%] flex flex-col space-y-2 md:space-y-3 pb-8'>
            <h3 className='text-xl'>TITLE</h3>
            <input onChange={(e)=>setTitle(e.target.value)} defaultValue={post.title}  type="text" placeholder='Enter Blog Title' className='px-4 py-2 border-black border-2'/>
            <input onChange={(e)=>setFile(e.target.files[0])} type="file" className='py-2'/>
            <div className='flex flex-col'>
                <div className='flex items-center space-x-4 md:space-x-8'>
                    <div className='flex flex-col w-full'>
                        <h3 className='text-xl pb-3'>CATEGORY</h3>
                        <div className='flex'>
                            <input value={category} onChange={(e)=>setCategory(e.target.value)} defaultValue={post.categories} type="text" placeholder='Enter Blog Category' className='w-full px-4 py-2 border-black border-2'/>
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
            <textarea onChange={(e)=>setDesc(e.target.value)} rows={6} cols={15} placeholder='Enter Blog Description' defaultValue={post.desc} className=' px-4 py-2 outline-none border-black border-2'/>
            <button className='w-full bg-black text-white md:w-[20%] mx-auto font-semibold px-4 py-2 text-lg md:text-xl' onClick={updatePost}>UPDATE</button>
        </form>
    </div>
    )
}

export default EditPost