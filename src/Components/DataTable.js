import './DataTable.css';
import React, { useState, useEffect, useMemo} from 'react';
import { Table, Pagination } from 'react-bootstrap';


const DataTable = ({filterData, columnNames}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  
  /** TODO
   * make it changeable by user */
  const rowsPerPage = 5; // Number of items you want to display per page 
    
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

    // Handle sort logic
    const handleSort = (column) => {
      let direction = 'asc';
      if (sortConfig.key === column && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key: column, direction });
    };

  // Memoized sorted data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filterData;
    return [...filterData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filterData, sortConfig]);
  
   // Total number of pages
 const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  
 // Pagination logic: calculate data for the current page
 const paginatedData = useMemo(() => {
   const startIndex = (currentPage - 1) * rowsPerPage;
   return sortedData.slice(startIndex, startIndex + rowsPerPage);
 }, [sortedData, currentPage]);

  // set current page to one after any filtering
  useEffect(() => {
        setCurrentPage(1);
          }, [filterData, sortConfig]);
  

  return (
    <div>
      <Table striped bordered hover>
      <thead>
        <tr>
          {columnNames.map((column) => (
            <th key={column} onClick={() => handleSort(column)}>
              {column}
                <span>
                  {sortConfig.key === column
                    ? sortConfig.direction === 'asc'
                      ? ' ▲'
                      : ' ▼'
                    : ''}
                </span>            
            </th>
          ))}
        </tr>
      </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
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