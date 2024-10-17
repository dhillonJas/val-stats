import React, { useState, useCallback } from 'react';
import './Home.css'; 
import Team from './Team';
import Event from './Event';
import Player from './Player';
import DataTable from './DataTable';
import './css/tab.css'
import {LIST, STRING_LIST} from '../data/columns_names'

const Home = () => {

  const [selectedButton, setSelectedButton] = useState('Event');
  const [filteredData, setFilteredData] = useState([]); // Filtered dataset (passed to DataTable)
  const [columnsToShow, setColumnsToShow] = useState([]);

  const handleFilter = useCallback((filteredData) => {
    setFilteredData(filteredData);
  }, []);

  const handleColumnChange = (columns) => {
    setColumnsToShow(columns);
  };
  
  const handleTypeChange = (columns, column) => {
    let cols = columns
    if (cols[column].type === LIST)
      cols[column].type = STRING_LIST
    else if(cols[column].type === STRING_LIST)
      cols[column].type = LIST

    setColumnsToShow(cols)
  };

  return (
    <div style={{padding:10}}>      
      <div className="tabs-container">
        <button className={`tab ${selectedButton === 'Team' ? 'active' : ''}`} onClick={() => setSelectedButton('Team')}>Team</button>
        <button className={`tab ${selectedButton === 'Event' ? 'active' : ''}`} onClick={() => setSelectedButton('Event')}>Event</button>
        <button className={`tab ${selectedButton === 'Player' ? 'active' : ''}`} onClick={() => setSelectedButton('Player')}>Player</button>
        {/* <button disabled>Coming Soon</button> */}
      </div>

      {selectedButton === 'Team' && (
        <div>
          <Team onFilter={handleFilter}  onViewModeChange={handleColumnChange}></Team>
                  </div>
      )}
      {
        selectedButton === 'Event' && (
          <div>
            <Event onFilter={handleFilter} onViewModeChange={handleColumnChange}> </Event>
          </div>
        
      )}
      {
        selectedButton === 'Player' && (
          <div>
            <Player onFilter={handleFilter} onViewModeChange={handleColumnChange}> </Player>
          </div>
        
      )}      
      <DataTable data={filteredData}
      columns={columnsToShow}
      selectedButton={selectedButton}
      handleCollapseable={handleTypeChange}
      ></DataTable>

    </div>
  );
};

export default Home;
