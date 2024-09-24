import React, { useState , useEffect} from 'react';
import DropdownComp from './Dropdown';
import {Events} from '../data/dropdownoptions'
import alasql from 'alasql';

function Event({ data, onFilter }) {

  const [eventName, setEventName] = useState('Any');

  const handleFilter = () => {
      if (eventName === 'Any')
      {
        onFilter(data)
      }
      else{
        const filtered = data.filter(item => eventName ? item.event_title === eventName : true);
      onFilter(filtered);
      }
    }
  

  useEffect(() => {
    handleFilter(eventName);
  }, [eventName]);

  return (
    <div>
        <DropdownComp   selectedValue={eventName}
                        setSelectedValue={setEventName} 
                        options={Events}> 
        </DropdownComp>
    </div>

  );
}




export default Event;