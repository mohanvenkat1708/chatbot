import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
    return (
        <div className="home-page">
            {/* Hero Banner Section */}
            <div className="hero-banner">
                <h1>Transform Communication</h1>
                <p>Smart chat solutions for organizations.</p>
                <Link to="/get-started" className="cta-button">Get Started</Link>
            </div>

            {/* Role Cards Section */}
            <div className="cards-container">
                <Link to="/admin-login" className="card">
                    <div className="card-icon">👨‍💼</div>
                    <h3>Admin</h3>
                </Link>
                <Link to="/organizations" className="card">
                    <div className="card-icon">🏢</div>
                    <h3>Organization</h3>
                </Link>
                <Link to="/user-login" className="card">
                    <div className="card-icon">🎓</div>
                    <h3>Student/Faculty</h3>
                </Link>
                <Link to="/org-details" className="card">
                    <div className="card-icon">ℹ️</div>
                    <h3>General Info</h3>
                </Link>
            </div>

            {/* Footer with Call to Action */}
            <div className="footer">
                <p>Ready to enhance your organization?</p>
                <Link to="/learn-more">Learn More</Link>
            </div>
        </div>
    );
};

export default HomePage;
