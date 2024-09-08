import React, { useState } from 'react';
import './Home.css'; 
import TeamDropdown from './TeamDropdowns';
import DataTable from './DataTable';
import data from '../data/data.json'
const Home = () => {

  const [filterdata, setData] = useState(data);
  const [selectedButton, setSelectedButton] = useState('Team');

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };


  // const handleFilter = (criteria) => {
  //   let sql = 'SELECT * FROM ?';
  //   if (criteria !== 'Any')
  //   {
  //     sql += 'WHERE teamA = \'' + criteria + '\' OR teamB = \'' + criteria + '\'';
  //   };
  //   const filtered = alasql(sql, [data]);
  //   console.log(filtered)
  //   console.log(data)
  //   setData(filtered);
  // };

  return (
    <div className="home">
      <div className="buttons">
        <button className="grid-button" onClick={() => handleButtonClick('Team')}>Team</button>
        <button className="grid-button" onClick={() => handleButtonClick('Map')}>Map</button>
        <button className="grid-button" onClick={() => handleButtonClick('Agent')}>Agent</button>
        <button className="grid-button" onClick={() => handleButtonClick('Player')}>Player</button>
      </div>

      {selectedButton === 'Team' && (
        <div>
          <TeamDropdown data={data} setData={setData}></TeamDropdown>
        </div>
      )}
      {
        selectedButton === 'Map' && (
          <div>
          {/* <DropdownComp selectedValue={selectedMapValue} 
            setSelectedValue={setSelectedMapValue}
            handleFilter={handleFilter}
            options={Maps}
            > 
          </DropdownComp> */}
          </div>
        
      )}
      <DataTable filterdata={filterdata}></DataTable>

    </div>
  );
};

export default Home;
