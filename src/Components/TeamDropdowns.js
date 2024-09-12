import React, { useState , useEffect} from 'react';
import DropdownComp from './Dropdown';
import {Teams} from '../data/dropdownoptions'
import alasql from 'alasql';

function TeamDropdown({ data, setData }) {

  const [teamValue, setTeamValue] = useState('Any');
  const [againstValue, setAgainstValue] = useState('Any');

  const handleFilter = () => {
    let sql = 'SELECT * FROM ? ';
    if (teamValue !== 'Any')
    {
      sql += 'WHERE (teamA = \'' + teamValue + '\' OR teamB = \'' + teamValue + '\')';
    }
    if (againstValue !== 'Any')
    {
        sql += 'AND (teamA = \'' + againstValue + '\' OR teamB = \'' + againstValue + '\')';
    }
    const filtered = alasql(sql, [data]);
    // console.log(sql)
    setData(filtered);
  };

  useEffect(() => {
    handleFilter(teamValue, againstValue);
  }, [teamValue, againstValue]);

  return (
    <div>
        <DropdownComp   selectedValue={teamValue}
                        setSelectedValue={setTeamValue} 
                        options={Teams}> 
        </DropdownComp>
        Against
        <DropdownComp   selectedValue={againstValue} 
                        setSelectedValue={setAgainstValue} 
                        options={Teams}> 
        </DropdownComp>
    </div>

  );
}




export default TeamDropdown;