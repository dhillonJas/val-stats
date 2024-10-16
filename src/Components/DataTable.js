import React, { useState, useEffect, useMemo} from 'react';
import { Table, Pagination, Tooltip, OverlayTrigger} from 'react-bootstrap';
import {DATE, PRIZE,  LINK, LIST, OBJECT, ROUND_SIDES, STAT_SIDES} from '../data/columns_names'
import './css/table.css'
const DataTable = ({data, columns, selectedButton}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc', type:'' });
  const rowsPerPage = 20; // Number of items you want to display per page 
  const round_sides_display_order = ['all', 'attack', 'defense', 'overtime']
  const stat_sides_display_order = ['all', 'attack', 'defense']
  
  // const [searchQueries, setSearchQueries] = useState(
  //   columnNames.reduce((acc, column) => {
  //     acc[column] = '';
  //     return acc;
  //   }, {})
  // );

    
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
    const handleSort = (column, type) => {
      let direction = 'asc';
      if (sortConfig.key === column && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key:column, direction:direction, type:type});
    };

  // Memoized sorted data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      let aValue = a[sortConfig.key]
      let bValue = b[sortConfig.key]

      if (sortConfig.type === ROUND_SIDES || sortConfig.type === STAT_SIDES ){
        const side_key = sortConfig.key.split('_').pop()
        const data_key = sortConfig.key.split('_').slice(0, -1).join('_')
        aValue = a[data_key][side_key]
        bValue = b[data_key][side_key]
      }

      if (aValue < bValue) {

        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
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

  // had to reset type to '' when the page change as it 
  // was trying to access  undefined['all'] in sortedData
  useEffect(() => {
     setSortConfig({ key: '', direction: 'asc', type:'' })
  }, [selectedButton])
  
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

  function handleSidesObject(value, type){
    const display_order = type === ROUND_SIDES ? round_sides_display_order : stat_sides_display_order
    return <div>
            {display_order.map((side, index) => (
            <span key={index}>
              {value[side]}
              {index < display_order.length - 1 && 
                  <strong>
                    {' / '} 
                  </strong>}
            </span>
        ))}
    </div>
  }

  const formatCell = (value, type) => {
    switch (type) {
      case DATE:
        let dateObj = new Date(value)
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return dateObj.toLocaleDateString('en-US', options);
      case PRIZE:
        const prize_options = { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }
        return new Intl.NumberFormat('en-US', prize_options).format(value);
      case LINK:
        return <a href={value} target="_blank" rel="noopener noreferrer">Link</a>;
      case LIST:
        return <OverlayTrigger
                placement="left"
                overlay={
                  <Tooltip id={`tooltip-${Math.random()}`}>
                    {value.map((val, index) => (
                      <div key={index}>{val}</div>
                    ))}
                  </Tooltip>
                }
              >
                <span>Hover</span>
              </OverlayTrigger>
      case OBJECT:
        return <OverlayTrigger
                placement="left"
                overlay={
                  <Tooltip id={`tooltip-${Math.random()}`}>
                    {Object.entries(value).map(([key, val], index) => (
                      <div key={index}>
                        <strong>{key}</strong>: {Array.isArray(val) ? val.join(', ') : val}
                      </div>
                    ))}
                  </Tooltip>
                }
              >
                <span>Hover</span>
              </OverlayTrigger>
      case ROUND_SIDES:
      case STAT_SIDES:
        return handleSidesObject(value, type)       
      default:
        return value;
    }
  }

  const renderTableHeader= (type, column) => {
    
    if (type === STAT_SIDES || type === ROUND_SIDES)
    {
      const display_order = type === ROUND_SIDES ? round_sides_display_order : stat_sides_display_order
      return <div>{display_order.map((side, index) => (
            <span key={index} onClick={() => handleSort(columns[column].value + '_' + side, columns[column].type) }>
              {sortConfig.key === columns[column].value + '_' + side
                ? sortConfig.direction === 'asc'
                  ? ' ▲'
                  : ' ▼'
                : '-'
                }
            {index < display_order.length - 1 && <span> / </span>}
            </span>
      ))}
      </div>
    }
    else{
      return <span onClick={() => handleSort(columns[column].value, '')}>
      {sortConfig.key === columns[column].value
        ? sortConfig.direction === 'asc'
          ? ' ▲'
          : ' ▼'
        : '-'}
    </span>
    }
  }


  return (
      <div>
    <div className='table-wrapper' style={{ overflowX: 'auto' }}>
      <Table className='fl-table'>
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
                  <div >
                  { renderTableHeader(columns[column].type, column)}
                  </div>
            </th>
          ))}
        </tr>
      </thead>
        <tbody>
        
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(columns).map((colName, colIndex) => (
                <td key={colIndex}>{formatCell(row[colName.value], colName.type)}</td> // Dynamically rendering cell data
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
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