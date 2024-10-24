import head_to_head_data from '../data/tables/head_to_head_table.json'
import React, { useState , useEffect, useCallback} from 'react';
import DropdownComp from './Dropdown';
import { player_head_to_head } from '../data/columns_names';
import { ALL, Maps, Agents } from '../data/dropdownoptions';
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


function HeadToHead({ onFilter, columns, EventNames,  PlayerNames}) {

  const [player, setPlayer] = useState('TenZ')
  const [event, setEvent] = useState(ALL)
  const [mapName, setMapName] = useState(ALL)
  const [playerAgent, setPlayerAgent] = useState(ALL)
  const [opponentAgent, setOpponentAgent] = useState(ALL) 
  const [minMaps, setMinMaps] = useState('')
  const [dataToShow, setDataToShow] = useState(get_data(head_to_head_data.filter(player_obj => player_obj.player_name.toLowerCase() === player.toLowerCase())))
  
  const handleFilter = useCallback(() => {
    let filtered_data = head_to_head_data.filter(player_obj => player_obj.player_name.toLowerCase() === player.toLowerCase())
    
    if (event !== ALL)
      filtered_data = filtered_data.filter(player_obj => player_obj.event_name === event)
    
    if (mapName !== ALL)
      filtered_data = filtered_data.filter(player => player.map_name === mapName)

    if (playerAgent !== ALL)
      filtered_data = filtered_data.filter(player => player.player_agent === playerAgent)

    filtered_data = get_data(filtered_data)

    if (minMaps !== '')
      filtered_data = filtered_data.filter(player => player.maps_played >= minMaps)

    setDataToShow(filtered_data)
  }, [player, event, mapName, playerAgent, minMaps])

  useEffect(() => {
    handleFilter()
  }, [handleFilter, event, mapName, playerAgent, minMaps]);


  useEffect(() => {
    columns(player_head_to_head)
    onFilter(dataToShow)
  }, [dataToShow, onFilter, columns]);

  const onMinMapChange = (e) => { setMinMaps(e.target.value) }

  return (
    <div>
      <div className='filter-container'>

        <div className='filter'>
          <span className="filter-label">Player</span>
          <DropdownComp   selectedValue={player}
                          setSelectedValue={setPlayer}
                          options={PlayerNames}> 
          </DropdownComp>
        </div>

        <div className='filter'>
          <span className="filter-label">Player Agent</span>
          <DropdownComp   selectedValue={playerAgent}
                          setSelectedValue={setPlayerAgent}
                          options={[ALL, ...Object.keys(Agents)]}> 
          </DropdownComp>
        </div>

        <div className='filter'>
          <span className="filter-label">Opponent Agent</span>
          <DropdownComp   selectedValue={opponentAgent}
                          setSelectedValue={setOpponentAgent}
                          options={[ALL, ...Object.keys(Agents)]}> 
          </DropdownComp>
        </div>

        <div className='filter'>
          <span className="filter-label">Event</span>
          <DropdownComp   selectedValue={event}
                          setSelectedValue={setEvent}
                          options={EventNames}> 
          </DropdownComp>
        </div>

        <div className='filter'>
          <span className="filter-label">Map</span>
          <DropdownComp   selectedValue={mapName}
                          setSelectedValue={setMapName}
                          options={Maps}> 
          </DropdownComp>
        </div>

        <div className='filter'> 
            <span className="filter-label">Minimum Maps</span>
            <input className='filter-input'
                  type="number" 
                  value={minMaps}
                  onChange={onMinMapChange} />
          </div>

        </div>
    </div>

  );
}

export default HeadToHead;