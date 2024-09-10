// src/Pages/SignUp.js
import axios from 'axios'
import {  useState, useEffect } from "react";
import './SignUp.css';
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setrepeatPassword] = useState('');

  const [gender, setGender] = useState(0);

  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const [success,setSuccess] = useState(false); 
  // Validate username and password fields
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setPasswordMatch(password === repeatPassword);
  }, [password, repeatPassword]);

  // Check if the entire form is valid
  useEffect(() => {
    setFormValid(validUsername && validPassword && passwordMatch);
  }, [validUsername, validPassword, passwordMatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validUsername) {
      alert("Username is invalid. It should be 4-24 characters long, start with a letter, and can contain letters, numbers, underscores, or hyphens.");
      return;
    }

    if (!validPassword) {
      alert("Password is invalid. It should be 8-24 characters long, include uppercase and lowercase letters, a number, and a special character.");
      return;
    }

    if (!passwordMatch) {
      alert("Passwords do not match. Please ensure the 'Repeat Password' field matches the 'Password' field.");
      return;
    }

    // Handle successful form submission
    e.preventDefault();
    axios.post('http://localhost:8081/add', {username:username,password:password,gender:gender})
    .then(res => res.data==='User added successfully'?setSuccess(true):alert(res.data))
    .catch(err => console.log(err));
  };

  return (
    <>{success? 
        <div className="signup-container">
            <h1 className="signup-title">Sign Up Successfully!</h1>
            
       <a href="/"> <button type="submit" className="signup-button">log in</button> </a>
        </div>
        :
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="signup-label">Username</label>
        <input
          type="text"
          id="username"
          className="signup-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="gender" className="signup-label">Gender</label>
<select
  id="gender"
  className="signup-input"
  value={gender}
  onChange={(e) => setGender(e.target.value)}
  required
>
  <option value="" disabled>Select your gender</option>
  <option value="0">Male</option>
  <option value="1">Female</option>
</select>
        <label htmlFor="password" className="signup-label">Password</label>
        <input
          type="password"
          id="password"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <label htmlFor="repeatPassword" className="signup-label">Repeat Password</label>
        <input
          type="password"
          id="repeatPassword"
          className="signup-input"
          value={repeatPassword}
          onChange={(e) => setrepeatPassword(e.target.value)}
          required
        />
        <button type="submit" className="signup-button">Sign Up</button>
        
     <a href="/" className='signup-change'>Login</a>
      </form>
    </div>}</>
  );
}

export default SignUp;
