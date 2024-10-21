import React from 'react';
import './css/Header.css'; // Importing the CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <img src={`${process.env.PUBLIC_URL}/logo-vandal.png`} alt="Logo" className="logo" />
      <h1 className="title">Valorant Stats Central</h1>   
      <img src={`${process.env.PUBLIC_URL}/logo-phantom.png`} alt="Logo" className="logo" />
    </header>
  );
};

export default Header;