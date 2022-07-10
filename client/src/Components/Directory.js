import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import DirectoryTable from './DirectoryTable';
import SubDirectoryTable from './SubDirectoryTable';

export default function Directory() {
  const [sort, setSort] = useState('default');
  const [view, setView] = useState(true);

  const company = useSelector(state => state.company.value);
  const subcontractors = useSelector(state => state.subs.allSubs);

  const handleSortSelect = (e) => {
    setSort(e.target.value);
  };

  const handleClick = (e) => {
    setView(view => !view)
  };


  const renderCompanyDirectory = company?.[0].users ? <DirectoryTable sort={sort} company={company} /> : <h3 style={{alignSelf: 'center', color: 'orange'}}>No Contacts</h3>;


  const renderSubDirectory = subcontractors ? subcontractors.map(sub =>  <SubDirectoryTable key={sub.id} sort={sort} subcontractor={sub} />) : <h3 style={{alignSelf: 'center', color: 'orange'}}>No Contacts</h3>;

  const directoryView = view ? 'Show Subcontractors' : 'Show Company';

  return (
    <div className='dashboard'>
      <div className='directory-buttons' >
      <label>Filter
          <select onChange={handleSortSelect} value={sort}>
            <option value='default' >Default</option>
            <option value='name' >Name</option>
            <option value='role' >Role</option>
          </select>
        </label>
       
        <button onClick={handleClick} >{directoryView}</button>
      </div>

      {view ? renderCompanyDirectory : renderSubDirectory}

    </div>
  )
}
