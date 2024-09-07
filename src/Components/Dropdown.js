import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function DropdownComp({ selectedValue, setSelectedValue, handleFilter }) {

  const handleSelect = (eventKey) => {
    setSelectedValue(eventKey); // Update the selected value in the parent component
    handleFilter(eventKey);
  };

  return (
    <Dropdown as={ButtonGroup} onSelect={handleSelect}>
      <Button variant="success">{selectedValue}</Button>

      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

      <Dropdown.Menu>
        <Dropdown.Item eventKey="A">Action</Dropdown.Item>
        <Dropdown.Item eventKey="B">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="C">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}




export default DropdownComp;