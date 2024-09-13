import React from 'react';
import './SB.css';  // CSS imported here
import '../../App.css';  // Global styles including sidebar

import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav class = "sidebar" >
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="/add-vessel">Add Vessel</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><Link to="/timesheets">Timesheets</Link></li>
        <li><Link to="/inventory">Inventory</Link></li>
        <li><Link to="/reports">Reports</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
