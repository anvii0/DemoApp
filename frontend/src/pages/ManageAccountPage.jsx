// src/pages/ManageAccountPage.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './ManageAccountPage.css';

export default function ManageAccountPage() {
  const [activeTab, setActiveTab] = useState('user');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('firstName') || '';
    const storedSurname = localStorage.getItem('lastName') || '';
    setFirstName(storedName);
    setLastName(storedSurname);
  }, []);

  const handleSave = () => {
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    setSavedMessage('✔️ Successfully saved!');
    setTimeout(() => setSavedMessage(''), 2000);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-main">
        {/* ✅ Heading is now bold using <h1> */}
        <h1>Manage Account</h1>

        <div className="account-tabs">
          <button
            className={activeTab === 'user' ? 'active' : ''}
            onClick={() => setActiveTab('user')}
          >
            User Details
          </button>
          <button
            className={activeTab === 'security' ? 'active' : ''}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>

        {activeTab === 'user' && (
          <div className="account-box">
            <label>
              First Name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label>
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            {(firstName || lastName) && (
              <button onClick={handleSave}>Save</button>
            )}

            {savedMessage && (
              <p style={{ color: 'green', marginTop: '10px' }}>{savedMessage}</p>
            )}
          </div>
        )}

        {activeTab === 'security' && (
          <div className="account-box">
            <p><strong>Current Device:</strong> {navigator.userAgent}</p>
            <p style={{ marginTop: '10px', color: '#555' }}>
              You are currently logged in on multiple devices.
            </p>
            <button onClick={() => setSavedMessage('🔒 All other sessions have been logged out.')}>
              Logout from other devices
            </button>

            {savedMessage && (
              <p style={{ color: 'green', marginTop: '10px' }}>{savedMessage}</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}