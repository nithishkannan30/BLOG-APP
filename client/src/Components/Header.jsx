import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { UserContext } from '../Context-api/Usercontext';
const Header = () => {
  const {userinfo,setUserInfo}= useContext(UserContext)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile', { withCredentials: true });
        setUserInfo(response.data);
      } catch (error) {
        console.log(error)
      }

    }
    fetchProfile();
  }, [])

  function logout() {
    axios.post('http://localhost:4000/logout',{ withCredentials: true });
    setUserInfo(null);

  }
  const username = userinfo?.username;
  return (
    <header>
      <a href="" className='logo'>MyBlog</a>
      <nav>
        {username &&
          <>
            <Link to="/create">Create New Post</Link>
            <a className=' cursor-pointer' onClick={()=>{logout()}}>Logout</a>
          </>

        }
        {!username &&
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>

          </>

        }

      </nav>
    </header>

  )
}

export default Header
