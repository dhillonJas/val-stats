import React from 'react';
import './css/Header.css'; // Importing the CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <img src="/logo-vandal.png" alt="Logo" className="logo" />
      <h1 className="title">Valorant Stats Central</h1>   
      <img src="/logo-phantom.png" alt="Logo" className="logo" />
    </header>
  );
};

export default Header;