import React, { useState , useEffect, useCallback} from 'react';
import DropdownComp from './Dropdown';
import team_data from '../data/tables/team_table.json'
import { columns_information } from '../data/columns_names';
import { Maps, Events } from '../data/dropdownoptions';

function Team({ onFilter, onViewModeChange}) {

  const options = ['Information', 'Advanced']
  const [event, setEvent] = useState('Any')
  const [mapName, setMapName] = useState('Any')
  const [opponet, setOpponent] = useState('Any')

  
  const [viewMode, setViewMode] = useState('Information'); // Basic or Advanced mode
  
  // function getData() {
    
  //   return [{"Name" : "Sentinels"}]
  // }

//   const handleFilter = useCallback(() => {
//     if (event === 'Any')
//         onFilter(team_data)
//     }, [onFilter])

  useEffect(() => {
    onViewModeChange(columns_information['Team'][viewMode]); // Pass columns to Home.js
    onFilter(team_data)
  }, [viewMode, onViewModeChange]);


  return (
    <div>
        <DropdownComp   selectedValue={event}
                        setSelectedValue={setEvent}
                        options={Events}> 
        </DropdownComp>
        <DropdownComp   selectedValue={mapName}
                        setSelectedValue={setMapName}
                        options={Maps}> 
        </DropdownComp>

        {/* <input 
                type="text" 
                placeholder="Search..." 
                // value={searchQuery} 
                // onChange={handleInputChange} 
            /> */}
    </div>

  );
}

export default Team;