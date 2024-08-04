import React, { useEffect, useState } from 'react'
import Post from '../Post'
import axios from 'axios';
const Indexpage = () => {
  const [posts,setPosts] = useState([]);
  useEffect(()=>{
    async function fetchData(){
        const response =  await axios.get('http://localhost:4000/post')
        setPosts(response.data);
    }
    fetchData()
  },[])
  return (
    <div>
    {posts.length>0 && posts.map((post,ind)=>(
      <Post key={ind} {...post}/>
    ))}
    </div>
  )
}

export default Indexpage
