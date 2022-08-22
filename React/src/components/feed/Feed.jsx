import Share from "../share/Share";
import "./feed.css";
import {useState,useEffect} from 'react'
import Post from './../post/Post'
import {useSelector} from 'react-redux'

import axios from 'axios'
const Feed = ({username}) => {
  // console.log(username)
  const [data,setData] = useState([])
  const object  = useSelector((state)=>state)
  const {user} = object
  useEffect(()=>{ 
    const fetchPosts = async() =>{
      const res = username ? await axios.get("http://localhost:4000/api/posts/profile/"+ username) : await axios.get("http://localhost:4000/api/posts/timeline/"+user._id)

      setData(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt) 
      })
      )
    }
    fetchPosts()
  },[username,user._id])


  
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username||username===user.username) && <Share />}
        {data.map((p)=>(
          <Post key={p._id} post={p}/>
        ))}
      </div>
    </div>
  );
}


export default Feed