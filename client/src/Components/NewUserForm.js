import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../Redux/Reducers/company';


export default function NewUserForm({setAddUser}) {
  const company = useSelector(state => state.company.company);

  const [error, setError] = useState(null);
  const [userForm, setUserForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    cell_number: '',
    role: 'Project Manager',
    admin: false,
    company_id: company?.[0].id,
  });

  const {first_name, last_name, email, password, cell_number, role, admin} = userForm;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    let key   = e.target.name;
    let value = e.target.value;
  
    setUserForm({
      ...userForm,
      [key]: value
    });
    
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    fetch(`/users`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userForm)
    })
    .then(r=>{
      if(r.ok){ 
        r.json().then(user => {
          console.log(user)
          dispatch(addUser(user));
        });

        setAddUser(true)
        setError(null);
      }
      else
        r.json().then(json=>setError(json.error));
    });

  };

  return (
    <div className='user-container'>
         
      <form className='user-form' onSubmit={handlePostSubmit} >

        <label style={{display: 'block', width: '100px', fontWeight: '600'}}>
          First Name:
          <input 
            name='first_name'
            type='text' 
            value={first_name} 
            onChange={handleChange}
            />
        </label>

        <label style={{display: 'block', width: '100px', fontWeight: '600'}}>
          Last Name:
          <input 
            name='last_name'
            type='text' 
            value={last_name} 
            onChange={handleChange} 
          />
        </label>

        <label style={{display: 'block', width: '100px', fontWeight: '600'}}>
          Email:
          <input 
            name='email'
            type='text' 
            value={email} 
            onChange={handleChange}/>
        </label>

        <label style={{display: 'block', width: '100px', fontWeight: '600'}}>
          Password:
          <input 
            name='password'
            type='text' 
            value={password} 
            onChange={handleChange}/>
        </label>

        <label style={{display: 'block', width: '100px', fontWeight: '600'}}>
          Cell Number:
          <input 
            name='cell_number'
            type='text' 
            value={cell_number} 
            onChange={handleChange}/>
        </label>

        <label style={{display: 'block', width: '100px', fontWeight: '600'}}>
          Role:
          <select 
            style={{width: '135px', marginLeft: '0px'}}
            name='role'
            type='text' 
            value={role} 
            onChange={handleChange}>
              <option value={'Executive'}>Executive</option>
              <option value={'Project Manager'}>Project Manager</option>
              <option value={'Estimator'}>Estimator</option>
              <option value={'Superintendent'}>Superintendent</option>
            </select>
        </label>

        <label style={{display: 'block', width: '100px', fontWeight: '600'}}>
          Admin:
          <select 
            style={{width: '135px', marginLeft: '0px'}}
            name='admin'
            type='text' 
            value={admin} 
            onChange={handleChange}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
        </label>

        {error ? error.map(e => <h5 style={{color: 'orange', display: 'block'}}>{e}</h5>): null}

        <input type="submit" value="Create" />

      </form>
      
    </div>
  )
}