import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setCurrentProject } from '../Redux/Reducers/projects';
import EstimateTable from './EstimateTable';
import EstimateForm from './EstimateForm';


export default function ProjectEstimate() {
  const projects = useSelector(state => state.projects.allProjects);

  const [projectId, setProjectId] = useState(projects?.[0]?.id);
  const [view, setView] = useOutletContext();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setProjectId(JSON.parse(window.localStorage.getItem('projectId')));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('projectId', projectId);
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      fetch(`/projects/${projectId}`)
      .then(r => r.json())
      .then(project => dispatch(setCurrentProject(project)));
    }
  }, [projectId])

  const renderOptions = projects?.length > 0 ? projects?.map(project => <option key={project.id} value={project.id}>{project.title}</option> ) : <option>No Current Projects</option>;

  const handleSelect = (e) => {
    setProjectId(e.target.value)
  };

  const buttonText = view ? 'Edit Project' : 'Done Editing';

  const handleClick = () => {
    setView(view => !view)
  };

  return (
    <>
      <div className={view ? '' :'estimate-form-view'}>
        <select onChange={handleSelect} value={projectId}  >
          {renderOptions}
        </select>

        <button onClick={handleClick} >{buttonText}</button>
      </div>
      {view ? <EstimateTable projects={projects} /> : <EstimateForm />}
    </>
  )
}
