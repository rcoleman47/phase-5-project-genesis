import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import DirectoryTable from './DirectoryTable';
import SubDirectoryTable from './SubDirectoryTable';
import SubPagination from './SubPagination';
import NewUserForm from './NewUserForm';

export default function Directory() {
  const [sort, setSort] = useState('default');
  const [subSort, setSubSort] = useState('name');
  const [addUser, setAddUser] = useState(true);
  const [view, setView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [subsPerPage] = useState(2);

  const company = useSelector(state => state.company.company);
  const users = useSelector(state => state.company.users);
  const subcontractors = useSelector(state => state.subs.allSubs);

  const handleCompanySort = (e) => {
    setSort(e.target.value);
  };
  console.log(users)

  const handleSubSort = (e) => {
    setSubSort(e.target.value);
  };

  const handleSelect = (e) => {
    let value = e.target.value;
    if(value === 'true'){
      setView(true);
    } else setView(false);
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


  const renderCompanyDirectory = company?.[0].users ? <DirectoryTable sort={sort} company={company} users={users} /> : <h3 style={{alignSelf: 'center', color: 'orange'}}>No Contacts</h3>;

  const renderSubDirectory = currentSubs ? [...currentSubs].map(sub =>  <SubDirectoryTable key={sub.id} sort={sort} subcontractor={sub} />) : <h3 style={{alignSelf: 'center', color: 'orange'}}>No Contacts</h3>;

  const handleClick = (e) => {
    setAddUser(!addUser)
  };
  console.log(addUser)


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

      <div className='project-navbar' >
      <select onChange={handleSelect} value={view}>
          <option value={true} >Company</option>
          <option value={false} >Subcontractors</option>
        </select>
      </div>

      <div className='directory-buttons' >
        {view ? companyFilter : subFilter}

        <button onClick={handleClick}>Add Employee</button>
      </div>

      {addUser ? '' : <NewUserForm setAddUser={setAddUser} />}

      {view ? renderCompanyDirectory : renderSubDirectory}

      {renderPagination}

    </div>
  )
}
