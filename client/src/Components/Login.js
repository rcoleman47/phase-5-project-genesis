import { useState } from 'react';

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginForm;


  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setLoginForm({
      ...loginForm,
      [key]: value
    })
  };

  console.log(loginForm);

  return (
    <div>
      <form className='box' >
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

      </form>
    </div>
  )
}
