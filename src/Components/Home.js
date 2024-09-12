import React, { useState } from 'react';
import './Home.css'; 
import TeamDropdown from './TeamDropdowns';
import DataTable from './DataTable';
import allData from '../data/data.json'
const Home = () => {

  const columnNames = ['id', 'TeamA', 'TeamB', 'score', 'map']
  const [data, setData] = useState(allData);
  const [selectedButton, setSelectedButton] = useState('Team');

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  function a(s){console.log('data ' + s, data)}

  return (
    <div className="home">
      <h1>{a('first ')}</h1>
      <div className="buttons">
        <button className="grid-button" onClick={() => handleButtonClick('Team')}>Team</button>
        <button className="grid-button" onClick={() => handleButtonClick('Map')}>Map</button>
        <button className="grid-button" onClick={() => handleButtonClick('Agent')}>Agent</button>
        <button className="grid-button" onClick={() => handleButtonClick('Player')}>Player</button>
      </div>

      {selectedButton === 'Team' && (
        <div>
          <TeamDropdown data={data} setData={setData}></TeamDropdown>
        </div>
      )}
      {
        selectedButton === 'Map' && (
          <div>
          {/* <DropdownComp selectedValue={selectedMapValue} 
            setSelectedValue={setSelectedMapValue}
            handleFilter={handleFilter}
            options={Maps}
            > 
          </DropdownComp> */}
          </div>
        
      )}
      <DataTable filterData={data} columnNames={columnNames}></DataTable>

    </div>
  );
};

export default Home;
