// src/pages/NewTicketPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewTicketPage.css';

export default function NewTicketPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const newTicket = {
      reportedBy: email,
      name,
      title,
      description,
      status: 'New',
      createdAt: new Date().toLocaleDateString()
    };

    const existing = JSON.parse(localStorage.getItem('tickets')) || [];
    existing.push(newTicket);
    localStorage.setItem('tickets', JSON.stringify(existing));
    navigate('/dashboard');
  };

  return (
    <div className="new-ticket-container">
      <h2>Submit new ticket</h2>
      <form className="ticket-form">
        <label>Reported by (email) *</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <label>Your name *</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />

        <label>Title *</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />

        <label>Description *</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} required />

        <div className="button-row">
          <button type="button" onClick={() => navigate('/dashboard')}>Go back</button>
          <button type="button" className="submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
}