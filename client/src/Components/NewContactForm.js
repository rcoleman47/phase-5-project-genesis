import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../Redux/Reducers/subcontractors';


export default function NewContactForm() {
  const subcontractor = useSelector(state => state.subs.currentSub)

  const [error, setError] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    cell_number: '',
    email: '',
    role: 'Executive',
    subcontractor_id: subcontractor?.id,
  });
  console.log(contactForm)

  const {name, cell_number, email, role} = contactForm;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    let key   = e.target.name;
    let value = e.target.value;
  
    setContactForm({
      ...contactForm,
      [key]: value
    });
    
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    fetch(`/contacts`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(contactForm)
    })
    .then(r=>{
      if(r.ok){ 
        r.json().then(contact => {
          dispatch(addContact(contact));
        });

        setContactForm({
          name: '',
          cell_number: '',
          email: '',
          role: 'Executive',
          subcontractor_id: subcontractor?.id,
        });
      
        setError(null);
      }
      else
        r.json().then(json=>setError(json.error));
    });

  };

  return (
    <div className='project-form-container'>
         
      <form className='new-project-form' onSubmit={handlePostSubmit} >

        <label style={{fontWeight: '800'}}>
          Name:
          <input  
            name='name'
            type='text' 
            value={name} 
            onChange={handleChange}
            />
        </label>

        <label style={{fontWeight: '800'}}>
          Cell Number:
          <input  
            name='cell_number'
            type='text' 
            value={cell_number} 
            onChange={handleChange} 
          />
        </label>

        <label style={{fontWeight: '800'}}>
          Email:
          <input  
            name='email'
            type='text' 
            value={email} 
            onChange={handleChange}/>
        </label>

        <label style={{display: 'block', width: '100px', fontWeight: '800'}}>
          Role:
          <select 
            style={{width: '135px', marginRight: '20px'}}
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

        {error ? error.map(e => <h5 style={{color: 'orange', display: 'block'}}>{e}</h5>): null}

        <input style={{marginLeft: '60px'}} type="submit" value="Create" />

      </form>
      
    </div>
  )
}