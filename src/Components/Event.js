import React, { useState , useEffect} from 'react';
import Button from 'react-bootstrap/Button'
import './css/toggle_button.css'
import event_data from '../data/tables/event_table.json'
import { BASIC, ADVANCED, events_columns } from '../data/columns_names';

function Event({ onFilter, onViewModeChange}) {

  const [isAdvanced, setIsAdvanced] = useState(false)
  
  useEffect(() => {
    let viewMode = isAdvanced  ?  ADVANCED: BASIC
    onViewModeChange(events_columns[viewMode]); // Pass columns to Home.js
    onFilter(event_data)
  }, [isAdvanced, onViewModeChange, onFilter]);

  const handleClick = () => {
    setIsAdvanced(!isAdvanced);
  };
  return (
    <div>
      <br></br>
        <Button className={`toggle-button ${isAdvanced ? 'advanced' : ''}`} 
                variant="dark"   
                onClick={handleClick}
                style={{ width: '150px', whiteSpace: 'nowrap', textAlign: 'center' }}>
        {isAdvanced ? ADVANCED : BASIC}
       </Button>
    </div>

  );
}




export default Event;