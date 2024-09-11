import React, { useEffect, useState } from 'react';
import './SignIn.css';
import axios from 'axios'
import { useCookies } from 'react-cookie';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['username','floor']);
  const [success,setSuccess] = useState(false); 
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log(cookies)
    if (!username) {
      return;
    }
  
    if (!password) {
      return;
    }
  

     
    try {
      axios.post('http://localhost:8081/user', { username: username, password: password })
        .then(res => {
          if (res.data === 'Login Successfully') {
            setCookie('username', username, { path: '/' });
            setCookie('floor',1,{ path: '/' })
            setSuccess(true)
          } else {
            alert(res.data);
          }
        })
        .catch(err => {
          alert('Error during POST request:', err);
        });
    } catch (error) {
      alert('Exception occurred:', error);
    }
    
    console.log(cookies)
  };

  return (
    <>{success? 
      <div className="signup-container">
          <h1 className="signup-title">You're Ready!</h1>
          
     <a href="/"> <button type="submit" className="signup-button">Enter</button> </a>
      </div>
      :
    <div className="signin-container">
      <h1 className="signin-title">Sign In</h1>
      <form className="signin-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="signin-label">Username</label>
        <input
          type="text"
          id="username"
          className="signin-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password" className="signin-label">Password</label>
        <input
          type="password"
          id="password"
          className="signin-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="signin-button">Sign In</button>
        
     <a href="/signup" className='signin-change'>Register</a>
      </form>
    </div>}</>
  );
}

export default SignIn;
