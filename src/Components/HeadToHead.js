import player_data from '../data/tables/player_table.json'
import React, { useState , useEffect, useCallback, useMemo} from 'react';
import DropdownComp from './Dropdown';
import { player_head_to_head } from '../data/columns_names';
import { ALL, Maps, Events, Agents } from '../data/dropdownoptions';
import './css/toggle_button.css'
import './css/filters.css'


// getting all head to heads for ONE player
// the data should be already filtered for ONE player
function get_data(data){
  const opponents = {}
  data.forEach(player => {
    if (Object.keys(player['player_head_to_head'] !== 0))
    {
      const stats_obj = player['player_head_to_head']
      for (const name in stats_obj)
      {
        if (name in opponents)
        {
          opponents[name].kills += stats_obj[name][0]
          opponents[name].deaths += stats_obj[name][1]
          opponents[name].diff += stats_obj[name][2]
          opponents[name].maps_played += 1
        }
        else
        {
          opponents[name] = {
            'name':name,
            'kills':stats_obj[name][0],
            'deaths': stats_obj[name][1],
            'diff':stats_obj[name][2],
            'maps_played':1
          }
        }
      }
    }

  });
  return Object.values(opponents)
}   


function HeadToHead({ onFilter, columns}) {

  // const players = Object.keys(player_data) // should use this for dropdown options
  const [player, setPlayer] = useState('TenZ')
  const [event, setEvent] = useState(ALL)
  const [mapName, setMapName] = useState(ALL)
  const [playerAgent, setPlayerAgent] = useState(ALL)
  // const [opponentAgent, setOpponentAgent] = useState(ALL) // update data to allow this
  // const [opponentTeam, setOpponentTeam] = useState(ALL) // update data to allow this
  const [dataToShow, setDataToShow] = useState(get_data(player_data.filter(player_obj => player_obj.player_name.toLowerCase() === player.toLowerCase())))

  const PlayerNames = useMemo(() => {
    const names = player_data.map(item => item.player_name);
    const uniqueNames = [...new Set(names)]; 
    return uniqueNames.sort();
  }, []);

  
  const handleFilter = useCallback(() => {
    let filtered_data = player_data.filter(player_obj => player_obj.player_name.toLowerCase() === player.toLowerCase())
    
    if (event !== ALL)
      filtered_data = filtered_data.filter(player_obj => player_obj.event_name === event)
    
    if (mapName !== ALL)
      filtered_data = filtered_data.filter(player => player.map_name === mapName)

    if (playerAgent !== ALL)
      filtered_data = filtered_data.filter(player => player.player_agent === playerAgent)

    setDataToShow(get_data(filtered_data))
  }, [player, event, mapName, playerAgent])

  useEffect(() => {
    handleFilter()
  }, [handleFilter, event, mapName, playerAgent]);


  useEffect(() => {
    columns(player_head_to_head)
    onFilter(dataToShow)
  }, [dataToShow, onFilter, columns]);


  return (
    <div>
      <div className='filter-container'>
        <span className="filter-label">Player</span>
        <DropdownComp   selectedValue={player}
                        setSelectedValue={setPlayer}
                        options={PlayerNames}> 
        </DropdownComp>

        <span className="filter-label">Player Agent</span>
        <DropdownComp   selectedValue={playerAgent}
                        setSelectedValue={setPlayerAgent}
                        options={[ALL, ...Object.keys(Agents)]}> 
        </DropdownComp>

        <span className="filter-label">Event</span>
        <DropdownComp   selectedValue={event}
                        setSelectedValue={setEvent}
                        options={Events}> 
        </DropdownComp>

        <span className="filter-label">Map</span>
        <DropdownComp   selectedValue={mapName}
                        setSelectedValue={setMapName}
                        options={Maps}> 
        </DropdownComp>

        </div>
    </div>

  );
}

export default HeadToHead;