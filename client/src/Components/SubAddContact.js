import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setDirectoryView } from '../Redux/Reducers/view';
import NewContactForm from './NewContactForm';


export default function SubAddContact() {
  const currentSub = useSelector(state => state.subs.currentSub)

  const renderUsers = currentSub?.contacts?.length > 0 ? [...currentSub?.contacts].map(user => {
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
    dispatch(setDirectoryView('/directory/subcontractors'))
    navigate('/directory/subcontractors')
  };

  const renderTable = 
    <>
      <table className="directory-table" style={{marginTop: '20px', marginBottom: '10px'}}>
        <thead>
          <tr>
            <th style={{color: 'orange', fontWeight: '900'}}>
              {currentSub?.name}
            </th>
            <th style={{fontWeight: '900'}}>
              {currentSub?.trade}
            </th>
            <th style={{fontWeight: '900'}}>
              {currentSub?.address}
            </th>
            <th style={{fontWeight: '900'}}>
              {currentSub?.phone_number}
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

      <NewContactForm  />
    
    <div style={{display: 'flex', justifyContent: 'right', width: '50.6%', marginTop: '10px'}}>
      <button onClick={handleClick} >Complete</button>
    </div>
  </>

  return (
    <div className='projects-container' >
      <div className='projects'>
        <h1 style={{background: 'white', alignSelf: 'center', color: 'orange'}}>Add Contacts to {currentSub.name}</h1>
        <div className='project-container' style={{marginLeft: '3px'}} >
          {currentSub?.contacts  ? renderTable : <h1 style={{textAlign: 'center', color: 'orange'}}>Add Subcontractors!</h1>}
        </div>
      </div>
    </div>
  )
}