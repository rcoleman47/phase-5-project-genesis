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
        <h1>LOGIN</h1>
        <label>
          Email:
          <input type='text' name='email' onChange={handleChange} value={email} />
        </label>

        <label>
          Password:
          <input type='password' name='password' onChange={handleChange} value={password} />
        </label>
        <input type='submit' name='submit' />

      </form>
    </div>
  )
}
