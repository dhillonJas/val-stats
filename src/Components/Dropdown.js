import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function DropdownComp({ selectedValue, setSelectedValue, options }) {

  const handleSelect = (eventKey) => {
    setSelectedValue(eventKey); // Update the selected value in the parent component
  };

  return (
    <Dropdown as={ButtonGroup} onSelect={handleSelect}>
      <Button variant="success">{selectedValue}</Button>

      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

      <Dropdown.Menu>
        {options.map((option, index) => (
          <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}




export default DropdownComp;