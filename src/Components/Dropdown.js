import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function DropdownComp({ selectedValue, setSelectedValue, options }) {

  const handleSelect = (eventKey) => {
    setSelectedValue(eventKey); // Update the selected value in the parent component
  };

  return (
    <Dropdown onSelect={handleSelect}>

      <Dropdown.Toggle variant="success" id="dropdown-split-basic" >
      {selectedValue}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map((option, index) => (
          <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}




export default DropdownComp;