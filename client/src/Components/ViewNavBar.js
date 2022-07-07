import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/Reducers/user';
import { useState, useEffect } from 'react';

export default function ViewNavBar() {
  const [view, setView] = useState('/dashboard')
  const company = useSelector(state => state.company.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=> {
    navigate(`${view}`)
  }, [view])

  const handleSelect = (e) => {
    setView(e.target.value);
  };

  const handleClick = () => {
    fetch('/logout', {
      method: 'DELETE',
    });
    
    dispatch(logout()); 
    
    navigate('/login'); 
  };

  return (
    <div className='viewNavContainer' >
      <img src={company ? company.logo : "Loading..."} alt="Company logo" />
      <label>Select View
        <select onChange={handleSelect} value={view}>
          <option value='/dashboard' >Dashboard</option>
          <option value='/projects' >Projects</option>
          <option value='/subcontractors' >Subcontractors</option>
        </select>
      </label>

      <button onClick={handleClick} >Log Out</button>

    </div>
  )
}
