import React, { useState , useEffect, useCallback} from 'react';
import DropdownComp from './Dropdown';
import event_data from '../data/event_data.json'

function Event({ onFilter }) {

  const [eventName, setEventName] = useState('Any');

  const handleFilter = useCallback(() => {
      if (eventName === 'Any')
      {
        onFilter(event_data)
      }
      else{
        const filtered = event_data.filter(item => eventName ? item.event_name === eventName : true);
      onFilter(filtered);
      }
    },[onFilter, eventName])
  
  const eventNames = event_data.map(event => event.event_name);
  eventNames.push('Any')
  
  useEffect(() => {
    handleFilter(eventName);
  }, [eventName, handleFilter]);

  return (
    <div>
        <DropdownComp   selectedValue={eventName}
                        setSelectedValue={setEventName} 
                        options={eventNames}> 
        </DropdownComp>
        <button> Advanced Stats </button>
    </div>

  );
}




export default Event;