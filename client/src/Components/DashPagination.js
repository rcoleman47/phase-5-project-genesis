import React from 'react'
import { useState } from 'react';

export default function DashPagination({ projectsPerPage, totalProjects, paginate}) {
  const [active, setActive] = useState(1);

  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalProjects / projectsPerPage);  i++) {
    pageNumbers.push(i);
  };

  const renderPageNumbers = pageNumbers.map(number => (
    <button 
      key={number} 
      onClick={() => {
        setActive(number);
        paginate(number);
      }}
      style={{
        background: active === number ? 'orange' : '#c0c0c0',
      }} >
        {number}
    </button>
  ))

  return (
    <div className='paginate'>
      {pageNumbers.length > 1 ? renderPageNumbers : null}
    </div>
  )
}
