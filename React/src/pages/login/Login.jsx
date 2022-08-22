import "./login.css";
import {useSelector,useDispatch} from 'react-redux'
import { fetchData } from "../../Redux/Login/action";
import { useEffect,useState } from 'react';
import axios from 'axios'
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export default function Login() {
  const [data,setData] = useState({
    email : '',
    password : ''
  }) 

  
  const object  = useSelector((state)=>state)
  const {isFetching} = object
  const dispatch = useDispatch()  

  useEffect(()=>{
    dispatch(fetchData(data))
  },[data,dispatch])

  const handleChange = (e) =>{
    const {name,value} = e.target

    setData(prevState=>{
      return {
        ...prevState,
        [name] : value
      }
    })
    
  }

    const submitHandler = (e) =>{
      e.preventDefault();
      axios.post('http://localhost:4000/api/auth/login',data).then(res=>console.log(res.data)).catch(err=>console.log(err))
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
        <form className="loginBox" onSubmit={submitHandler} >
          <input
            placeholder="Email"
            name = "email"
            type="email"
            required
            className="loginInput"
            onChange={handleChange}
          />
          <input
            placeholder="Password"
            type="password"
            name = "password"
            required
            minLength="6"
            className="loginInput"
            onChange={handleChange} 
          />
            <button className="loginButton" type="submit" onClick={()=>dispatch(fetchData(data))}>{isFetching?
              <Box sx={{ display: 'flex',alignItems:'center',justifyContent:'center' }}>
                  <CircularProgress style={{color:"white",fontSize:"40px"}}/>
              </Box>:"Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
