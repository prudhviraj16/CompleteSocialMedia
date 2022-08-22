import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function App() {
  const object  = useSelector((state)=>state)
  const {user} = object

  return (
    
      <Router>
        <Routes>
          <Route path="/" element={user?<Home/>:<Login/>}/>
          <Route path="/login" element={user? <Navigate to="/"/> : <Login/>}/>
          <Route path="/register" element={user? <Navigate to="/"/> : <Register/>}/>
          <Route path="/profile/:username" element={<Profile/>}/>
        </Routes>
      </Router>
  );
}

export default App;

