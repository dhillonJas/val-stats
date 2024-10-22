import {React, useState} from 'react';
import './css/Header.css'; // Importing the CSS file for styling
import InformationModal from './InformationModal';

const Header = () => {

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <header className="header">
      <img src={`${process.env.PUBLIC_URL}/logo_vandal.png`} alt="Logo" className="logo" />
      <h1 className="title">Valorant Stats Central</h1>   
      <img src={`${process.env.PUBLIC_URL}/logo_phantom.png`} alt="Logo" className="logo" />
      
      
      <button className='info-button'
              onClick={handleShow}>
        ⓘ
      </button>
      <InformationModal show={showModal} handleClose={handleClose} />
    </header>
  );
};

export default Header;