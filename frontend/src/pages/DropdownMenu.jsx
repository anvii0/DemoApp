import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DropdownMenu.css'; // custom styling

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setOpen(false);
    if (path === 'signout') {
      // clear user session or token if any
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <div className="dropdown">
      <button onClick={() => setOpen(!open)} className="dropdown-button">
        ☰ Menu
      </button>
      {open && (
        <div className="dropdown-content">
          <div onClick={() => handleNavigation('/dashboard')}>Tickets</div>
          <div onClick={() => handleNavigation('/organization')}>Organization Settings</div>
          <div onClick={() => handleNavigation('/profile')}>Manage Account</div>
          <div onClick={() => handleNavigation('signout')}>Sign Out</div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;