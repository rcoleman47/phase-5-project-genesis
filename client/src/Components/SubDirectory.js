import { useSelector } from 'react-redux';
import { useState } from 'react';
import SubDirectoryTable from './SubDirectoryTable';
import SubPagination from './SubPagination';


export default function SubDirectory() {
  const [subSort, setSubSort] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [subsPerPage] = useState(2);

  const subcontractors = useSelector(state => state.subs.allSubs);

  const handleSubSort = (e) => {
    setSubSort(e.target.value);
  };

  const totalSubs = subcontractors?.length
  const indexOfLastSub = currentPage * subsPerPage;
  const indexOfFirstSub = indexOfLastSub - subsPerPage;

  const currentSubs = subcontractors?.length ? [...subcontractors].sort((a, b) => {
    if(subSort === 'name'){
      return a.name.localeCompare(b.name);
    } else if(subSort === 'trade'){
        return a.trade.localeCompare(b.trade);
    } else{
        return a.id - b.id
      }
    })?.slice(indexOfFirstSub, indexOfLastSub) : undefined;


  const paginate = (number) => setCurrentPage(number);

  const renderSubDirectory = currentSubs ? [...currentSubs].map(sub =>  <SubDirectoryTable key={sub.id} subcontractor={sub} />) : <h3 style={{alignSelf: 'center', color: 'orange'}}>No Contacts</h3>;

  return (
    <>
      <div className='directory-buttons' >
        <label>Filter
          <select onChange={handleSubSort} value={subSort}>
            <option value='name' >Name</option>
            <option value='trade' >Trade</option>
           </select>
         </label>

        <button>Add Employee</button>
      </div>

      {renderSubDirectory}

      <SubPagination 
        subsPerPage={subsPerPage} 
        totalSubs={totalSubs} 
        paginate={paginate} />
    </>
  )
}