import React from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const InformationModal = ({ show, handleClose }) => {

  return (
    
      <Modal show={show} 
             onHide={handleClose}
             size='lg'
             >
        <Modal.Header closeButton>
          <Modal.Title>About</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        A comprehensive platform for displaying and filtering professional Valorant match statistics.
        <br/>
        Choose from a variety of filter combinations to customize your data view.
        <br/>
        All data is sourced from <a href="https://vlr.gg" target="_blank" rel="noopener noreferrer">vlr.gg</a>.
        <br/> <br/>
        <p>
        <strong>Masters Shanghai: </strong>Please note that statistics such as multi-kills, player clutches, head-to-heads and stats 
        based on side are not available on vlr.gg and, therefore, are not included in the Event, Player, and Team tables.
        </p>
        </Modal.Body>
      </Modal>
    
  );
};

export default InformationModal;
