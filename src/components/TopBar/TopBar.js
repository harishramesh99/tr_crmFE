import React from 'react';
import '../../styles/TopBar.css';  
import NotificationDropdown from './NotificationDropdown.js';
import Profile from './ProfileMenu.js';


// Correct import path for CSS

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <h1>Shipbuilding CRM</h1>
      </div>
      <div className="top-bar-right">
        <input type="text" placeholder="Search..." />
        <button>{JSON.stringify(NotificationDropdown)}</button>
        <button>{JSON.stringify(Profile)}</button>
      </div>
    </div>
  );
};

export default TopBar;
