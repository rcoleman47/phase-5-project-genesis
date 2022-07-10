import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProject, editProject, setCurrentProject, setProjectId } from '../Redux/Reducers/projects';

export default function NewProjectForm() {
  const company = useSelector(state => state.company.value);

  const [error, setError] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    location: '',
    phase: 'Pre-Construction',
    sector: 'Restaurant',
    classification: 'New Construction',
    size: '',
    company_id: company.id,
  });

  const {title, location, phase, sector, classification, size} = projectForm

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    let key   = e.target.name;
    let value = e.target.value;
  
    setProjectForm({
      ...projectForm,
      [key]: value
    });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/projects`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(projectForm)
    })
    .then(r=>{
      if(r.ok){ 
        r.json().then(project => {
          dispatch(addProject(project))
          dispatch(setCurrentProject(project));
          dispatch(setProjectId(project.id));
        });

        setError(null);
        dispatch(editProject(false));
        navigate('/project/estimate')
      }
      else
        r.json().then(json=>setError(json.error));
    });

  };


  return (
    <div className='project-form-container'>
         
      <form className='new-project-form' onSubmit={handleSubmit} >

        <label style={{fontWeight: '600'}}>
          Title:
          <input 
            name='title'
            type='text' 
            value={title} 
            onChange={handleChange}
            />
        </label>

        <label style={{fontWeight: '600'}}>
          Location:
          <input 
            name='location'
            type='text' 
            value={location} 
            onChange={handleChange} 
          />
        </label>

        <label style={{fontWeight: '600'}}>
          Phase:
          <select 
            name='phase'
            type='text' 
            value={phase} 
            onChange={handleChange}>
              <option value={'Pre-Construction'}>Pre-Construction</option>
              <option value={'Construction'}>Construction</option>
              <option value={'Complete'}>Complete</option>
            </select>
        </label>

        <label style={{fontWeight: '600'}}>
          Sector:
          <select 
            name='sector'
            type='text' 
            value={sector} 
            onChange={handleChange}>
              <option value={'Restaurant'}>Restaurant</option>
              <option value={'Medical'}>Medical</option>
              <option value={'Office'}>Office</option>
              <option value={'School'}>School</option>
              <option value={'Multi-Family'}>Multi-Family</option>
              <option value={'Residential'}>Residential</option>
            </select>
        </label>

        <label style={{fontWeight: '600'}}>
          Classification:
          <select 
            name='classification'
            type='text' 
            value={classification} 
            onChange={handleChange}>
              <option value={'New Construction'}>New Construction</option>
              <option value={'Remodel'}>Remodel</option>
              <option value={'Interior Renovation'}>Interior Renovation</option>
              <option value={'Exterior Renovation'}>Exterior Renovation</option>
            </select>
        </label>

        <label style={{fontWeight: '600'}}>
          Size:
          <input 
            name='size'
            type='number' 
            value={size} 
            onChange={handleChange} 
          />
        </label>

        {error ? <h5>{error}</h5> : null}

        <input type="submit" value="Create" />

      </form>
      
    </div>
  )
}
