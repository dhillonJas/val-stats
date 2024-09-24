import './DataTable.css';
import React, { useState, useEffect, useMemo} from 'react';
import { Table, Pagination } from 'react-bootstrap';


const DataTable = ({data, columnNames}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  // const [searchQueries, setSearchQueries] = useState(
  //   columnNames.reduce((acc, column) => {
  //     acc[column] = '';
  //     return acc;
  //   }, {})
  // );

  /** TODO
   * make it changeable by user */
  const rowsPerPage = 20; // Number of items you want to display per page 
    
    // Handle search
    // const searchedData = filterData.filter(item =>
    //   columnNames.every(column =>
    //     !searchQueries[column] || 
    //     item[column]?.toString().toLowerCase().includes(searchQueries[column].toLowerCase())
    //   )    
    // );
  

    // // Update search queries for each column dynamically
    // const handleSearchChange = (e, column) => {
    //   setSearchQueries({
    //     ...searchQueries,
    //     [column]: e.target.value
    //   });
    // };

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
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  },  data, sortConfig);
  
   // Total number of pages
 const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  
 // Pagination logic: calculate data for the current page
 const paginatedData = useMemo(() => {
   const startIndex = (currentPage - 1) * rowsPerPage;
   return sortedData.slice(startIndex, startIndex + rowsPerPage);
 }, [sortedData, currentPage]);


   // Handle page change
   const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages)
      setCurrentPage(pageNumber);
  };

  // set current page to one after any filtering
  useEffect(() => {
        setCurrentPage(1);
          },  data, sortConfig);
  

  return (
    <div>
      <Table striped bordered hover>
      <thead>
        <tr>
          {columnNames.map((column) => (
            <th key={column} >
              {column}
                {/* <input
                  key={column}
                  type="text"
                  placeholder={`Search ${column}`}
                  value={searchQueries[column]}
                  onChange={(e) => handleSearchChange(e, column)}
                /> */}
                  <div onClick={() => handleSort(column)}>
                    <span>
                      {sortConfig.key === column
                        ? sortConfig.direction === 'asc'
                          ? ' ▲'
                          : ' ▼'
                        : 'no'}
                    </span>
                  </div>
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