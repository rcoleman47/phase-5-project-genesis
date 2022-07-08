import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/Reducers/user';
import { setProjects, setCurrentProject } from '../Redux/Reducers/projects';



export default function Home() {
  const company = useSelector(state => state.company.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/projects')
    .then(r => r.json())
    .then(projects => {
      dispatch(setProjects(projects))
      // dispatch(setCurrentProject(projects[0]))
    })
  }, [])

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
    <div className='pageContainer'>
      <div className='viewNavContainer' >
      <img src={company ? company.logo : "Loading..."} alt="Company logo" />
      <NavLink style={navStyle} to='/dashboard'>Dashboard</NavLink>
      <NavLink style={navStyle} to='/projects'>Projects</NavLink>
      <NavLink style={navStyle} to='/subcontractors'>Subcontractors</NavLink>

      <button onClick={handleClick} >Log Out</button>
    </div>
      <Outlet />
    </div>
  )
}
