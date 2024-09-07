import React, { useEffect, useState } from 'react';
import "./App.css";
import DropdownComp from './Components/Dropdown';
import data from './data/data.json'
import Header from './Components/Header';
import Home from './Components/Home'
function App() {
  const [filterdata, setData] = useState(data);


  const handleFilter = (criteria) => {
    const filtered = data.filter((item) => item.id === criteria);
    setData(filtered);
  };


  return (
    <div className="App">
      <Header></Header>
      {/* <DropdownComp onSelect={handleDropdownChange}> </DropdownComp> */}
      {/* <button onClick={() => handleFilter(5)}>Filter</button>
      {filterdata.map((filterdata, index) => (
        <div key={index}>
          <h2>{filterdata.teamA} vs {filterdata.teamB} - {filterdata.score}</h2>
        </div>
      ))} */}
      <Home/>
    </div>
  );
}



export default App;
