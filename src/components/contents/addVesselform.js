import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/global.css';

const AddVesselForm = ({ onVesselAdded }) => {
  const [vesselName, setVesselName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to create a new vessel
      const response = await axios.post('http://localhost:5000/api/vessels', { vesselName });
      
      // Notify the parent component that a new vessel has been added
      onVesselAdded(response.data);

      // Clear the form input
      setVesselName('');
    } catch (error) {
      console.error('Error adding vessel:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="vesselName">Vessel Name: </label>
        <input
          type="text"
          id="vesselName"
          value={vesselName}
          onChange={(e) => setVesselName(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Vessel</button>
    </form>
  );
};

export default AddVesselForm;
