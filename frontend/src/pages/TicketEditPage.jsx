// src/pages/TicketEditPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TicketEditPage.css';

export default function TicketEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem('tickets')) || [];
    const foundTicket = storedTickets.find((_, index) => index.toString() === id);
    setTicket(foundTicket);
  }, [id]);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    tickets[parseInt(id)] = ticket;
    localStorage.setItem('tickets', JSON.stringify(tickets));
    navigate('/dashboard');
  };

  if (!ticket) return <p>Loading...</p>;

  return (
    <div className="ticket-edit-container">
      <h1>Edit Ticket</h1>

      <label>Title</label>
      <input
        type="text"
        name="title"
        value={ticket.title}
        onChange={handleChange}
      />

      <label>Description</label>
      <textarea
        name="description"
        value={ticket.description || ''}
        onChange={handleChange}
      />

      <label>Status</label>
      <select name="status" value={ticket.status} onChange={handleChange}>
        <option value="NEW">New</option>
        <option value="INPROGRESS">In Progress</option>
        <option value="RESOLVED">Resolved</option>
        <option value="CLOSED">Closed</option>
      </select>

      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
}