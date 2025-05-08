import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import "./Login.css";

// assets
import logo from "../assets/ignatiuslogo.svg";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth`, 
        {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Server responded with error:', data);
        setError(data.message || 'Login failed');
      } else {
        console.log('Login successful');
        setIsLoggedIn(true); 
        navigate('/billing'); 
      }
    } catch (err) {
      console.error('Network or server error:', err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className='content'>
      <div className='Login-Header'>
        <img src={logo} alt="logo" />
        <h2>Billing System</h2>
      </div>
      <form className='Login-Form' onSubmit={handleLogin}> 
        <input className='login-input' 
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input className='login-input' 
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className='login-submit'>Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
