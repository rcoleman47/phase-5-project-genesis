import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSub } from '../Redux/Reducers/subcontractors';
import { setDirectoryView } from '../Redux/Reducers/view';


export default function SubDirectoryTable({ subcontractor }) {
  const user = useSelector(state => state.user.value);

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentSub(subcontractor))
    dispatch(setDirectoryView('/directory/subcontractor/edit'))
    navigate('/directory/subcontractor/edit')
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
    
    <div style={{display: 'flex', justifyContent: 'flex-end', width: '7.6%', marginBottom: '10px'}}>
      {user?.admin ? <button onClick={handleClick} >Add Contact</button> : ''}
    </div>
  </>

  return (
    <>
      {subcontractor?.contacts  ? renderTable : <h1 style={{textAlign: 'center', color: 'orange'}}>Add Subcontractors!</h1>}
    </>
  )
}