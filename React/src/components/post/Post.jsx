import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState,useEffect } from "react";
import axios from 'axios'
import {useSelector} from 'react-redux'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'


export default function Post({ post }) {
  
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user,setUser] = useState({})

  const object  = useSelector((state)=>state)
  const {user:currentUser} = object

  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id,post.likes])



  useEffect(()=>{
      axios.get(`http://localhost:4000/api/users?userId=${post.userId}`).then(res=>setUser(res.data)).catch(err=>console.log(err))
  },[post.userId])



  const likeHandler =()=>{
    try{
      axios.put("http://localhost:4000/api/posts/"+post._id+"/like",{userId : user._id})
    }
    catch(err){
      console.log(err)
    }
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked) 
  }

  console.log(currentUser,"I am from redux user")

  console.log(user,"I am user")

  console.log(post,"i am post ")

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link> 
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">  
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={`${PF}post.img`} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}


