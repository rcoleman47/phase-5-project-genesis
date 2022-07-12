import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProject, setCurrentProject, setProjectId } from '../Redux/Reducers/projects';
import { setProjectView } from '../Redux/Reducers/view';

export default function NewProjectForm() {
  const company = useSelector(state => state.company.company);
  const currentProject = useSelector(state => state.projects.currentProject);

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

  const {title, location, phase, sector, classification, size} = projectForm;

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

  const handlePostSubmit = (e) => {
    e.preventDefault();

    fetch(`/projects`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(projectForm)
    })
    .then(r=>{
      if(r.ok){ 
        r.json().then(project => {
          dispatch(setCurrentProject(project));
          dispatch(addProject(project))
          dispatch(setProjectId(project.id));
        });
        setError(null);

        dispatch(setProjectView('/project/estimate'));  

        navigate('/project/estimate')
      }
      else
        r.json().then(json=>setError(json.error));
    });
  };

  return (
    <div className='project-form-container'>
         
      <form className='new-project-form' onSubmit={handlePostSubmit} style={{marginTop: '50px'}}>

        <label style={{fontWeight: '800'}}>
          Title:
          <input 
            name='title'
            type='text' 
            value={title} 
            onChange={handleChange}
            />
        </label>

        <label style={{fontWeight: '800'}}>
          Location:
          <input 
            name='location'
            type='text' 
            value={location} 
            onChange={handleChange} 
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
        {error ? error.map(e => <h5 style={{color: 'orange', display: 'block'}}>{e}</h5>): null}

        <input type="submit" value="Create" />

      </form>
      
    </div>
  )
}
