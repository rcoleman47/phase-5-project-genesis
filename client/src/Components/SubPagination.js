import React from 'react';
import { useState } from 'react';

export default function SubPagination({subsPerPage, totalSubs, paginate}) {
  const [active, setActive] = useState(1);

  const pageNumbers         = [];

  for(let i = 1; i <= Math.ceil(totalSubs / subsPerPage);  i++) {
    pageNumbers.push(i);
  };

  const renderPageNumbers   = pageNumbers.map(number => (
    <button 
      key={number} 
      onClick={() => {
        setActive(number);
        paginate(number);
      }}
      style={{
        background: active === number ? 'orange' : '#c0c0c0',
        fontWeight: active === number ? '800'    : '100',
        width:      '30px'
      }} >
        {number}
    </button>
  ));

  return (
    <div className='paginate'>
      {pageNumbers.length > 1 ? renderPageNumbers : null}
    </div>
  )
}
