import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/Reducers/user';
import { mount } from '../Redux/Reducers/company';
import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import Dashboard from './Dashboard';
import ProjectContainer from './ProjectContainer';
import ProjectEstimate from './ProjectEstimate';
import Directory from './Directory';
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
          dispatch(mount(user.company))
        })
      }
      else {
        r.json().then(json=>console.log(json.error));
        navigate('/login');
    };
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Registration /> } />
        
        <Route index='/' element={ <Home /> } >
          <Route path='/dashboard' element={ <Dashboard /> } />
          <Route path='/project' element={ <ProjectContainer /> } >
            <Route path='estimate' element={ <ProjectEstimate /> } />
            
          </Route>
          <Route path='directory' element={ <Directory /> } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
