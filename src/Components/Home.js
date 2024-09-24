import React, { useState } from 'react';
import './Home.css'; 
import TeamDropdown from './TeamDropdowns';
import Event from './Event';
import DataTable from './DataTable';
import event_data from '../data/output/event_data.json'
import player_data from '../data/output/player_data.json'
const Home = () => {

  const playerColumns = ['player_name', 'player_team', 'player_agent', 'player_both_kills', 'player_both_deaths']
  const eventColumns = ['event_id', 'event_title', 'event_prize_pool', 'event_year']

  const [eventData, setEventData] = useState(event_data);
  const [playerData, setPlayerData] = useState(player_data);

  const [selectedButton, setSelectedButton] = useState('Event');
  const [filteredData, setFilteredData] = useState(eventData); // Filtered dataset (passed to DataTable)


  //const [currentPage, setCurrentPage] = useState(1);
  // const [dataPerPage] = useState(10); // Items per page

  const handleFilter = (filtered) => {
    setFilteredData(filtered);
  };


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
          <TeamDropdown data={playerData} onFilter={handleFilter}></TeamDropdown>
                  </div>
      )}
      {
        selectedButton === 'Event' && (
          <div>
            <Event data={eventData} onFilter={handleFilter}> </Event>
            </div>
        
      )}
      <DataTable data={filteredData}
      columnNames={selectedButton === 'Team' ? playerColumns : eventColumns}></DataTable>

    </div>
  );
};

export default Home;
