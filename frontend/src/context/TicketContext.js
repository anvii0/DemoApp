// src/context/TicketContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

export const TicketContext = createContext();

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('tickets');
    if (stored) setTickets(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  return (
    <TicketContext.Provider value={{ tickets, setTickets }}>
      {children}
    </TicketContext.Provider>
  );
}

// ✅ Custom hook
export const useTickets = () => useContext(TicketContext);