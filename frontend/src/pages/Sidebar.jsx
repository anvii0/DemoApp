// src/pages/Sidebar.jsx or src/components/Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear localStorage or auth tokens
    localStorage.clear();

    // Redirect to login
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      {/* ✅ Removed <h2>Demo SaaS</h2> */}

      <nav className="nav-links">
        <a href="/dashboard">Tickets</a>
        <a href="/org-settings">Organization settings</a>
        <a href="/account">Manage account</a>
        <button onClick={handleSignOut} className="signout-btn">Sign out</button>
      </nav>

      <div className="org-info">
        <p>Organization</p>
        <strong>SAAS</strong>
      </div>
    </aside>
  );
}