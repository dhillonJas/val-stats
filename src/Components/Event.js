import React, { useState , useEffect} from 'react';
import DropdownComp from './Dropdown';
import event_data from '../data/tables/event_table.json'
import { columns_information } from '../data/columns_names';

function Event({ onFilter, onViewModeChange}) {

  const options = ['Information', 'Advanced']
  
  const [viewMode, setViewMode] = useState('Information'); // Basic or Advanced mode

  useEffect(() => {
    onViewModeChange(columns_information['Event'][viewMode]); // Pass columns to Home.js
    onFilter(event_data)
  }, [viewMode, onViewModeChange]);

  return (
    <div>
        <DropdownComp   selectedValue={viewMode}
                        setSelectedValue={setViewMode}
                        options={options}> 
        </DropdownComp>
    </div>

  );
}




export default Event;