import axios from 'axios';

// Define the base API URL
const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Export individual API request functions
export const fetchVessels = () => {
  return axios.get(`${apiBaseUrl}/vessels`);
};

export const fetchProjects = () => {
  return axios.get(`${apiBaseUrl}/projects`);
};

export const fetchInventory = () => {
  return axios.get(`${apiBaseUrl}/inventory`);
};

// Add more functions for your other API requests
