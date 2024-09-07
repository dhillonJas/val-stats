import React from 'react';
import './Header.css'; // Importing the CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <h1 className="title">Val Pro Match Stats</h1>
    </header>
  );
};

export default Header;