import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSub, setCurrentSub } from '../Redux/Reducers/subcontractors';
import { setDirectoryView } from '../Redux/Reducers/view';


export default function NewSubForm({setAddSub}) {
  const company = useSelector(state => state.company.company);

  const [error, setError] = useState(null);
  const [subForm, setSubForm] = useState({
    name: '',
    address: '',
    phone_number: '',
    trade: '',
    company_id: company?.id,
  });

  const {name, address, phone_number, trade} = subForm;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    let key   = e.target.name;
    let value = e.target.value;
  
    setSubForm({
      ...subForm,
      [key]: value
    });
    
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    fetch(`/subcontractors`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(subForm)
    })
    .then(r=>{
      if(r.ok){ 
        r.json().then(sub => {
          dispatch(addSub(sub));
          dispatch(setCurrentSub(sub));
        });

        setAddSub(true)
        dispatch(setDirectoryView('/directory/subcontractor/edit'))
        setError(null);
      }
      else
      r.json().then(json=>setError(json.error));
    });
    navigate('/directory/subcontractor/edit')

  };

  return (
    <div className='project-form-container'>
         
      <form className='new-project-form' onSubmit={handlePostSubmit} >

        <label style={{fontWeight: '600'}}>
          Sub Name:
          <input  
            name='name'
            type='text' 
            value={name} 
            onChange={handleChange}
            />
        </label>

        <label style={{fontWeight: '600'}}>
          Address:
          <input  
            name='address'
            type='text' 
            value={address} 
            onChange={handleChange} 
          />
        </label>

        <label style={{fontWeight: '600'}}>
          Phone Number:
          <input  
            name='phone_number'
            type='text' 
            value={phone_number} 
            onChange={handleChange}/>
        </label>

        <label style={{fontWeight: '600'}}>
          Trade:
          <input  
            name='trade'
            type='text' 
            value={trade} 
            onChange={handleChange}/>
        </label>

        {error ? error.map(e => <h5 style={{color: 'orange', display: 'block'}}>{e}</h5>): null}

        <input type="submit" value="Create" />

      </form>
      
    </div>
  )
}