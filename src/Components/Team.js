import React, { useState , useEffect} from 'react';
import DropdownComp from './Dropdown';
import team_data from '../data/tables/team_table.json'
import { Maps, Events } from '../data/dropdownoptions';
import Button from 'react-bootstrap/Button'
import { INFORMATION, ADVANCED, teams_columns } from '../data/columns_names';

function Team({ onFilter, onViewModeChange}) {

  const [isAdvanced, setIsAdvanced] = useState(false)
  const [event, setEvent] = useState('Any')
  const [mapName, setMapName] = useState('Any')
  // const [opponet, setOpponent] = useState('Any')

  
  // function getData() {
    
  //   return [{"Name" : "Sentinels"}]
  // }

//   const handleFilter = useCallback(() => {
//     if (event === 'Any')
//         onFilter(team_data)
//     }, [onFilter])

  useEffect(() => {
    let viewMode = isAdvanced  ?  ADVANCED: INFORMATION
    onViewModeChange(teams_columns[viewMode]); // Pass columns to Home.js
    onFilter(team_data)
  }, [onViewModeChange, isAdvanced, onFilter]);

  const handleClick = () => {
    setIsAdvanced(!isAdvanced);
  };

  return (
    <div>
       <Button variant="dark"   onClick={handleClick}>
        {isAdvanced ? ADVANCED : INFORMATION}
       </Button>
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