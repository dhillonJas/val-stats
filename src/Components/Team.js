import React, { useState , useEffect, useCallback} from 'react';
import DropdownComp from './Dropdown';
import team_data from '../data/tables/team_table.json'
import { Maps, Events, Teams, Regions } from '../data/dropdownoptions';
import Button from 'react-bootstrap/Button'
import { BASIC, ADVANCED, teams_columns } from '../data/columns_names';
import './css/toggle_button.css'
import './css/filters.css'

function get_data(data) {
  return data.reduce((acc, curr) => {

    const event_stats = curr['event_stats']

    const total_stats = event_stats.reduce((innerAcc, innerCurr) => {
        innerAcc.maps_won += innerCurr.maps_won
        innerAcc.maps_lost += innerCurr.maps_lost
        innerAcc.map_picks_won += innerCurr.map_picks_won
        innerAcc.map_picks_lost += innerCurr.map_picks_lost

        innerAcc.rounds_won.attack += innerCurr.rounds_won.attack
        innerAcc.rounds_won.defense += innerCurr.rounds_won.defense
        innerAcc.rounds_won.overtime += innerCurr.rounds_won.overtime
        innerAcc.rounds_won.all += innerCurr.rounds_won.all

        innerAcc.rounds_lost.attack += innerCurr.rounds_lost.attack
        innerAcc.rounds_lost.defense += innerCurr.rounds_lost.defense
        innerAcc.rounds_lost.overtime += innerCurr.rounds_lost.overtime
        innerAcc.rounds_lost.all += innerCurr.rounds_lost.all
        
        innerAcc.kills.attack += innerCurr.kills.attack;
        innerAcc.kills.defense += innerCurr.kills.defense;
        innerAcc.kills.all += innerCurr.kills.all;

        innerAcc.deaths.attack += innerCurr.deaths.attack;
        innerAcc.deaths.defense += innerCurr.deaths.defense;
        innerAcc.deaths.all += innerCurr.deaths.all;
        
        innerAcc.assists.attack += innerCurr.assists.attack;
        innerAcc.assists.defense += innerCurr.assists.defense;
        innerAcc.assists.all += innerCurr.assists.all;
        
        innerAcc.diffs.attack += innerCurr.diffs.attack;
        innerAcc.diffs.defense += innerCurr.diffs.defense;
        innerAcc.diffs.all += innerCurr.diffs.all;
        
        innerAcc.first_kills.attack += innerCurr.first_kills.attack;
        innerAcc.first_kills.defense += innerCurr.first_kills.defense;
        innerAcc.first_kills.all += innerCurr.first_kills.all;

        innerAcc.first_deaths.attack += innerCurr.first_deaths.attack;
        innerAcc.first_deaths.defense += innerCurr.first_deaths.defense;
        innerAcc.first_deaths.all += innerCurr.first_deaths.all;

        innerAcc.Aces += innerCurr.Aces;
        innerAcc['2k'] += innerCurr['2k'];
        innerAcc['3k'] += innerCurr['3k'];
        innerAcc['4k'] += innerCurr['4k'];

        innerAcc['1v1'] += innerCurr['1v1'];
        innerAcc['1v2'] += innerCurr['1v2'];
        innerAcc['1v3'] += innerCurr['1v3'];
        innerAcc['1v4'] += innerCurr['1v4'];
        innerAcc['1v5'] += innerCurr['1v5'];

        return innerAcc
    },{
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

    const stats = total_stats
    const decimalPlaces = 2
    acc.push({           
        id:curr['id'],
        name:curr['name'],
        region:curr['region'],
        events_attended:curr['events_attended'],
        events_won:curr['events_won'],
        events_best_placements:curr['events_best_placements'],
        killsperround: {
          'attack': (stats.kills.attack / (stats.rounds_won.attack + stats.rounds_lost.attack)).toFixed(decimalPlaces),
          'defense': (stats.kills.defense / (stats.rounds_won.defense + stats.rounds_lost.defense)).toFixed(decimalPlaces),
          'all': (stats.kills.all / (stats.rounds_won.all + stats.rounds_lost.all)).toFixed(decimalPlaces)
        },
        deathsperround: {
          'attack': (stats.deaths.attack / (stats.rounds_won.attack + stats.rounds_lost.attack)).toFixed(decimalPlaces),
          'defense': (stats.deaths.defense / (stats.rounds_won.defense + stats.rounds_lost.defense)).toFixed(decimalPlaces),
          'all': (stats.deaths.all / (stats.rounds_won.all + stats.rounds_lost.all)).toFixed(decimalPlaces)
        },
        assistsperround: {
          'attack': (stats.assists.attack / (stats.rounds_won.attack + stats.rounds_lost.attack)).toFixed(decimalPlaces),
          'defense': (stats.assists.defense / (stats.rounds_won.defense + stats.rounds_lost.defense)).toFixed(decimalPlaces),
          'all': (stats.assists.all / (stats.rounds_won.all + stats.rounds_lost.all)).toFixed(decimalPlaces)
        },
        ...total_stats,}
      )
    return acc
  }, []);
}

function Team({ onFilter, onViewModeChange}) {

  const ALL = 'All'
  const [isAdvanced, setIsAdvanced] = useState(false)
  const [event, setEvent] = useState(ALL)
  const [mapName, setMapName] = useState(ALL)
  const [opponent, setOpponent] = useState(ALL)
  const [region, setRegion] = useState(ALL)
  const [dataToShow, setDataToShow] = useState(get_data(team_data))
  const [minMaps, setMinMaps] = useState('')
  const [minRounds, setMinRounds] = useState('')
  
  const handleFilter = useCallback(() => {
    let filtered_data = team_data

    if (event !== ALL)
      filtered_data = filtered_data.map(item => ({
        ...item,
        event_stats: item.event_stats.filter(event_obj => event_obj.event_name === event)
    }))

    if (mapName !== ALL)
      filtered_data = filtered_data.map(item => ({
        ...item,
        event_stats: item.event_stats.filter(event_obj => event_obj.map_name === mapName)
    }))


    if (opponent !== ALL)
      filtered_data = filtered_data.map(item => ({
        ...item,
        event_stats: item.event_stats.filter(event_obj => event_obj.name === opponent)
    }))

    if (region !== ALL)
      filtered_data = filtered_data.map(item => ({
        ...item,
        event_stats: item.event_stats.filter(event_obj => event_obj.region === region)
    }))

    filtered_data = filtered_data.filter(item => item.event_stats.length > 0)
    filtered_data = get_data(filtered_data)

    if (minMaps !== '')
      filtered_data = filtered_data.filter(team => team.maps_won + team.maps_lost >= minMaps)

    if (minRounds !== '')
      filtered_data = filtered_data.filter(team => team.rounds_won.all + team.rounds_lost.all >= minRounds)

    setDataToShow(filtered_data)
  
  }, [event, mapName, opponent, region, minMaps, minRounds])

useEffect(() => {
  handleFilter()
}, [handleFilter, event, mapName, opponent, region, minMaps, minRounds]);


  useEffect(() => {
    let viewMode = isAdvanced  ?  ADVANCED: BASIC
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

  const onMinMapChange = (e) => { setMinMaps(e.target.value) }
  const onMinRoundChange = (e) => { setMinRounds(e.target.value) }

  return (
    <div>
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

          <span className="filter-label">Minimum Maps</span>
          <input className='filter-input'
                 type="number" 
                 value={minMaps}
                 onChange={onMinMapChange} />

          <span className="filter-label">Minimum Rounds</span>
          <input className='filter-input'
                 type="number" 
                 value={minRounds}
                 onChange={onMinRoundChange} />
      </div>
      <Button className={`toggle-button ${isAdvanced ? 'advanced' : ''}`}
               variant="dark"  
               onClick={handleClick}
               style={{ width: '150px', whiteSpace: 'nowrap', textAlign: 'center' }}>
        {isAdvanced ? ADVANCED : BASIC}
       </Button>
    </div>

  );
}

export default Team;