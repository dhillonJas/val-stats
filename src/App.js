import React, { useState } from 'react';
import "./App.css";
// import DropdownComp from './Components/Dropdown';
import Header from './Components/Header';
import Home from './Components/Home'
import DataTable from './Components/DataTable';
function App() {


  return (
    <div className="App">
      <Header></Header>
      <Home/>
      <DataTable></DataTable>
    </div>
  );
}

  // const [filterdata, setData] = useState(data);


  // const handleFilter = (criteria) => {
  //   const filtered = data.filter((item) => item.id === criteria);
  //   setData(filtered);
  // };


export default App;
