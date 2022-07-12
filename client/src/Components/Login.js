import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setProjectId, setProjects } from '../Redux/Reducers/projects';
import { login } from '../Redux/Reducers/user';
import { mount } from '../Redux/Reducers/company';
import { finished } from '../Redux/Reducers/register';


export default function Login() {
  const [error, setError] = useState();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password } = loginForm;

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setLoginForm({
      ...loginForm,
      [key]: value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm),
    })
    .then( r => {
      if(r.ok){
        r.json().then( user => {
          dispatch(login(user))
          dispatch(mount(user.company))
          dispatch(setProjects(user.projects))
        });

        setLoginForm({
          email: '',
          password: '',
        });
      } else r.json().then(json=>setError(json.error));
    });
    
    navigate('/dashboard');

  };

  const handleClick = () => { 
    dispatch(finished())
  }

  return (
    <div>
      <form className='box' onSubmit={handleSubmit} >
        <h1>LOG IN</h1>
         
        <input 
          type='text' 
          name='email' 
          onChange={handleChange} 
          value={email} 
          placeholder='Email address' />

        <input 
          type='password' 
          name='password' 
          onChange={handleChange} 
          value={password} 
          placeholder='Password' />

        <input type='submit' name='submit' />

        {error ? <h5 style={{color: 'orange'}}>{error}</h5> : null}

        <Link onClick={handleClick} style={{color: '#00BFFF'}} to='/register'>New company registration</Link>        
      </form>
    </div>
  )
}
