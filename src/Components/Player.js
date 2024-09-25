import React, { useState , useEffect} from 'react';
import DropdownComp from './Dropdown';
import {Events} from '../data/dropdownoptions'

function Player({ data, onFilter }) {

//   const [playerName, setEventName] = useState('Any');

  const handleFilter = () => {

    }
  

//   useEffect(() => {
//     handleFilter(eventName);
//   }, [eventName]);

  return (
    <div>
        <DropdownComp   selectedValue={eventName}
                        setSelectedValue={setEventName} 
                        options={Events}> 
        </DropdownComp>
    </div>

  );
}




export default Player;