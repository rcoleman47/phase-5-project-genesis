import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [errors, setErrors] = useState();
  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const { name, email, password, password_confirmation } = signUpForm;


  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setSignUpForm({
      ...signUpForm,
      [key]: value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='box' >
        <h1>SIGN UP</h1>

        <input 
          type='text' 
          name='name' 
          onChange={handleChange} 
          value={name} 
          placeholder='Full Name' />

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

        {errors ? <h5 style={{color: 'orange'}}>{errors}</h5> : null}

        <Link style={{color: '#00BFFF'}} to='/login'>Log in to existing account</Link>   

      </form>
    </div>
  )
}
