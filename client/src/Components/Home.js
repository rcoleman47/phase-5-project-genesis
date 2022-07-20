import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/Reducers/user';
import { setProjects, removeCurrentProject, setProjectId, editProject } from '../Redux/Reducers/projects';
import { getCodes } from '../Redux/Reducers/costcodes';
import { mount, setUsers } from '../Redux/Reducers/company';
import { setSubs } from '../Redux/Reducers/subcontractors';
import { setDirectoryView, setProjectView } from '../Redux/Reducers/view';



export default function Home() {
  const user     = useSelector(state => state.user.value);
  const projects = useSelector(state => state.projects.allProjects);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:3000/projects')
    .then(r => r.json())
    .then(projects => {
      dispatch(setProjects(projects))
    })
  }, [dispatch]);

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/companies/${user?.company_id}`)
    .then(r => r.json())
    .then(company => {
      dispatch(mount(company))
      dispatch(setUsers(company?.users))
    })
  }, [dispatch, user?.company_id]);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/subcontractors')
    .then(r => r.json())
    .then(subs => {
      dispatch(setSubs(subs))
    })
  }, [dispatch]);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/divisions')
    .then(r => r.json())
    .then(codes => {
      dispatch(getCodes(codes))
    })
  }, [dispatch]);
  

  const navStyle = ({isActive})=>({
    color: isActive ? "#ff8c00":"black",
    marginTop: '30px',
    fontWeight: '900',
    marginRight: '100px'
  });

  const handleClick = (e) => {
    dispatch(setProjectId([...projects]?.sort((a, b) => a.title.localeCompare(b.title))?.[0]?.id));
    dispatch(editProject(true));
    dispatch(setProjectView(('/project/estimate')))
    dispatch(setDirectoryView('/directory/company'))
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
      <img src={user?.company_logo ? user?.company_logo : "https://www.liblogo.com/img-logo/ge1067gea0-genesis-logo-genesis-logo-download-vector.png"} alt="Company logo" />
      <NavLink style={navStyle} onClick={handleClick} to='/dashboard'>Dashboard</NavLink>
      <NavLink style={navStyle} onClick={handleClick} to='/project'>Projects</NavLink>
      <NavLink style={navStyle} onClick={handleClick} to='/directory'>Directory</NavLink>
     
      <button style={{display: 'inline', marginRight: '50px'}} onClick={handleLogOut} >Log Out</button>
      </div>
      <Outlet />
    </div>
  )
}
