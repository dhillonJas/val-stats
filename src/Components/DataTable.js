import './DataTable.css';
import React, { useState, useEffect, useMemo} from 'react';
import { Table, Pagination } from 'react-bootstrap';

const DataTable = ({data, columns}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });



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
      setSortConfig({ key:column, direction });
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
  },  [data, sortConfig]);
  
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
    },  [data, sortConfig]);
  
  const getPaginationRange = () => {
    const items = [];
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(currentPage + 2, totalPages);

    // Add the first page and ellipsis if startPage is greater than 1
    if (startPage > 1) {
      items.push(
        <Pagination.Item key={1} active={currentPage === 1} onClick={() => handlePageChange(1)}>
          1
        </Pagination.Item>
      );
      items.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }

    // Add visible pages around the current page
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item key={i} active={currentPage === i} onClick={() => handlePageChange(i)}>
          {i}
        </Pagination.Item>
      );
    }

    // Add ellipsis and the last page if endPage is less than totalPages
    if (endPage < totalPages) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" />);
      items.push(
        <Pagination.Item key={totalPages} active={currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };


  const formatCell = (value, type) => {
    switch (type) {
      case "date":
        let dateObj = new Date(value)
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return dateObj.toLocaleDateString('en-US', options);
      case "prize":
        const prize_options = { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }
        return new Intl.NumberFormat('en-US', prize_options).format(value);
      case "link":
        return <a href={value} target="_blank" rel="noopener noreferrer">Link</a>
      default:
        return value;
    }
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <Table striped bordered hover>
      <thead>
        <tr>
          {Object.keys(columns).map((column) => (
            <th key={column} >
              {column}
                {/* <input
                  key={column}
                  type="text"
                  placeholder={`Search ${column}`}
                  value={searchQueries[column]}
                  onChange={(e) => handleSearchChange(e, column)}
                /> */}
                  <div onClick={() => handleSort(columns[column].value)}>
                    <span>
                      {sortConfig.key === columns[column].value
                        ? sortConfig.direction === 'asc'
                          ? ' ▲'
                          : ' ▼'
                        : '-'}
                    </span>
                  </div>
            </th>
          ))}
        </tr>
      </thead>
        <tbody>
        
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(columns).map((colName, colIndex) => (
                <td key={colIndex}>{formatCell(row[colName['value']], colName['type'])}</td> // Dynamically rendering cell data
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Control */}
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

        {getPaginationRange()}

        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
}

export default DataTable;