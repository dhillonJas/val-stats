import React, { useState , useEffect, useCallback} from 'react';
import DropdownComp from './Dropdown';
import player_data from '../data/tables/player_table.json'
import { BASIC, ADVANCED, player_columns } from '../data/columns_names';
import { Maps, Events, Teams, Regions, Agents } from '../data/dropdownoptions';
import Button from 'react-bootstrap/Button'
import './css/filters.css'
import './css/toggle_button.css'

function get_data(data){
  const players = data.reduce((acc, curr) => {
    if (!acc[curr['player_name']]) {
        acc[curr['player_name']] = { 
            player_name: curr['player_name'],
            player_team: curr['player_team'],
            prev_teams: [],
            maps_won: 0,
            maps_lost: 0,
            maps_played: 0,
            kills: {all: 0, attack:  0, defense: 0},
            deaths: {all: 0, attack:  0, defense: 0},
            assists: {all: 0, attack:  0, defense: 0},
            diffs: {all: 0, attack:  0, defense: 0},
            rating: {all: 0, attack:  0, defense: 0},
            adr: {all: 0, attack:  0, defense: 0},
            acs: {all: 0, attack:  0, defense: 0},
            kast: {all: 0, attack:  0, defense: 0},
            hsp: {all: 0, attack:  0, defense: 0},           
            first_kills: {all: 0, attack:  0, defense: 0},
            first_deaths: {all: 0, attack:  0, defense: 0},
            rounds_played: {attack:0, defense:0},
            Aces: 0,
            '2k': 0,
            '3k': 0,
            '4k': 0,
  
            '1v1': 0,
            '1v2': 0,
            '1v3': 0,
            '1v4': 0,
            '1v5': 0,
         };
    }

    
    let name_key = curr['player_name']

    if (!acc[name_key].prev_teams.includes(curr.player_team))
      acc[name_key].prev_teams.push(curr.player_team)

    acc[name_key].kills.attack += curr.kills.attack
    acc[name_key].kills.defense += curr.kills.defense
    acc[name_key].kills.all += curr.kills.all

    acc[name_key].deaths.attack += curr.deaths.attack
    acc[name_key].deaths.defense += curr.deaths.defense
    acc[name_key].deaths.all += curr.deaths.all
        
    acc[name_key].assists.attack += curr.assists.attack
    acc[name_key].assists.defense += curr.assists.defense
    acc[name_key].assists.all += curr.assists.all

    acc[name_key].diffs.attack += curr.diffs.attack
    acc[name_key].diffs.defense += curr.diffs.defense
    acc[name_key].diffs.all += curr.diffs.all
    
    acc[name_key].first_kills.attack += curr.first_kills.attack
    acc[name_key].first_kills.defense += curr.first_kills.defense
    acc[name_key].first_kills.all += curr.first_kills.all
    
    acc[name_key].first_deaths.attack += curr.first_deaths.attack
    acc[name_key].first_deaths.defense += curr.first_deaths.defense
    acc[name_key].first_deaths.all += curr.first_deaths.all

    acc[name_key].rating.attack += curr.rating.attack * curr.rounds_played.attack
    acc[name_key].rating.defense += curr.rating.defense * curr.rounds_played.defense
    acc[name_key].rating.all += curr.rating.all * (curr.rounds_played.attack + curr.rounds_played.defense)

    acc[name_key].acs.attack += curr.acs.attack * curr.rounds_played.attack
    acc[name_key].acs.defense += curr.acs.defense * curr.rounds_played.defense
    acc[name_key].acs.all += curr.acs.all * (curr.rounds_played.attack + curr.rounds_played.defense)

    acc[name_key].kast.attack += curr.kast.attack * curr.rounds_played.attack
    acc[name_key].kast.defense += curr.kast.defense * curr.rounds_played.defense
    acc[name_key].kast.all += curr.kast.all * (curr.rounds_played.attack + curr.rounds_played.defense)

    acc[name_key].adr.attack += curr.adr.attack * curr.rounds_played.attack
    acc[name_key].adr.defense += curr.adr.defense * curr.rounds_played.defense
    acc[name_key].adr.all += curr.adr.all * (curr.rounds_played.attack + curr.rounds_played.defense)

    acc[name_key].hsp.attack += curr.hsp.attack * curr.rounds_played.attack
    acc[name_key].hsp.defense += curr.hsp.defense * curr.rounds_played.defense
    acc[name_key].hsp.all += curr.hsp.all * (curr.rounds_played.attack + curr.rounds_played.defense)

    acc[name_key].rounds_played.attack += curr.rounds_played.attack
    acc[name_key].rounds_played.defense += curr.rounds_played.defense

    acc[name_key].maps_won += curr.map_won ? 1 : 0
    acc[name_key].maps_lost += curr.map_won ? 0 : 1
    acc[name_key].maps_played += 1 

    if ('Aces' in curr)
    {
        acc[name_key].Aces += curr.Aces;
        acc[name_key]['2k'] += curr['2k'];
        acc[name_key]['3k'] += curr['3k'];
        acc[name_key]['4k'] += curr['4k'];
    
        acc[name_key]['1v1'] += curr['1v1'];
        acc[name_key]['1v2'] += curr['1v2'];
        acc[name_key]['1v3'] += curr['1v3'];
        acc[name_key]['1v4'] += curr['1v4'];
        acc[name_key]['1v5'] += curr['1v5'];
    }
    
    return acc;
}, {});

  const weightAverageCols = ['acs', 'adr', 'hsp', 'rating', 'kast']
  const decimalPlaces = 2
  Object.values(players).forEach((player) => {
    weightAverageCols.forEach((column) => {
      player[column].attack = (player[column].attack / player['rounds_played'].attack).toFixed(decimalPlaces)
      player[column].defense = (player[column].defense / player['rounds_played'].defense).toFixed(decimalPlaces)
      player[column].all = (player[column].all / (player['rounds_played'].attack + player['rounds_played'].defense)).toFixed(decimalPlaces)
    })

    player['killsperround'] = {
      'attack' : (player.kills.attack / player.rounds_played.attack).toFixed(decimalPlaces),
      'defense' : (player.kills.defense / player.rounds_played.defense).toFixed(decimalPlaces),
      'all' : (player.kills.all / (player.rounds_played.attack + player.rounds_played.defense)).toFixed(decimalPlaces)
    }

    player['deathsperround'] = {
      'attack' : (player.deaths.attack / player.rounds_played.attack).toFixed(decimalPlaces),
      'defense' : (player.deaths.defense / player.rounds_played.defense).toFixed(decimalPlaces),
      'all' : (player.deaths.all / (player.rounds_played.attack + player.rounds_played.defense)).toFixed(decimalPlaces)
    }
    
    player['assistsperround'] = {
      'attack' : (player.assists.attack / player.rounds_played.attack).toFixed(decimalPlaces),
      'defense' : (player.assists.defense / player.rounds_played.defense).toFixed(decimalPlaces),
      'all' : (player.assists.all / (player.rounds_played.attack + player.rounds_played.defense)).toFixed(decimalPlaces)
    }
  })
  return Object.values(players)
}


function Player({ onFilter , onViewModeChange }) {

  const ALL = 'All'
  const [isAdvanced, setIsAdvanced] = useState(false)
  const [event, setEvent] = useState(ALL)
  const [mapName, setMapName] = useState(ALL)
  const [opponent, setOpponent] = useState(ALL)
  const [region, setRegion] = useState(ALL)
  const [agent, setAgent] = useState(ALL)
  const [bestOf, setbestOf] = useState(ALL)
  const [minMaps, setMinMaps] = useState('')
  const [minRounds, setMinRounds] = useState('')
  const [dataToShow, setDataToShow] = useState(get_data(player_data))

  // console.log(get_data(player_data))
  const handleFilter = useCallback(() => {
    let filtered_data = player_data

    if (event !== ALL)
      filtered_data = filtered_data.filter(player => player.event_name === event)

    if (mapName !== ALL)
      filtered_data = filtered_data.filter(player => player.map_name === mapName)

    if (opponent !== ALL)
      filtered_data = filtered_data.filter(player => player.opponent_name === opponent)

    if (region !== ALL)
      filtered_data = filtered_data.filter(player => player.opponent_region === region)

    if (agent !== ALL)
      filtered_data = filtered_data.filter(player => player.player_agent === agent)

    if (bestOf !== ALL)
      filtered_data = filtered_data.filter(player => player.match_length === bestOf)

    filtered_data = get_data(filtered_data)

    if (minMaps !== '')
      filtered_data = filtered_data.filter(player => player.maps_played >= minMaps)

    if (minRounds !== '')
      filtered_data = filtered_data.filter(player => player.rounds_played.attack + player.rounds_played.defense >= minRounds)

    setDataToShow(filtered_data)
    },[event, mapName, opponent, region, agent, bestOf, minMaps, minRounds])


    useEffect(() => {
      handleFilter()
    }, [handleFilter, event, mapName, opponent, region, agent, bestOf, minMaps, minRounds]);

    useEffect(() => {
      let viewMode = isAdvanced  ?  ADVANCED: BASIC
      onViewModeChange(player_columns[viewMode]); // Pass columns to Home.js
      onFilter(dataToShow)

    }, [onViewModeChange, isAdvanced, onFilter, dataToShow]);
  
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
          
          <span className="filter-label">Opponent Region</span>
          <DropdownComp   selectedValue={region}
                          setSelectedValue={setRegion}
                          options={Regions}> 
          </DropdownComp>

          <span className="filter-label">Best Of</span>
          <DropdownComp   selectedValue={bestOf}
                          setSelectedValue={setbestOf}
                          options={['All','Bo3', 'Bo5']}> 
          </DropdownComp>

          <span className="filter-label">Agent</span>
          <DropdownComp   selectedValue={agent}
                          setSelectedValue={setAgent}
                          options={Agents}> 
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
               style={{ width: '150px', whiteSpace: 'nowrap', textAlign: 'center' }}  >
        {isAdvanced ? ADVANCED : BASIC}
       </Button>
    </div>

  );
}




export default Player;