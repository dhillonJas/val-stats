import Button from 'react-bootstrap/Button'
import player_data from '../data/tables/player_table.json'
import React, { useState , useEffect} from 'react';
import './css/toggle_button.css'
import { BASIC, ADVANCED, events_columns } from '../data/columns_names';
import './css/filters.css'
import Player from './Player';
import { Maps, Events, Teams, Regions, Agents, Players } from '../data/dropdownoptions';
import DropdownComp from './Dropdown';


// getting all head to heads for ONE player
// the data should be already filtered for ONE player
function get_data(data){
  const filtered_data = data.filter(player => player.player_name === 't3xture')
  const opponents = {}
  filtered_data.forEach(player => {
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
        }
        else
        {
          opponents[name] = {
            'name':name,
            'kills':0,
            'deaths':0,
            'diff':0
          }
        }
      }
    }

  });
  console.log(opponents)
  return opponents
}   


function HeadToHead({ onFilter, onViewModeChange}) {

  const ALL = 'ALL'
  const [player, setPlayer] = useState('TenZ')
  const [event, setEvent] = useState(ALL)
  const [mapName, setMapName] = useState(ALL)
  const [opponent, setOpponent] = useState(ALL)
  const [region, setRegion] = useState(ALL)
  const [playerAgent, setPlayerAgent] = useState(ALL)
  const [opponentAgent, setOpponentAgent] = useState(ALL)
  const [dataToShow, setDataToShow] = useState(get_data(player_data))

  
  useEffect(() => {
    
  }, []);


  return (
    <div>
      <div className='filter-container'>
        <span className="filter-label">Player</span>
          <DropdownComp   selectedValue={Player}
                          setSelectedValue={setPlayer}
                          options={Players}> 
          </DropdownComp>
        </div>
    </div>

  );
}

export default HeadToHead;