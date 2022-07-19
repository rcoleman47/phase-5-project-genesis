import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProject, updateProject } from '../Redux/Reducers/projects';

export default function EditProjectForm() { 
  const currentProject    = useSelector(state => state.projects.currentProject);
  
  const [error, setError] = useState(null);
  const [projectForm, setProjectForm] = useState({
    location:       currentProject?.location,
    phase:          currentProject?.phase,
    sector:         currentProject?.sector,
    classification: currentProject?.classification,
    size:           currentProject?.size,
    tax_rate:       currentProject?.tax_rate,
  });

  const {location, phase, sector, classification, size, tax_rate} = projectForm;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    let key   = e.target.name;
    let value = e.target.value;
  
    setProjectForm({
      ...projectForm,
      [key]: value
    });
    
  };

  const handlePatchSubmit = (e) => {
    e.preventDefault();

    fetch(`/projects/${currentProject.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(projectForm)
    })
    .then(r=>{
      if(r.ok){ 
        r.json().then(project => {
          dispatch(updateProject((project)))
          dispatch(setCurrentProject(project))
        });

        setError(null);
      }
      else
        r.json().then(json=>setError(json.error));
    });

  };


  return (
    <div className='project-form-container'>
         
      <form className='new-project-form' onSubmit={handlePatchSubmit} >

        <label style={{fontWeight: '800'}}>
          Title:
          <input 
            name='title'
            type='text' 
            value={currentProject?.title} 
            readOnly
            />
        </label>

        <label style={{fontWeight: '800'}}>
          Location:
          <input 
            name='location'
            type='text' 
            value={location} 
            onChange={handleChange}
            autoComplete='off'  
          />
        </label>

        <label style={{fontWeight: '800'}}>
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

        <label style={{fontWeight: '800'}}>
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

        <label style={{fontWeight: '800'}}>
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

        <label style={{fontWeight: '800'}}>
          Size:
          <input 
            name='size'
            type='number' 
            value={size} 
            onChange={handleChange} 
          />
        </label>

        <label style={{fontWeight: '800'}}>
          Tax Rate:
          <input 
            name='tax_rate'
            type='text' 
            value={tax_rate} 
            onChange={handleChange} 
          />
        </label>

        {error ? <h5>{error}</h5> : null}

        <input type="submit" value="Update" />

      </form>
      
    </div>
  )
}
