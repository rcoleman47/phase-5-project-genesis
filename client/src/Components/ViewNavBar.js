import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/Reducers/user';

export default function ViewNavBar() {
  const company = useSelector(state => state.company.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    fetch('/logout', {
      method: 'DELETE',
    });
    
    dispatch(logout()); 
    
    navigate('/login'); 
  };

  return (
    <div className='viewNavContainer' >
      <img src={company.logo} alt="Company logo" />
      <label>Select View
        <select>
          <option>Dashboard</option>
          <option>Projects</option>
          <option>Subcontractors</option>
          <option>Cost Codes</option>
        </select>
      </label>

      <button onClick={handleClick} >Log Out</button>

    </div>
  )
}
