import React, { useState , useEffect, useCallback} from 'react';
import DropdownComp from './Dropdown';
import team_data from '../data/tables/team_table.json'
import { Maps, Events } from '../data/dropdownoptions';
import Button from 'react-bootstrap/Button'
import { INFORMATION, ADVANCED, teams_columns } from '../data/columns_names';

function Team({ onFilter, onViewModeChange}) {

  const ALL = 'All'
  const [isAdvanced, setIsAdvanced] = useState(false)
  const [event, setEvent] = useState(ALL)
  const [mapName, setMapName] = useState(ALL)
  const [opponent] = useState(ALL)
  const [dataToShow, setDataToShow] = useState(team_data)

  
  // function getData() {
    
  //   return [{"Name" : "Sentinels"}]
  // }


  const handleFilter = useCallback(() => {
    if (event === ALL && mapName === ALL && opponent === ALL)
        onFilter(team_data)
    else{
        const filtered_teams_data = {};
        let dataToSum = []
        team_data.forEach(item => {
        //   if (!filtered_teams_data[item.id]) {
        //     filtered_teams_data[item.id] = { 
        //                               name: item.name,
        //                               region: item.region,
        //                               events_attended: item.events_attended,
        //                               events_won: item.events_won,
        //                               events_best_placements: item.events_best_placements,
        //                               maps_won: 0,
        //                               maps_lost: 0,
        //                               map_picks_won: 0,
        //                               map_picks_lost: 0,
        //                               rounds_won: 0,
        //                               rounds_lost: 0,
        //                               maps:[]
        //                             };
        //   }
          let event_obj = Object.values(item['event_stats'])
          if (event !== ALL)
          {
            if (item['event_stats'][Events[event]])
              event_obj = item['event_stats'][Events[event]]
          }
          
          let map_obj = []
          let map_data = []
          if (mapName === ALL)
            {
              for (let key in event_obj['event_maps']){
                map_obj.push(event_obj['event_maps'][key])
              }
            }
          else if (mapName !== ALL){
            if (event_obj['event_maps'][mapName])
              map_obj = event_obj['event_maps'][mapName]
          }

          if (map_obj)
            dataToSum.push(map_obj)
          
        },
        console.log(dataToSum)
        
      )
    }
    }, [onFilter, event, mapName, opponent])

useEffect(() => {
  handleFilter()
}, [handleFilter, event, mapName, opponent]);


  useEffect(() => {
    let viewMode = isAdvanced  ?  ADVANCED: INFORMATION
    onViewModeChange(teams_columns[viewMode]); // Pass columns to Home.js
    onFilter(dataToShow)
  }, [onViewModeChange, isAdvanced, onFilter, dataToShow]);

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
                        options={Object.keys(Events)}> 
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