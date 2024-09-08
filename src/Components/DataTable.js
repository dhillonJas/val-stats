import React from 'react';
import './DataTable.css'; // Import the CSS file for styling


const DataTable = ({filterdata}) => {

  return (
    <div className="data-table">
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
