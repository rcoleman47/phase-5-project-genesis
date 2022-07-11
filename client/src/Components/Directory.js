import { useSelector } from 'react-redux';
import { useState } from 'react';
import DirectoryTable from './DirectoryTable';
import NewUserForm from './NewUserForm';

export default function Directory() {
  const [sort, setSort] = useState('default');
  const [addUser, setAddUser] = useState(true);

  const company = useSelector(state => state.company.company);
  const users = useSelector(state => state.company.users);

  const handleCompanySort = (e) => {
    setSort(e.target.value);
  };

  const renderCompanyDirectory = company?.users ? <DirectoryTable sort={sort} company={company} users={users} /> : <h3 style={{alignSelf: 'center', color: 'orange'}}>No Contacts</h3>;

  const handleClick = (e) => {
    setAddUser(!addUser)
  };

  return (
    <>
      <div className='directory-buttons' >
        <label>Filter
          <select onChange={handleCompanySort} value={sort}>
            <option value='default' >Default</option>
            <option value='name' >Name</option>
            <option value='role' >Role</option>
          </select>
        </label>

        <button onClick={handleClick}>Add Employee</button>
      </div>

      {addUser ? '' : <NewUserForm setAddUser={setAddUser} />}

      {renderCompanyDirectory}

    </>
  )
}
