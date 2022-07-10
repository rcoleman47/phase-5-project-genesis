import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/Reducers/user';
import { setProjects, removeCurrentProject, setProjectId, editProject } from '../Redux/Reducers/projects';
import { getCodes } from '../Redux/Reducers/costcodes';



export default function Home() {
  const company = useSelector(state => state.company.value);
  const projects = useSelector(state => state.projects.allProjects);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/projects')
    .then(r => r.json())
    .then(projects => {
      dispatch(setProjects(projects))
    })
  }, [])

  useEffect(() => {
    fetch('/divisions')
    .then(r => r.json())
    .then(codes => {
      dispatch(getCodes(codes))
    })
  }, [])

  const navStyle = ({isActive})=>({
    color: isActive ? "#ff8c00":"black",
    marginTop: '30px',
    fontWeight: '900',
  });

  const handleClick = () => {
    dispatch(setProjectId(projects?.[0].id));
    dispatch(editProject(true));
  };

  const handleLogOut= () => {
    fetch('/logout', {
      method: 'DELETE',
    });
    
    dispatch(logout()); 

    dispatch(removeCurrentProject());
    
    navigate('/login'); 
  };

  return (
    <div className='pageContainer'>
      <div className='viewNavContainer' >
      <img src={company ? company.logo : "Loading..."} alt="Company logo" />
      <NavLink style={navStyle} onClick={handleClick} to='/dashboard'>Dashboard</NavLink>
      <NavLink style={navStyle} onClick={handleClick} to='/project/estimate'>Projects</NavLink>
      <NavLink style={navStyle} onClick={handleClick} to='/directory'>Directory</NavLink>
      
      <button onClick={handleLogOut} >Log Out</button>
      </div>
      <Outlet />
    </div>
  )
}
