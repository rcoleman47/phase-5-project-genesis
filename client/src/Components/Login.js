import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../Redux/Reducers/user';

export default function Login() {
  const [error, setError] = useState();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginForm;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector( state => state.user.value);


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
        r.json().then( user => dispatch(login(user)));

        setLoginForm({
          email: '',
          password: '',
        });

        navigate('/home')
        console.log(user)
      } else r.json().then(json=>setError(json.error));
    })
  };

  console.log(loginForm);

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

        <Link style={{color: '#00BFFF'}} to='/signup'>Create new account</Link>        
      </form>
    </div>
  )
}
