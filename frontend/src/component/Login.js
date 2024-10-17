import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import './Login.css';  
import { jwtDecode } from 'jwt-decode';


function Login({role, title}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 


  
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(role);
    console.log('Login Attempt:', { email, password });

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      console.log('Login Response:', response.data);
      setMessage('Login successful');
      
      
      const { token } = response.data;
      localStorage.setItem('authToken', token); 

      // Decode the token to get the role
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);

      const userRole = decodedToken.role;  // Extract role from the decoded token
      console.log('User Role:', userRole);

      console.log(role);
      if(userRole === role)
      {
        setMessage('Login successful');

          if (role === 'admin') {
          navigate('/admin-panel');  
          } else if (role === 'manager') {
          navigate('/manager-dashboard');  
          } else if (role === 'student' || role === 'faculty') {
          navigate('/student-faculty-dashboard');  
          } else {
          setMessage('Unrecognized role');  
          }
      }
      else{
        setMessage("Login Failed!");
        setTimeout(() => {
          navigate('/register'); 
        }, 500); 
      }
      
      
      
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
      setMessage('Login failed: ' + (error.response ? error.response.data.error : error.message));
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>{title}</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        {message && <p className="login-message">{message}</p>}
        { role==='manager' && <p className="login-link">
          Not registered yet? <Link to="/manager-register">Register here</Link>
        </p>}
      </div>
    </div>
  );
}

export default Login;
