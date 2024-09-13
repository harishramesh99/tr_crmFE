// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.js';
import TopBar from './components/TopBar/TopBar.js';
import Dashboard from './components/contents/dashboard.js';
import Portfolio from './components/contents/Portfolio.js';
import AddVessel from './components/contents/addvessel.js';  // Import AddVessel form
import Requests from './components/contents/Request.js';
import Timesheets from './components/contents/timesheets.js';
import Inventory from './components/contents/inventory.js';
import Reports from './components/contents/reports.js';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <TopBar />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/add-vessel" element={<AddVessel />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/timesheets" element={<Timesheets />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
