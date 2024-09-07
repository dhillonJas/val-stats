import React, { useState } from 'react';
import './DataTable.css'; // Import the CSS file for styling
import DropdownComp from './Dropdown';
import data from '../data/data.json'
import alasql from 'alasql';

const DataTable = () => {

  const [filterdata, setData] = useState(data);
  const [selectedValue, setSelectedValue] = useState('Select an option');


  const handleFilter = (criteria) => {
    let sql = 'SELECT * FROM ? WHERE teamA = \'Team ' + criteria + '\' OR teamB = \'Team ' + criteria + '\'';
    const filtered = alasql(sql, [data]);
    console.log(filtered)
    console.log(data)
    setData(filtered);
  };


  return (
    <div className="data-table">
      <DropdownComp selectedValue={selectedValue} setSelectedValue={setSelectedValue} handleFilter={handleFilter}/>
      <table>
        <thead>
          {filterdata.map((filterdata, index) => (
            <tr key={index}>
              <th>{filterdata.teamA} vs {filterdata.teamB} - {filterdata.score}</th>
            </tr>
          ))}
        </thead>

      </table>

    </div>
  );
};

export default DataTable;
