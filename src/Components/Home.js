import React, { useState, useCallback, useMemo } from 'react';
import './css/tab.css'
import './css/Home.css'; 
import Team from './Team';
import Event from './Event';
import Player from './Player';
import DataTable from './DataTable';
import HeadToHead from './HeadToHead';
import team_data from '../data/tables/team_table.json'
import player_data from '../data/tables/player_table.json'
import event_data from '../data/tables/event_table.json'
import { ALL } from '../data/dropdownoptions';


const Home = () => {

  const [selectedButton, setSelectedButton] = useState('Event');
  const [filteredData, setFilteredData] = useState([]); // Filtered dataset (passed to DataTable)
  const [columnsToShow, setColumnsToShow] = useState([]);

  const all_players = useMemo(() => {
    const players = [...new Set(player_data.map(item => item.player_name))];
    return players.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  }, []);

  const all_teams = useMemo(() => {
    const teams = [...new Set(team_data.map(item => item.name))];
    return [ALL, ...teams.sort()];
  }, []);

  const all_events = useMemo(() => {
    const events = [...new Set(event_data.map(item => item.event_name))];
    const sorted =  events.sort((a, b) => {
      
      const yearA = parseInt(a.slice(-4), 10);
      const yearB = parseInt(b.slice(-4), 10);
      return yearB - yearA; 
    })
    return [ALL, ...sorted]
  }, []);

  const handleFilter = useCallback((filteredData) => {
    setFilteredData(filteredData);
  }, []);

  const handleColumnChange = useCallback((columns) => {
    setColumnsToShow(columns);
  }, []);
  
  const handleTypeChange = (columns, column) => {
    let cols = columns
    let temp_type = cols[column].type
    cols[column].type = cols[column].collapsedType
    cols[column].collapsedType = temp_type
    setColumnsToShow(cols)
  };

  return (
    <div style={{padding:10}}>      
      <div className="tabs-container">
        <button className={`tab ${selectedButton === 'Team' ? 'active' : ''}`} onClick={() => setSelectedButton('Team')}>Team</button>
        <button className={`tab ${selectedButton === 'Event' ? 'active' : ''}`} onClick={() => setSelectedButton('Event')}>Event</button>
        <button className={`tab ${selectedButton === 'Player' ? 'active' : ''}`} onClick={() => setSelectedButton('Player')}>Player</button>
        <button className={`tab ${selectedButton === 'HeadToHead' ? 'active' : ''}`} onClick={() => setSelectedButton('HeadToHead')}>Head To Head</button>
      </div>

      {selectedButton === 'Team' && (
        <div>
          <Team onFilter={handleFilter}  
                onViewModeChange={handleColumnChange}
                EventNames={all_events}
                TeamNames={all_teams}  
          ></Team>
        </div>
      )}
      {
        selectedButton === 'Event' && (
          <div>
            <Event onFilter={handleFilter} 
                   onViewModeChange={handleColumnChange}> </Event>
          </div>
        
      )}
      {
        selectedButton === 'Player' && (
          <div>
            <Player onFilter={handleFilter} 
                    onViewModeChange={handleColumnChange}
                    EventNames={all_events}
                    TeamNames={all_teams}  
            > </Player>
          </div>
        
      )}  
      {
        selectedButton === 'HeadToHead' && (
          <div>
            <HeadToHead onFilter={handleFilter} 
                        columns={handleColumnChange}
                        EventNames={all_events}
                        PlayerNames={all_players}  
                        > </HeadToHead>
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
