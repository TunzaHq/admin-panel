import React from 'react';
import '../Style/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="navbar-links">
        <div className="navbar-section">
          <h3>Dashboard</h3>
        </div>
        <div className="navbar-section">
          <h3>Users</h3>
        </div>
        <div className="navbar-section">
          <h3>Policies</h3>
        </div>
        <div className="navbar-section">
          <h3>Claims</h3>
        </div>
        <div className="navbar-section">
          <h3>Payments</h3>
        </div>
      </div>
      <div className="navbar-bottom">
        <div className="navbar-section">
          <h3>Notifications</h3>
        </div>
        <div className="navbar-section">
          <h3>Logout</h3>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
