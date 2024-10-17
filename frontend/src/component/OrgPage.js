import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrgPage.css'; 
import myImage from '../assets/building.jpg';

const OrgPage = () => {
  const navigate = useNavigate();

  const handleCreateOrg = () => navigate('/manager-register');
  const handleViewEditDetails = () => navigate('/manager-login');

  return (
    <div className="org-page-container">
      {/* Background Image */}
      <div className="background-image" style={{ backgroundImage: `url(${myImage})` }}></div>

      <h1 className="org-title">Welcome to Organization Dashboard</h1>

      <div className="button-container">
        <button className="animated-button" onClick={handleCreateOrg}>
          <span className="icon">🏢</span> Create Organization
        </button>

        <button className="animated-button" onClick={handleViewEditDetails}>
          <span className="icon">🛠️</span> View/Edit Details
        </button>
      </div>
    </div>
  );
};

export default OrgPage;
