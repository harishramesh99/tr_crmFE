import React, { useState } from 'react';
import axios from 'axios';

const AddVessel = ({ onVesselAdded }) => {
  const [vesselName, setVesselName] = useState('');
  const [portfolioId, setPortfolioId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = { vesselName, portfolioId };
    alert(`Form Submitted!\nVessel Name: ${vesselName}\nPortfolio ID: ${portfolioId}`);

    try {
      const response = await axios.post('http://localhost:5000/API/vesselRoutes', submissionData);
      alert('Vessel added successfully!');

      // Clear form after submission
      setVesselName('');
      setPortfolioId('');

      if (onVesselAdded) {
        onVesselAdded(response.data);  // Notify parent component
      }
    } catch (err) {
      console.error("Error adding vessel", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Vessel Name:</label>
        <input
          type="text"
          value={vesselName}
          onChange={(e) => setVesselName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Portfolio ID:</label>
        <input
          type="text"
          value={portfolioId}
          onChange={(e) => setPortfolioId(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Vessel</button>
    </form>
  );
};

export default AddVessel;
