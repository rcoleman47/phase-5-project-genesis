import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProject, updateProject } from '../Redux/Reducers/projects';

export default function EditProjectForm({projectId}) { 
  const projects = useSelector(state => state.projects.allProjects);

  const currentProject = projects?.slice().filter(project => project.id === parseInt(projectId))

  const [error, setError] = useState(null);
  const [projectForm, setProjectForm] = useState({
    location: currentProject[0]?.location,
    phase: currentProject[0]?.phase,
    sector: currentProject[0]?.sector,
    classification: currentProject[0]?.classification,
    size: currentProject[0]?.size,
    tax_rate: currentProject[0]?.tax_rate,
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

    fetch(`/projects/${currentProject[0].id}`, {
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

        <label style={{fontWeight: '600'}}>
          Title:
          <input 
            name='title'
            type='text' 
            value={currentProject[0]?.title} 
            readOnly
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

        <label style={{fontWeight: '600'}}>
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
