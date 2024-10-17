import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

// Assuming UserCreation is the component where users will be added
import UserCreation from './UserCreation'; // Import your UserCreation component

function Register({ role, title }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [managerId, setManagerId] = useState(null); // State to hold the manager's ID
  const [orgName, setOrgName] = useState(''); // State for organization name
  const [isRegistered, setIsRegistered] = useState(false); // State to track registration
  const [message, setMessage] = useState('');
  const [organizationId, setOrganizationId] = useState(null); // State to hold the organization ID
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
        role
      });
      setMessage(response.data.message);
      setManagerId(response.data._id); 
      setIsRegistered(true); 
    } catch (error) {
      setMessage(error.response ? error.response.data.message : error.message);
    }
  };

  const handleCreateOrganization = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/org', {
        name: orgName,
        manager: managerId
      });
      setMessage('Organization created successfully!'); 
      // Fetch the organization ID from the response
      setOrganizationId(response.data._id); // Assuming the response contains the organization ID

      // Optionally, redirect or perform additional actions here
    } catch (error) {
      setMessage(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="register-page">  
      <div className="register-card">
        <h2>{isRegistered ? 'Create Organization' : `${title}`}</h2>
        {!isRegistered ? (
          <form onSubmit={handleRegister} className="register-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
              required
            />
            <button type="submit" className="register-button">Register</button>
          </form>
        ) : (
          <form onSubmit={handleCreateOrganization} className="register-form">
            <input
              type="text"
              placeholder="Organization Name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="register-input"
              required
            />
            <button type="submit" className="register-button">Create Organization</button>
          </form>
        )}
        {message && <p className="register-message">{message}</p>}
        {organizationId && (
          <UserCreation organizationId={organizationId} /> // Pass the organizationId as a prop to UserCreation
        )}
        <p className="register-link">
          Already registered? <Link to="/manager-login">Log in here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
