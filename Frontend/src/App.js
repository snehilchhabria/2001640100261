import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    companyName: '',
    ownerName: '',
    rollNo: '',
    ownerEmail: '',
    accessCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://localhost:5000/train/register/',
        formData
      );
      console.log('API Response:', response.data);
      // You can add further logic here for success/failure handling
    } catch (error) {
      console.error('Error sending data:', error);
      // Handle error here
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Train Central Registration</h2>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Owner Name</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Roll Number</label>
          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Owner Email</label>
          <input
            type="email"
            name="ownerEmail"
            value={formData.ownerEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Access Code</label>
          <input
            type="text"
            name="accessCode"
            value={formData.accessCode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;
