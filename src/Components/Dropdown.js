import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/filters.css'

function DropdownComp({ selectedValue, setSelectedValue, options }) {

  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Filter options based on the search term
  const filteredOptions = options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (eventKey) => {
    setSelectedValue(eventKey); // Update the selected value in the parent component
  };

  return (
      <Dropdown 
          className='filter-dropdown'
          onSelect={handleSelect}  
          show={isOpen} 
          onToggle={() => setIsOpen(!isOpen)}
          >

        <Dropdown.Toggle variant="success" id="dropdown-split-basic" >
        {selectedValue}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <div style={{ padding: '10px' }}>
                      <input
                          type="text"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={e => setSearchTerm(e.target.value)}
                          style={{ width: '100%', marginBottom: '10px' }}
                      />
          </div>
          {filteredOptions.length > 0 ? 
                  (
                      filteredOptions.map((option, index) => (
                          <Dropdown.Item key={index} eventKey={option} onClick={() => { setSearchTerm(''); setIsOpen(false); }}>
                              {option}
                          </Dropdown.Item>
                      ))
                    ) : 
                    (
                      <Dropdown.Item disabled>No options found</Dropdown.Item>
                    )
          }
        </Dropdown.Menu>
      </Dropdown>
  );
}

export default DropdownComp;