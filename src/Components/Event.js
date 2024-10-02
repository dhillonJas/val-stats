import React, { useState , useEffect} from 'react';
import Button from 'react-bootstrap/Button'

import event_data from '../data/tables/event_table.json'
import { INFORMATION, ADVANCED, events_columns } from '../data/columns_names';

function Event({ onFilter, onViewModeChange}) {

  const [isAdvanced, setIsAdvanced] = useState(false)
  
  useEffect(() => {
    let viewMode = isAdvanced  ?  ADVANCED: INFORMATION
    onViewModeChange(events_columns[viewMode]); // Pass columns to Home.js
    onFilter(event_data)
  }, [isAdvanced, onViewModeChange, onFilter]);

  const handleClick = () => {
    setIsAdvanced(!isAdvanced);
  };
  return (
    <div>
        <Button variant="dark"   onClick={handleClick}>
        {isAdvanced ? ADVANCED : INFORMATION}
       </Button>
    </div>

  );
}




export default Event;