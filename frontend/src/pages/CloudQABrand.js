// src/components/CloudQABrand.jsx
import React from 'react';
import './CloudQABrand.css'; // optional styling

const CloudQABrand = () => {
  return (
    <div className="cloudqa-brand">
      <img
        src="/cloudqa-logo.png"
        alt="CloudQA Logo"
        className="cloudqa-logo"
      />
      <h1 className="cloudqa-name">CloudQA</h1>
    </div>
  );
};

export default CloudQABrand;