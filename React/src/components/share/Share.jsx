import "./share.css";
import axios from 'axios'
import {PermMedia, Label,Room, EmojiEmotions, Cancel} from "@material-ui/icons"
import {useSelector} from 'react-redux'
import {useState} from 'react'



export default function Share() {

  const object  = useSelector((state)=>state)
  const {user} = object
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [desc,setDesc] = useState('')
  const [file,setFile] = useState(null)

  const handlerChange = (e) =>{
    setDesc(e.target.value)
  } 

  const submitHandler = async(e) => {
    e.preventDefault();
    
    const newPost = {
      userId : user._id,
      desc : desc
    }

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("file", file);
      data.append("name", fileName);
      newPost.img = fileName;
      try {
        await axios.post("http://localhost:4000/api/upload", data);
      } catch (err) {
        console.log(err)
      }
    }
    try {
      await axios.post("http://localhost:4000/api/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };



  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ? PF+user.profilePicture: PF+"person/noAvatar.png"} alt="" />
          <input
            placeholder={"What's in your mind "+user.username+"?"}
            className="shareInput" onChange={handlerChange} value={desc}
          />
        </div>
        <hr className="shareHr"/>
        {file&&(
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} className='shareImg' alt="" />
            <Cancel className="shareCancelImg" onClick={()=>setFile(null)}/>
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input style={{display : "none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                </label>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}
