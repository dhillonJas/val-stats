import React, { useState , useEffect, useCallback} from 'react';
import DropdownComp from './Dropdown';
import team_data from '../data/tables/team_table.json'
import { Maps, Events, Teams, Regions } from '../data/dropdownoptions';
import Button from 'react-bootstrap/Button'
import { INFORMATION, ADVANCED, teams_columns } from '../data/columns_names';
import './css/toggle_button.css'
import './css/filters.css'

function Team({ onFilter, onViewModeChange}) {

  const ALL = 'All'
  const [isAdvanced, setIsAdvanced] = useState(false)
  const [event, setEvent] = useState(ALL)
  const [mapName, setMapName] = useState(ALL)
  const [opponent, setOpponent] = useState(ALL)
  const [region, setRegion] = useState(ALL)
  const [dataToShow, setDataToShow] = useState(team_data)

  
  function sumFilteredData(filteredData) {

    function sumOneTeamData(one_team_data){
        return one_team_data.slice(0, -1).reduce((acc, curr) => {
    
          acc.maps_won += curr.maps_won
          acc.maps_lost += curr.maps_lost
          acc.map_picks_won += curr.map_picks_won
          acc.map_picks_lost += curr.map_picks_lost

          acc.rounds_won.attack += curr.rounds_won.attack
          acc.rounds_won.defense += curr.rounds_won.defense
          acc.rounds_won.overtime += curr.rounds_won.overtime
          acc.rounds_won.all += curr.rounds_won.all

          acc.rounds_lost.attack += curr.rounds_lost.attack
          acc.rounds_lost.defense += curr.rounds_lost.defense
          acc.rounds_lost.overtime += curr.rounds_lost.overtime
          acc.rounds_lost.all += curr.rounds_lost.all
          
          acc.kills.attack += curr.kills.attack;
          acc.kills.defense += curr.kills.defense;
          acc.kills.all += curr.kills.all;

          acc.deaths.attack += curr.deaths.attack;
          acc.deaths.defense += curr.deaths.defense;
          acc.deaths.all += curr.deaths.all;
          
          acc.assists.attack += curr.assists.attack;
          acc.assists.defense += curr.assists.defense;
          acc.assists.all += curr.assists.all;
          
          acc.diffs.attack += curr.diffs.attack;
          acc.diffs.defense += curr.diffs.defense;
          acc.diffs.all += curr.diffs.all;
          
          acc.first_kills.attack += curr.first_kills.attack;
          acc.first_kills.defense += curr.first_kills.defense;
          acc.first_kills.all += curr.first_kills.all;

          acc.first_deaths.attack += curr.first_deaths.attack;
          acc.first_deaths.defense += curr.first_deaths.defense;
          acc.first_deaths.all += curr.first_deaths.all;

          acc.Aces += curr.Aces;
          acc['2k'] += curr['2k'];
          acc['3k'] += curr['3k'];
          acc['4k'] += curr['4k'];

          acc['1v1'] += curr['1v1'];
          acc['1v2'] += curr['1v2'];
          acc['1v3'] += curr['1v3'];
          acc['1v4'] += curr['1v4'];
          acc['1v5'] += curr['1v5'];


          return acc;
        }, { 
          maps_won: 0,
          maps_lost: 0,
          map_picks_won: 0,
          map_picks_lost: 0,
          rounds_won: {attack: 0, defense: 0, overtime: 0, all: 0},
          rounds_lost: {attack: 0, defense: 0, overtime: 0, all: 0}, 

          kills: { attack: 0, defense: 0, all: 0 }, 
          deaths: { attack: 0, defense: 0, all: 0 }, 
          assists: { attack: 0, defense: 0, all: 0 }, 
          diffs: { attack: 0, defense: 0, all: 0 }, 
          first_kills: { attack: 0, defense: 0, all: 0 }, 
          first_deaths: { attack: 0, defense: 0, all: 0 }, 

          Aces: 0,
          '2k': 0,
          '3k': 0,
          '4k': 0,

          '1v1': 0,
          '1v2': 0,
          '1v3': 0,
          '1v4': 0,
          '1v5': 0,

        });
  
    }
    
    let summedData = []
    filteredData.forEach(one_team_data => {
      const team_data_sum = sumOneTeamData(one_team_data)
      const team_info = one_team_data[one_team_data.length - 1]
      const merged_info = {...team_info, ...team_data_sum}
      summedData.push(merged_info)
    })

    return summedData
  }


  const handleFilter = useCallback(() => {
    if (event === ALL && mapName === ALL && opponent === ALL && region === ALL)
        setDataToShow(team_data)
    else
    {
        let dataToSum = []
        team_data.forEach(team => {          
          let stats_obj = {}
          if (event === ALL)
            stats_obj = team['event_stats']
          else
            stats_obj = team['event_stats'].filter(event_stats_obj => event_stats_obj.event_name === event)

          if (mapName !== ALL)
            stats_obj = stats_obj.filter(event_stats_obj => event_stats_obj.map_name === mapName)

          if (opponent !== ALL)
            stats_obj = stats_obj.filter(event_stats_obj => event_stats_obj.name === opponent)

          if (region !== ALL)
            stats_obj = stats_obj.filter(event_stats_obj => event_stats_obj.region === region)
         
          if (stats_obj.length > 0){
              const info_dict = {
                'id':team['id'],
                'name':team['name'],
                'region':team['region'],
                'events_attended':team['events_attended'],
                'events_won':team['events_won'],
                'events_best_placements':team['events_best_placements']

              }
              stats_obj.push(info_dict)
              dataToSum.push(stats_obj)     
            }           
          },
              
        )
        setDataToShow(sumFilteredData(dataToSum))
    }
    }, [event, mapName, opponent, region])

useEffect(() => {
  handleFilter()
}, [handleFilter, event, mapName, opponent, region]);


  useEffect(() => {
    let viewMode = isAdvanced  ?  ADVANCED: INFORMATION
    if (event === ALL && mapName === ALL && opponent === ALL && region === ALL)
      onViewModeChange(teams_columns[viewMode]); // Pass columns to Home.js
    else
    {
      const updatedColumns = Object.fromEntries(
        Object.entries(teams_columns[viewMode]).filter(([key]) => key !== 'Events Attended' && 
                                                                  key !== 'Events Won' && 
                                                                  key !== 'Best Placement')
      );

      onViewModeChange(updatedColumns); // Pass columns to Home.js
    }
    onFilter(dataToShow)
  }, [onViewModeChange, isAdvanced, onFilter, dataToShow, event, mapName, opponent, region]);

  const handleClick = () => {
    setIsAdvanced(!isAdvanced);
  };

  return (
    <div>
       <Button className={`toggle-button ${isAdvanced ? 'advanced' : ''}`}
               variant="dark"  
               onClick={handleClick}>
        {isAdvanced ? ADVANCED : INFORMATION}
       </Button>
       <div className='filter-container'>
        
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

          <span className="filter-label">Opponent</span>
          <DropdownComp   selectedValue={opponent}
                          setSelectedValue={setOpponent}
                          options={Teams}> 
          </DropdownComp>
          
          <span className="filter-label">Opponent region</span>
          <DropdownComp   selectedValue={region}
                          setSelectedValue={setRegion}
                          options={Regions}> 
          </DropdownComp>
      </div>
    </div>

  );
}

export default Team;