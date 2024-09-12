import './DataTable.css';
import React, { useState, useEffect} from 'react';
import { Table, Pagination } from 'react-bootstrap';


const DataTable = ({filterData, columnNames}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Number of items you want to display per page
  //const [data, setData] = useState(filterData)

  
  // Calculate total pages
  const totalPages = Math.ceil(filterData.length / itemsPerPage);

  // Get the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentData = filterData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  useEffect(() => {
        setCurrentPage(1);
          }, [filterData]);
  

  return (
    <div>
      <pre>{JSON.stringify(totalPages, null, 2)}</pre>
      <pre>{JSON.stringify(indexOfFirstItem, null, 2)}</pre>
      <pre>{JSON.stringify(indexOfLastItem, null, 2)}</pre>
      <Table striped bordered hover>
        <thead>
          {columnNames.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columnNames.map((colName, colIndex) => (
                <td key={colIndex}>{row[colName]}</td> // Dynamically rendering cell data
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Control */}
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
}

export default DataTable;