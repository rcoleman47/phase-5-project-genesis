import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { login } from '../Redux/Reducers/user';
import { mount } from '../Redux/Reducers/company';
import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import '../App.css'


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/authorized_user')
    .then(r => {
      if (r.ok){
        r.json().then(user => dispatch(login(user)))
      }
      else navigate('/login');
    });

    fetch('/user_company')
    .then(r => {
      if (r.ok){
        r.json().then(company => dispatch(mount(company)))
      }
    });

  }, []);

  return (
    <div className="App">
      <Routes>

        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Registration /> } />
        <Route path='/home' element={ <Home /> } />

      </Routes>
    </div>
  );
}

export default App;
