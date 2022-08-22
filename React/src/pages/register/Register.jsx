import "./register.css";
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router'
export default function Register() {

  const navigate = useNavigate()
  const [data,setData] = useState({
    username : '',
    email : '',
    password : '',
    
  }) 

  const handleChange = (e) =>{
    const {name,value} = e.target
    setData(prevState=>{
      return {
        ...prevState,
        [name] : value
      }
    })
  }

  console.log(data)
  const submitHandler = (e) =>{
    e.preventDefault()
    try{

      axios.post('http://localhost:4000/api/auth/register',data).then(res=>console.log(res)).catch(err=>console.log(err))
      navigate("/login")
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
           <form className="loginBox" onSubmit={submitHandler}>
            <input placeholder="Username" name="username" className="loginInput" onChange={handleChange} required />
            <input placeholder="Email" name="email" className="loginInput" onChange={handleChange} required type='email'/>
            <input placeholder="Password" name="password" className="loginInput" onChange={handleChange} required type='password' minLength="6"/>
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
