import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../assest/css/dashboard.css'; 

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h3>Menu</h3>
        <Link to="/dashboard" className="sidebar-link"> All Contacts</Link>
        <Link to="/dashboard/add-contact" className="sidebar-link">Add Contact</Link>
      </div>
      <div className="dashboard-content">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Dashboard;
