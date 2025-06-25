import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './OrganizationSettingsPage.css';
import { useTickets } from '../context/TicketContext';

export default function OrganizationSettingsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { setTickets } = useTickets();

  const handleAddMember = () => {
    if (!name || !email) return;

    const newTicket = {
      title: `New member: ${name}`,
      reportedBy: email,
      status: 'NEW',
      createdAt: new Date().toLocaleDateString(),
    };

    setTickets(prev => [...prev, newTicket]);
    setName('');
    setEmail('');
  };

  return (
    <div className="org-settings-page">
      <Sidebar />
      <div className="org-settings-content">
        <div className="settings-box">
          <h2>Team Members</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Member name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="add-btn" onClick={handleAddMember}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}