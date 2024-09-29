import React, { useState , useEffect, useCallback} from 'react';
import DropdownComp from './Dropdown';
import player_data from '../data/player_data.json'

function Player({ onFilter }) {

  // const [eventName, setEventName] = useState('Any');
  const [playerName, setPlayerName] = useState('Any');

  const handleFilter = useCallback(() => {
    if (playerName === 'Any')
        onFilter(player_data)
    else{
      const filtered = player_data.filter(obj => obj.player_name === playerName);
      onFilter(filtered)
      }
    }, [onFilter, playerName])
  
  // const eventNames = event_data.map(event => event.event_name);
  // const options = ['Any', ... eventNames]

  const options = ['Any', 'TenZ', 'zekken', 'Boaster', 'Derke', 'C0M', 's0m']

  useEffect(() => {
    handleFilter(playerName);
  }, [playerName, handleFilter]);

  return (
    <div>
        <DropdownComp   selectedValue={playerName}
                        setSelectedValue={setPlayerName} 
                        options={options}> 
        </DropdownComp>
    </div>

  );
}




export default Player;