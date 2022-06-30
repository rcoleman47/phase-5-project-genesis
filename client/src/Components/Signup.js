import { useState } from 'react';

export default function Signup() {
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

  return (
    <div>
      <form className='box' >
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

      </form>
    </div>
  )
}
