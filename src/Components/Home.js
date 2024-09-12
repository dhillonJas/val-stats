import React, { useState } from 'react';
import './Home.css'; 
import TeamDropdown from './TeamDropdowns';
import DataTable from './DataTable';
import allData from '../data/data.json'
const Home = () => {

  const columnNames = ['id', 'teamA', 'teamB', 'score', 'map']
  const [data, setData] = useState(allData);
  const [selectedButton, setSelectedButton] = useState('Team');
  const [filteredData, setFilteredData] = useState([]); // Filtered dataset (passed to DataTable)
  //const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10); // Items per page

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  function a(){ return data
  }

  //const indexOfLastItem = currentPage * dataPerPage;
  //const indexOfFirstItem = indexOfLastItem - dataPerPage;
  //const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <div className="home">
      <pre>{JSON.stringify(filteredData,null,2)}</pre>
      
      <div className="buttons">
        <button className="grid-button" onClick={() => handleButtonClick('Team')}>Team</button>
        <button className="grid-button" onClick={() => handleButtonClick('Map')}>Map</button>
        <button className="grid-button" onClick={() => handleButtonClick('Agent')}>Agent</button>
        <button className="grid-button" onClick={() => handleButtonClick('Player')}>Player</button>
      </div>

      {selectedButton === 'Team' && (
        <div>
          <TeamDropdown data={data} setData={setFilteredData}></TeamDropdown>
        	
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
      <DataTable filterData={filteredData} columnNames={columnNames}></DataTable>

    </div>
  );
};

export default Home;
