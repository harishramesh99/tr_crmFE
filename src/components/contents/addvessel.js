import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddVesselForm = ({ onVesselAdded }) => {
  const [vesselName, setVesselName] = useState('');
  const [portfolios, setPortfolios] = useState([]);
  const [portfolioId, setPortfolioId] = useState('');

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        const response = await axios.get(`${apiUrl}/portfolios`);
        setPortfolios(response.data);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      }
    };
    fetchPortfolios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${apiUrl}/vessels`, { vesselName, portfolioId });
      onVesselAdded(response.data);
      setVesselName('');
      setPortfolioId('');
    } catch (error) {
      console.error('Error adding vessel:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Vessel Name:</label>
        <input
          type="text"
          value={vesselName}
          onChange={(e) => setVesselName(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label>Portfolio:</label>
        <select
          value={portfolioId}
          onChange={(e) => setPortfolioId(e.target.value)}
          required
          className="form-input"
        >
          <option value="" disabled>Select Portfolio</option>
          {portfolios.map((portfolio) => (
            <option key={portfolio._id} value={portfolio._id}>
              {portfolio.portfolioName}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn">Add Vessel</button>
    </form>
  );
};

export default AddVesselForm;
