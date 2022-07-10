import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import DirectoryTable from './DirectoryTable';
import SubDirectoryTable from './SubDirectoryTable';
import SubPagination from './SubPagination';

export default function Directory() {
  const [sort, setSort] = useState('default');
  const [subSort, setSubSort] = useState('name');
  const [view, setView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [subsPerPage] = useState(2);

  const company = useSelector(state => state.company.value);
  const subcontractors = useSelector(state => state.subs.allSubs);

  const handleCompanySort = (e) => {
    setSort(e.target.value);
  };

  const handleSubSort = (e) => {
    setSubSort(e.target.value);
  };

  const handleClick = (e) => {
    setView(view => !view)
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


  const renderCompanyDirectory = company?.[0].users ? <DirectoryTable sort={sort} company={company} /> : <h3 style={{alignSelf: 'center', color: 'orange'}}>No Contacts</h3>;

  const renderSubDirectory = currentSubs ? [...currentSubs].map(sub =>  <SubDirectoryTable key={sub.id} sort={sort} subcontractor={sub} />) : <h3 style={{alignSelf: 'center', color: 'orange'}}>No Contacts</h3>;

  const directoryView = view ? 'Show Subcontractors' : 'Show Company';

  const companyFilter = 
    <label>Filter
      <select onChange={handleCompanySort} value={sort}>
        <option value='default' >Default</option>
        <option value='name' >Name</option>
        <option value='role' >Role</option>
      </select>
    </label>

  const subFilter =
    <label>Filter
      <select onChange={handleSubSort} value={subSort}>
        <option value='name' >Name</option>
        <option value='trade' >Trade</option>
      </select>
    </label>

  const renderPagination = view ? '' : <SubPagination subsPerPage={subsPerPage} totalSubs={totalSubs} paginate={paginate} />


  return (
    <div className='dashboard'>
      <div className='directory-buttons' >
        {view ? companyFilter : subFilter}
       
        <button onClick={handleClick} >{directoryView}</button>
      </div>

      {view ? renderCompanyDirectory : renderSubDirectory}

      {renderPagination}

    </div>
  )
}
