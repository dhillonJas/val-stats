import React, { useState, useEffect, useMemo} from 'react';
import { Pagination, Tooltip, OverlayTrigger} from 'react-bootstrap';
import {STRING, DATE, PRIZE,  LINK, LIST, OBJECT, ROUND_SIDES, STAT_SIDES, STRING_LIST, PLACEMENT} from '../data/columns_names'
import './css/table.css'

const DataTable = ({data, columns, selectedButton, handleCollapseable}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc', type:'' });
  const rowsPerPage = 50; // Number of items you want to display per page 
  const round_sides_display_order = ['all', 'attack', 'defense', 'overtime']
  const stat_sides_display_order = ['all', 'attack', 'defense']
  
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
      else if (sortConfig.type === PLACEMENT)
      {
        aValue = parseInt(a[sortConfig.key][0].split('-')[0].slice(0, -2))
        bValue = parseInt(b[sortConfig.key][0].split('-')[0].slice(0, -2))
      }
      else if (sortConfig.type === STRING_LIST){
          aValue = a[sortConfig.key].length
          bValue = b[sortConfig.key].length
      }
      else if (sortConfig.type === STRING)
      {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }
      
      if (aValue < bValue) {

        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    })
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

  const getStyle = (width) => 
    {
      if (width)
        return { 
          minWidth: width,
          maxWidth: width,
          whiteSpace: 'normal',
          textAlign: 'center'
        };
      return {width:'auto'}
    }

  function handleStringList(value){
    return <div>
      {value.map((val, index) => (
        <div key={index}>{val}</div>
      ))}
    </div>
  }

  function onClickCollpase(column)
  {
    handleCollapseable(columns, column)
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
                <span>ⓘ</span>
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
                <span>ⓘ</span>
              </OverlayTrigger>
      case ROUND_SIDES:
      case STAT_SIDES:
        return handleSidesObject(value, type)
      case STRING_LIST:
      case PLACEMENT:
        return handleStringList(value, type)
      default:
        return value;
    }
  }

  const renderTableHeader= (type, column, collapsedType) => {
    
    if (type === STAT_SIDES || type === ROUND_SIDES)
    {
      const display_order = type === ROUND_SIDES ? round_sides_display_order : stat_sides_display_order
      return <div>
              {column} <OverlayTrigger
                        placement="left"
                        overlay={  <Tooltip id={`tooltip-${Math.random()}`}> 
                                        {display_order
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(' / ')}</Tooltip>  
                                }
                       >
                        <span>ⓘ</span>
                      </OverlayTrigger>
                    <div>{display_order.map((side, index) => (
                    <span key={index} 
                          onClick={() => handleSort(columns[column].value + '_' + side, columns[column].type) }
                          style={{ cursor: 'pointer' }}>
                      {sortConfig.key === columns[column].value + '_' + side
                        ? sortConfig.direction === 'asc'
                        ? <span style={{ color: '#FAFAFA' }}>&#9650;</span>
                        : <span style={{ color: '#FAFAFA' }}>&#9660;</span>
                      : <span style={{ color: '#FAFAFA' }}>&#8596;</span>
                        }
                    {index < display_order.length - 1 && <span> <strong> / </strong> </span>}
                    </span>
              ))}
              </div>
          </div> 
    }
    else{
      return <div>
              {column}
                <div>
                      <span onClick={() => handleSort(columns[column].value, columns[column].type)}
                            style={{ cursor: 'pointer' }}
                      >
                        {sortConfig.key === columns[column].value
                          ? sortConfig.direction === 'asc'
                          ? <span style={{ color: '#FAFAFA' }}>&#9650;</span>
                          : <span style={{ color: '#FAFAFA' }}>&#9660;</span>
                        : <span style={{ color: '#FAFAFA' }}>&#8596;</span>
                          }
                      {collapsedType && (
                        <span 
                        onClick={() => onClickCollpase(column)}
                        style={{ cursor: 'pointer' }}
                        >
                          <span style={{ color: '#FAFAFA' }}>&#8594;</span>
                      </span>
                    )}
                    </span>
                
                </div>
        </div>
    
    }
  }


  return (
      <div>
    <div className='table-wrapper' style={{ overflowX: 'auto' }}>
      <table className='fl-table'>
      <thead>
        <tr>
          <th>#</th> 
          {Object.keys(columns).map((column) => (
            <th key={column} 
                style={getStyle(columns[column].width)}>     
                  <div >
                  { renderTableHeader(columns[column].type, column, 'collapsedType' in columns[column])}
                  </div>
            </th>
          ))}
        </tr>
      </thead>
        <tbody>
        
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
               <td>{(currentPage - 1) * rowsPerPage + rowIndex + 1}</td> 
               {Object.values(columns).map((colName, colIndex) => (
                <td key={colIndex}>{formatCell(row[colName.value], colName.type)}</td> // Dynamically rendering cell data
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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