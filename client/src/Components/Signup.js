import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../Redux/Reducers/user';
import { finished } from '../Redux/Reducers/register';

export default function Signup() {
  const company = useSelector(state => state.company.company);

  const [errors, setErrors] = useState();
  const [signUpForm, setSignUpForm] = useState({
    first_name: '',
    last_name: '',
    role: 'Executive',
    admin: true,
    email: '',
    password: '',
    password_confirmation: ''
  });

console.log(company?.id)
 

  const { first_name, last_name, email, password, password_confirmation } = signUpForm;

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setSignUpForm({
      ...signUpForm,
      [key]: value,
      company_id: company?.id
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signUpForm),
    })
    .then( r => {
      if(r.ok){
        r.json().then( user => {
          dispatch(login(user))
        });

        dispatch(finished());

        setSignUpForm({
          first_name: '',
          last_name: '',
          role: 'Executive',
          admin: true,
          email: '',
          password: '',
          password_confirmation: ''
        });

        navigate('/dashboard');
        
      } else r.json().then(json=>setErrors(json.error));
    })
  };

  return (
    <div>
      <div className='login'>
        <h1>Genesis Project Estimator</h1> 
      </div>
      <form onSubmit={handleSubmit} className='box' >
        <h1>SIGN UP</h1>

        <input 
          type='text' 
          name='first_name' 
          onChange={handleChange} 
          value={first_name} 
          placeholder='First Name' />

        <input 
          type='text' 
          name='last_name' 
          onChange={handleChange} 
          value={last_name} 
          placeholder='Last Name' />

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
          placeholder='Enter password' />

        <input 
          type='password' 
          name='password_confirmation' 
          onChange={handleChange} 
          value={password_confirmation}
          placeholder='Confirm password' />
        
        <input type='submit' name='submit' />

        {errors ? errors.map(e => <h5 style={{color: 'orange'}}>{e}</h5> ): null}

      </form>
    </div>
  )
}
