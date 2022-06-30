import { useState } from 'react';

export default function Signup() {
  const [loginForm, setLoginForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const { name, email, password, password_confirmation } = loginForm;


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
        <h1>SIGN UP</h1>

        <label>
          Name:
          <input type='text' name='name' onChange={handleChange} value={name} />
        </label>

        <label>
          Email:
          <input type='text' name='email' onChange={handleChange} value={email} />
        </label>

        <label>
          Password:
          <input type='password' name='password' onChange={handleChange} value={password} />
        </label>

        <label>
          Password Confirmation:
          <input type='password' name='password_confirmation' onChange={handleChange} value={password_confirmation} />
        </label>

        <input type='submit' name='submit' />

      </form>
    </div>
  )
}
