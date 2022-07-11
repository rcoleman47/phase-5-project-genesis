import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentSub } from '../Redux/Reducers/subcontractors';
import NewContactForm from './NewContactForm';


export default function SubDirectoryTable({ subcontractor }) {
  const [addContact, setAddContact] = useState(true);

  const renderUsers = subcontractor?.contacts.length > 0 ? [...subcontractor?.contacts].map(user => {
    return (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.cell_number}</td>
        <td>{user.role}</td>
      </tr>
    )
  } ) : <tr><th  style={{color: 'orange', fontWeight: '800', background: 'black'}}>No Contacts</th></tr>

  const dispatch = useDispatch();

  const handleClick = () => {
    setAddContact(!addContact)
    dispatch(setCurrentSub(subcontractor))
  };

  const renderTable = 
    <>
      <table className="directory-table" style={{marginTop: '20px', marginBottom: '10px'}}>
        <thead>
          <tr>
            <th style={{color: 'orange', fontWeight: '900'}}>
              {subcontractor?.name}
            </th>
            <th style={{fontWeight: '900'}}>
              {subcontractor?.trade}
            </th>
            <th style={{fontWeight: '900'}}>
              {subcontractor?.address}
            </th>
            <th style={{fontWeight: '900'}}>
              {subcontractor?.phone_number}
            </th>
          </tr>
          <tr>
            <th>Name:</th>
            <th>Email:</th>
            <th>Cell Number:</th>
            <th>Role:</th>
          </tr>
        </thead>
        <tbody>
            {renderUsers}
        </tbody>
    </table>

    {addContact ? '' : <NewContactForm setAddContact={setAddContact} subcontractor={subcontractor} />}
    
    <div style={{display: 'flex', justifyContent: 'flex-end', width: '7.6%', marginBottom: '10px'}}>
      <button onClick={handleClick} >Add Contact</button>
    </div>
  </>

  return (
    <>
      {subcontractor?.contacts  ? renderTable : <h1 style={{textAlign: 'center', color: 'orange'}}>Add Subcontractors!</h1>}
    </>
  )
}