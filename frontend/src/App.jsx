// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import OrganizationSettingsPage from './pages/OrganizationSettingsPage';
import ManageAccountPage from './pages/ManageAccountPage';
import NewTicketPage from './pages/NewTicketPage';
import TicketEditPage from './pages/TicketEditPage';
import { TicketProvider } from './context/TicketContext';
import './global.css';

function App() {
  return (
    <TicketProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/org-settings" element={<OrganizationSettingsPage />} />
          <Route path="/account" element={<ManageAccountPage />} />
          <Route path="/tickets/new" element={<NewTicketPage />} />
          <Route path="/tickets/:id" element={<TicketEditPage />} />
        </Routes>
      </Router>
    </TicketProvider>
  );
}

export default App;