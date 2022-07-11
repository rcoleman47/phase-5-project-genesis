import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/Reducers/user';
import { setProjects, removeCurrentProject, setProjectId, editProject } from '../Redux/Reducers/projects';
import { getCodes } from '../Redux/Reducers/costcodes';
import { mount, setUsers } from '../Redux/Reducers/company';
import { setSubs } from '../Redux/Reducers/subcontractors';



export default function Home() {
  const user = useSelector(state => state.user.value);
  const projects = useSelector(state => state.projects.allProjects);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user)

  useEffect(() => {
    fetch('/projects')
    .then(r => r.json())
    .then(projects => {
      dispatch(setProjects(projects))
    })
  }, []);

  useEffect(() => {
    fetch(`/companies/${user?.company_id}`)
    .then(r => r.json())
    .then(company => {
      dispatch(mount(company))
      dispatch(setUsers(company?.users))
    })
  }, []);

  useEffect(() => {
    fetch('/subcontractors')
    .then(r => r.json())
    .then(subs => {
      dispatch(setSubs(subs))
    })
  }, []);

  useEffect(() => {
    fetch('/divisions')
    .then(r => r.json())
    .then(codes => {
      dispatch(getCodes(codes))
    })
  }, []);
  

  const navStyle = ({isActive})=>({
    color: isActive ? "#ff8c00":"black",
    marginTop: '30px',
    fontWeight: '900',
  });

  const handleClick = () => {
    dispatch(setProjectId(projects?.[0]?.id));
    dispatch(editProject(true));
  };

  const handleLogOut= () => {
    fetch('/logout', {
      method: 'DELETE',
    });
    
    dispatch(logout()); 
    dispatch(removeCurrentProject());
    dispatch(setProjects(undefined));
    dispatch(mount(undefined));
    dispatch(setUsers(undefined));
    dispatch(setSubs(undefined));
    
    navigate('/login'); 
  };

  return (
    <div className='pageContainer'>
      <div className='viewNavContainer' >
      <img src={user ? user?.company_logo : "Loading..."} alt="Company logo" />
      <NavLink style={navStyle} onClick={handleClick} to='/dashboard'>Dashboard</NavLink>
      <NavLink style={navStyle} onClick={handleClick} to='/project'>Projects</NavLink>
      <NavLink style={navStyle} onClick={handleClick} to='/directory/company'>Directory</NavLink>
     
      <button style={{display: 'inline'}} onClick={handleLogOut} >Log Out</button>
      </div>
      <Outlet />
    </div>
  )
}
