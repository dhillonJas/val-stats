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

  const handleFilter = useCallback(() => {
    if (event === 'All')
        onFilter(team_data)
    else{
        const teamTotals = {};

        team_data.forEach(item => {
          if (!teamTotals[item.id]) {
            teamTotals[item.id] = { 
                                      name: item.name,
                                      region: item.region,
                                      events_attended: item.events_attended,
                                      events_won: item.events_won,
                                      events_best_placements: item.events_best_placements,
                                      maps_won: 0,
                                      maps_lost: 0,
                                      map_picks_won: 0,
                                      map_picks_lost: 0,
                                      rounds_won: 0,
                                      rounds_lost: 0,
                                      maps:[]
                                    };
          }
        }

      

        )
    }
    }, [onFilter])

useEffect(() => {
  handleFilter()
}, [event]);


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