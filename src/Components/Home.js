import React, { useState, useCallback } from 'react';
import './Home.css'; 
import Team from './Team';
import Event from './Event';
import Player from './Player';
import DataTable from './DataTable';
import { columns_information } from '../data/columns_names';

const Home = () => {

  const [selectedButton, setSelectedButton] = useState('Event');
  const [filteredData, setFilteredData] = useState([]); // Filtered dataset (passed to DataTable)
  const [columnsToShow, setColumnsToShow] = useState([]);
  // const [viewMode, setViewMode ] = useState('Information');

  const handleFilter = useCallback((filteredData) => {
    setFilteredData(filteredData);
  }, []);

  const handleColumnChange = (columns) => {
    setColumnsToShow(columns);
  };
//  const columns = columns_information[selectedButton][viewMode]

  return (
    <div className="home">      
      <div className="buttons">
        <button className="grid-button" onClick={() => setSelectedButton('Team')}>Team</button>
        <button className="grid-button" onClick={() => setSelectedButton('Map')}>Map</button>
        <button className="grid-button" onClick={() => setSelectedButton('Event')}>Event</button>
        <button className="grid-button" onClick={() => setSelectedButton('Player')}>Player</button>
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
            <Player onFilter={handleFilter}> </Player>
            </div>
        
      )}      
      <DataTable data={filteredData}
      columns={columnsToShow}></DataTable>

    </div>
  );
};

export default Home;
