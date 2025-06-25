import React, { useState } from 'react';
import './ProfileForm.css';

function ProfilePage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', age: '', address: '' });
  const [message, setMessage] = useState('');

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setStep(1); // Reset form
        setForm({ name: '', age: '', address: '' });
      } else {
        setMessage(data.message || 'Something went wrong');
      }
    } catch (err) {
      setMessage('Server not connected');
    }
  };

  return (
    <div className="profile-container">
      <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
        <h2>Create Profile</h2>
        <p className="step-indicator">Step {step} of 3</p>
        {message && <div className="error">{message}</div>}

        {step === 1 && (
          <input
            type="text"
            placeholder="Enter name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        )}
        {step === 2 && (
          <input
            type="number"
            placeholder="Enter age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />
        )}
        {step === 3 && (
          <input
            type="text"
            placeholder="Enter address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />
        )}

        <div className="button-row">
          {step > 1 && <button className="back-btn" onClick={handleBack}>Back</button>}
          {step < 3 && <button className="next-btn" onClick={handleNext}>Next</button>}
          {step === 3 && <button className="submit-btn" onClick={handleSubmit}>Submit</button>}
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;