import React, { useState } from 'react'

const Registerpage = () => {
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  async function register(ev){
    ev.preventDefault();
    const response=await fetch('http://localhost:4000/register',{
      method:'POST',
      body:JSON.stringify({username,password}),
      headers:{'Content-Type':'application/json',}

    });
    if(response.status===200){
      alert('registration successfull');
    }
    else{
      alert('registration failed');
    }
  }
  return (
    <div>
        <form className="register" onSubmit={register}>
        <input type='text' 
        placeholder='username'
        value={username}
        onChange={ev=>setUsername(ev.target.value)}/>
        <input type='password' 
        placeholder='password'
        value={password}
        onChange={ev=>setPassword(ev.target.value)}/>
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Registerpage
