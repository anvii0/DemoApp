// DashboardPage.jsx (FINAL VERSION)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './DashboardPage.css';

export default function DashboardPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('any');
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [goToPage, setGoToPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('tickets')) || [];
    setTickets(savedTickets);
  }, []);

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === 'any' || ticket.status.toLowerCase() === statusFilter)
  );

  const totalPages = Math.ceil(filteredTickets.length / rowsPerPage);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleTicketClick = (index) => {
    navigate(`/tickets/${index}`);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-main">
        {/* ✅ Properly bold heading */}
        <h1>Tickets</h1>

        {/* Search, Status Filter & New Button */}
        <div className="search-filter-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="status-dropdown"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="any">Any</option>
            <option value="new">New</option>
            <option value="inprogress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <button
            className="new-ticket-button"
            onClick={() => navigate('/tickets/new')}
          >
            New
          </button>
        </div>

        {/* Tickets List */}
        {filteredTickets.length === 0 ? (
          <div className="no-tickets-box">
            <p>No tickets yet.</p>
            <p>Add an organization to get started.</p>
          </div>
        ) : (
          <table className="ticket-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Reported by</th>
                <th>Status</th>
                <th>Created at</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTickets.map((ticket, index) => (
                <tr
                  key={index}
                  onClick={() => handleTicketClick(index + (currentPage - 1) * rowsPerPage)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{ticket.title}</td>
                  <td>{ticket.reportedBy}</td>
                  <td>
                    <span className={`status-badge ${ticket.status.toLowerCase()}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td>{ticket.createdAt}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Are you sure you want to delete this ticket?')) {
                          const updated = [...tickets];
                          updated.splice(index + (currentPage - 1) * rowsPerPage, 1);
                          localStorage.setItem('tickets', JSON.stringify(updated));
                          setTickets(updated);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {filteredTickets.length > 0 && (
          <div className="pagination-bar">
            <div className="pagination-controls">
              <button
                className="pagination-arrow"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                ‹
              </button>

              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>

              <button
                className="pagination-arrow"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                ›
              </button>
            </div>

            <div className="pagination-controls">
              <label>
                Go to page
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  className="go-to-input"
                  value={goToPage}
                  onChange={(e) => setGoToPage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const page = Math.min(Math.max(1, Number(goToPage)), totalPages);
                      setCurrentPage(page);
                    }
                  }}
                />
              </label>

              <label>
                Rows per page
                <select
                  className="rows-dropdown"
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </label>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}