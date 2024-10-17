import React, { useState } from 'react';
import axios from 'axios';

function UserCreation({ organizationId }) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); 
  const [message, setMessage] = useState('');

  const handleUserCreation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/users`, {
        email,
        password,
        role,
        organization: organizationId
      });
      setMessage('User created successfully!');
    } catch (error) {
      setMessage(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div>
      <h3>Add Users to Organization</h3>
      <form onSubmit={handleUserCreation}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        <button type="submit">Add User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UserCreation;
