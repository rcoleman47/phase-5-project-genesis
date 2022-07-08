import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { logout } from '../Redux/Reducers/user';

export default function ViewNavBar() {
  const company = useSelector(state => state.company.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navStyle = ({isActive})=>({
    color: isActive ? "#ff8c00":"black",
    marginTop: '30px',
    fontWeight: '900',
  });

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
      <NavLink style={navStyle} to='/dashboard'>Dashboard</NavLink>
      <NavLink style={navStyle} to='/projects'>Projects</NavLink>
      <NavLink style={navStyle} to='/subcontractors'>Subcontractors</NavLink>

      <button onClick={handleClick} >Log Out</button>
    </div>
  )
}
