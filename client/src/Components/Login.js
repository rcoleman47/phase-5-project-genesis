import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { login } from '../Redux/Reducers/user';
import { finished } from '../Redux/Reducers/register';


export default function Login() {
  const [error, setError]         = useState();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const dispatch            = useDispatch();
  const navigate            = useNavigate();

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

    fetch('http://127.0.0.1:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm),
    })
    .then( r => {
      if(r.ok){
        r.json().then( user => {
          dispatch(login(user))
        });

        setLoginForm({
          email: '',
          password: '',
        });

        navigate('/dashboard');

      } else r.json().then(json=>setError(json.error));
    });
  };

  const handleClick = () => { 
    dispatch(finished())
  }

  return (
    <div >
      <div className='login'>
        <h1>Genesis Project Estimator</h1> 
      </div>
        <form className='box' onSubmit={handleSubmit} >
          <h2>LOG IN</h2>
          
          <input 
            type='text' 
            name='email' 
            onChange={handleChange}
            autoComplete='off' 
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
