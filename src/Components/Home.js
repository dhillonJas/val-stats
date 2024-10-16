import React, { useState, useCallback } from 'react';
import './Home.css'; 
import Team from './Team';
import Event from './Event';
import Player from './Player';
import DataTable from './DataTable';
import './css/tab.css'
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
      selectedButton={selectedButton}></DataTable>

    </div>
  );
};

export default Home;
