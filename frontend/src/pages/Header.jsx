// src/pages/Header.jsx
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="cloudqa-header">
      <img
        src="/cloudqa.png"
        alt="CloudQA Logo"
        className="cloudqa-logo"
      />
    </header>
  );
};

export default Header;