import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setProjectId, editProject } from '../Redux/Reducers/projects';
import { setDirectoryView, setProjectView } from '../Redux/Reducers/view';


export default function NotFound() {
  const user        = useSelector(state => state.user.value);
  const projects    = useSelector(state => state.projects.allProjects);
  
  const dispatch    = useDispatch();

  const handleClick = (e) => {
    dispatch(setProjectId([...projects]?.sort((a, b) => a.title.localeCompare(b.title))?.[0]?.id));
    dispatch(editProject(true));
    dispatch(setProjectView(('/project/estimate')));
    dispatch(setDirectoryView('/directory/company'));
  };

  const navStyle = ({isActive})=>({
    color: isActive ? '#ff8c00' : 'black',
    marginTop:        '30px',
    fontWeight:       '900',
    marginRight:      '300px'
  });


  return (
    <div className='pageContainer'>
    <div className='viewNavContainer'>
    <img src={user?.company_logo ? user?.company_logo : "https://www.liblogo.com/img-logo/ge1067gea0-genesis-logo-genesis-logo-download-vector.png"} alt="Company logo" />
    <NavLink style={navStyle} onClick={handleClick} to='/dashboard'>Dashboard</NavLink>
    <NavLink style={navStyle} onClick={handleClick} to='/project'>Projects</NavLink>
    <NavLink style={navStyle} onClick={handleClick} to='/directory'>Directory</NavLink>
   
    </div>
    <div className='not-found-container'>
        <h1>Genesis Project Estimator</h1> 
        <h2>Whoops! Page Not Found!</h2>
    </div>
  
  </div>

  )
}
