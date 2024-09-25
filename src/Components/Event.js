import React, { useState , useEffect} from 'react';
import DropdownComp from './Dropdown';
import {Events} from '../data/dropdownoptions'
import event_data from '../data/event_data.json'

function Event({ onFilter }) {

  const [eventName, setEventName] = useState('Any');
  // const memoizedEventData = useMemo(() => event_data, [event_data]);

  const handleFilter = () => {
      if (eventName === 'Any')
      {
        onFilter(event_data)
      }
      else{
        const filtered = event_data.filter(item => eventName ? item.event_title === eventName : true);
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