import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Add, Remove } from "@material-ui/icons";
import {useSelector,useDispatch} from 'react-redux'
import { unfollow,follow } from "../../Redux/Login/action";



export default function Rightbar({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [friends,setFriends] = useState([])
  const object  = useSelector((state)=>state)
  
  const {user:currentUser} = object

  const [followed,setFollowed] = useState(currentUser.followings.includes(user?._id))
  const dispatch = useDispatch()
  

  console.log(user,"in rightbar")



  useEffect(()=>{
    setFollowed(currentUser.followings.includes(user?._id))
  },[currentUser,user])
  useEffect(()=>{
    axios.get('http://localhost:4000/api/users/friends/'+user?._id).then(res => setFriends(res.data)).catch(err=>console.log(err))
  },[user])



  const handleClick = async() => {
    try { 
      if(followed){
        await axios.put("/users/"+user._id+"/unfollow",{userId:currentUser._id})
        dispatch(()=>unfollow(user._id))
      }
      else{
        await axios.put("/users/"+user._id+"/follow",{userId:currentUser._id})
        dispatch(()=>follow(user._id))
      }
    }
    catch(err){
      console.log(err)
    }
    setFollowed(!followed)
  }


  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={`${PF}ad.png`} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      {
        user.username!==currentUser.username&&(
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed?"Unfollow" : "Follow"}
            
            {followed?<Remove/>:<Add/>}
          </button>
        )
      }



        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship===1?"Single":user.relationship===1?"Married":"-"}</span>
          </div>
          
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">

          {friends.map((friend)=>(
            <Link to={"/profile/"+friend.username} style={{textDecoration:'none'}}>
              <div className="rightbarFollowing">
                <img
                  src={friend.profilePicture?PF+friend.profilePicture:PF+"person/noAvatar.png"}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}


// git init
// git add <folder1> <folder2> <etc.>
// git commit -m "Your message about the commit"
// git remote add origin https://github.com/yourUsername/yourRepository.git
// git push -u origin master
// git push origin master