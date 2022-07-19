import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { created } from '../Redux/Reducers/register';
import { mount } from '../Redux/Reducers/company';

export default function NewCompanyForm() {
  const [errors, setErrors]                = useState();
  const [newCompayForm, setNewCompanyForm] = useState({
    name:         '',
    city:         '',
    state:        '',
    address:      '',
    phone_number: '',
    logo:         ''
  });

  const dispatch = useDispatch();

  const { name, city, state, address, phone_number, logo } = newCompayForm;


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

    fetch('genesis-estimator.herokuapp.com/companies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCompayForm),
    })
    .then( r => {
      if(r.ok){
        r.json().then( company => dispatch(mount(company)));

        setNewCompanyForm({
          name:         '',
          city:         '',
          state:        '',
          address:      '',
          phone_number: '',
        });

        dispatch(created())
        
      } else r.json().then(json=>setErrors(json.error));
    })

  };

  return (
    <div>
       <div className='login'>
        <h1>Genesis Project Estimator</h1> 
      </div>
      <form onSubmit={handleSubmit} className='box' >
        <h1>Company Registration</h1>

        <input 
          type='text' 
          name='name' 
          onChange={handleChange} 
          value={name} 
          autoComplete='off' 
          placeholder='Company Name' />

        <input 
          type='text' 
          name='address' 
          onChange={handleChange} 
          value={address} 
          autoComplete='off' 
          placeholder='Address' />

        <input 
          type='text' 
          name='city' 
          onChange={handleChange} 
          value={city} 
          autoComplete='off' 
          placeholder='City' />

        <input 
          type='text' 
          name='state' 
          onChange={handleChange} 
          value={state}
          autoComplete='off' 
          placeholder='State' />

        <input 
          type='text' 
          name='phone_number' 
          onChange={handleChange} 
          value={phone_number}
          autoComplete='off' 
          placeholder='Phone Number' />

        <input 
          type='text' 
          name='logo' 
          onChange={handleChange} 
          value={logo}
          placeholder='Image URL' />
        
        <input type='submit' name='submit' />

       

          {errors ? errors.map(e => <h5 style={{color: 'orange', marginBottom: '1px', marginTop: '1px'}}>{e}</h5> ): null}
        <Link style={{color: '#00BFFF'}} to='/login'>Log in to existing account</Link>   

      </form>
    </div>
  )
}