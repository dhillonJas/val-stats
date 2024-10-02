import './DataTable.css';
import React, { useState, useEffect, useMemo} from 'react';
import { Table, Pagination, Tooltip, OverlayTrigger} from 'react-bootstrap';
import {DATE, PRIZE,  LINK, LIST, OBJECT, SIDES_OBJECT} from '../data/columns_names'

const DataTable = ({data, columns, selectedButton}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc', type:'' });
  const rowsPerPage = 20; // Number of items you want to display per page 
  const side_display_order = ['all', 'attack', 'defense', 'overtime']
  
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


  // const getValueToSort = useCallback((v) => {
  //   let value = v[sortConfig.key]
  //   // console.log(value)
  //   if (sortConfig.type === SIDES_OBJECT ){
  //     const side_key = sortConfig.key.split('_').pop()
  //     const data_key = sortConfig.key.split('_').slice(0, -1).join('_')
  //     // console.log(data_key, v[data_key], side_key)
  //     value = v[data_key][side_key]
  //   }
  //   return value
  // },[sortConfig])

  console.log(sortConfig)

  // Memoized sorted data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      // const aValue = getValueToSort(a)
      // const bValue = getValueToSort(b)
      let aValue = a[sortConfig.key]
      let bValue = b[sortConfig.key]

      if (sortConfig.type === SIDES_OBJECT ){
        const side_key = sortConfig.key.split('_').pop()
        const data_key = sortConfig.key.split('_').slice(0, -1).join('_')
        // console.log(data_key, v[data_key], side_key)
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
                <span>Hover for info</span>
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
                <span>Hover for info</span>
              </OverlayTrigger>
      case SIDES_OBJECT:
        return <div>
                {side_display_order.map((side, index) => (
                <React.Fragment key={index}>
                  {value[side]}
                {index < side_display_order.length - 1 && <span> / </span>}
              </React.Fragment>
            ))}
        </div>
        
      default:
        return value;
    }
  }

  const renderTableHeader= (isSidesObject, column) => {
    
    if (isSidesObject)
    {
      return <div>{side_display_order.map((side, index) => (
        <React.Fragment key={index}>
          <span onClick={() => handleSort(columns[column].value + '_' + side, SIDES_OBJECT) }>
            {sortConfig.key === columns[column].value + '_' + side
              ? sortConfig.direction === 'asc'
                ? ' ▲'
                : ' ▼'
              : '-'
              }
          </span>
          {index < side_display_order.length - 1 && <span> / </span>}
        </React.Fragment>
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
                  <div >
                  { renderTableHeader(columns[column].type === SIDES_OBJECT, column)}
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