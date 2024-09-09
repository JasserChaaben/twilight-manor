import React, { useState } from 'react';
import './SignIn.css';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
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
        
     <a href="/signup">Register</a>
      </form>
    </div>
  );
}

export default SignIn;
