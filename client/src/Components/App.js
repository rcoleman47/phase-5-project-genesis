import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/Reducers/user';
import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import Dashboard from './Dashboard';
import ProjectContainer from './ProjectContainer';
import ProjectEstimate from './ProjectEstimate';
import Directory from './Directory';
import NewProjectForm from './NewProjectForm';
import ProjectEdit from './ProjectEdit';
import DirectoryContainer from './DirectoryContainer';
import SubDirectory from './SubDirectory';
import SubAddContact from './SubAddContact';
import ProjectDetails from './ProjectDetails';

import '../App.css';


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/authorized_user')
    .then(r => {
      if (r.ok){
        r.json().then(user => {
          dispatch(login(user))
          navigate('/dashboard')
        })
      }
      else {
        r.json().then(json=>console.log(json.error));
        navigate('/login');
    };
    });
    
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Registration /> } />
        
        <Route path='/' element={ <Home /> } >
          <Route path='/dashboard' element={ <Dashboard /> } />

          <Route path='/project' element={ <ProjectContainer /> } >
            <Route path='estimate' element={ <ProjectEstimate /> } />
            <Route path='edit' element={ <ProjectEdit /> } />
            <Route path='new' element={ <NewProjectForm /> } /> 
            <Route path='details' element={ <ProjectDetails /> } />
          </Route>

          <Route path='directory' element={ <DirectoryContainer /> } >
            <Route path='company' element={ <Directory /> } />
            <Route path='subcontractors' element={ <SubDirectory /> } />
          </Route>
            <Route path='/directory/subcontractor/edit' element={ <SubAddContact /> } />

        </Route>
      </Routes>
    </>
  );
}

export default App;
