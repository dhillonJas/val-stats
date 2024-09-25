import React, { useState, useMemo, useCallback } from 'react';
import './Home.css'; 
import TeamDropdown from './TeamDropdowns';
import Event from './Event';
import DataTable from './DataTable';
import player_data from '../data/player_data.json'
const Home = () => {

  const playerColumns = ['player_name', 'player_team', 'player_agent', 'player_both_kills', 'player_both_deaths']
  const eventColumns = ['event_id', 'event_title', 'event_prize_pool', 'event_year']

  const [playerData, setPlayerData] = useState(player_data);

  const memoizedPlayerData = useMemo(() => playerData, [playerData]);

  const [selectedButton, setSelectedButton] = useState('Team');
  const [filteredData, setFilteredData] = useState(playerData); // Filtered dataset (passed to DataTable)


  //const [currentPage, setCurrentPage] = useState(1);
  // const [dataPerPage] = useState(10); // Items per page

  const handleFilter = useCallback((filteredData) => {
    setFilteredData(filteredData);
  }, []);


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
          <TeamDropdown data={memoizedPlayerData} onFilter={handleFilter}></TeamDropdown>
                  </div>
      )}
      {
        selectedButton === 'Event' && (
          <div>
            <Event onFilter={handleFilter}> </Event>
            </div>
        
      )}
      <DataTable data={filteredData}
      columnNames={selectedButton === 'Team' ? playerColumns : eventColumns}></DataTable>

    </div>
  );
};

export default Home;
