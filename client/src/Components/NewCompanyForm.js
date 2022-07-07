import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { created } from '../Redux/Reducers/register';

export default function NewCompanyForm() {
  const [errors, setErrors] = useState();
  const [newCompayForm, setNewCompanyForm] = useState({
    name: '',
    city: '',
    state: '',
    address: '',
  });

  const dispatch = useDispatch();

  const { name, city, state, address } = newCompayForm;


  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setNewCompanyForm({
      ...newCompayForm,
      [key]: value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/companies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCompayForm),
    })
    .then( r => {
      if(r.ok){
        r.json().then( company => console.log(company));

        setNewCompanyForm({
          name: '',
          city: '',
          state: '',
          address: '',
        });

        dispatch(created())
        
      } else r.json().then(json=>setErrors(json.error));
    })

  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='box' >
        <h1>Company Registration</h1>

        <input 
          type='text' 
          name='name' 
          onChange={handleChange} 
          value={name} 
          placeholder='Company Name' />

        <input 
          type='text' 
          name='address' 
          onChange={handleChange} 
          value={address} 
          placeholder='Address' />

        <input 
          type='text' 
          name='city' 
          onChange={handleChange} 
          value={city} 
          placeholder='City' />

        <input 
          type='text' 
          name='state' 
          onChange={handleChange} 
          value={state}
          placeholder='State' />
        
        <input type='submit' name='submit' />

        {errors ? errors.map(e => <h5 style={{color: 'orange'}}>{e}</h5> ): null}

        <Link style={{color: '#00BFFF'}} to='/login'>Log in to existing account</Link>   

      </form>
    </div>
  )
}