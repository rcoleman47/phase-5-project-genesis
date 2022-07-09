import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { setCurrentProject } from '../Redux/Reducers/projects';
import { useEffect } from 'react';
import EstimateTable from './EstimateTable';


export default function ProjectEstimate() {
  const projects = useSelector(state => state.projects.allProjects);

  const [projectId, setProjectId] = useState(projects?.[0]?.id);

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

  const handleClick = () => {
    navigate('/projects/estimate')
  };

  return (
    <>
      <div>
        <select onChange={handleSelect} value={projectId}  >
          {renderOptions}
        </select>

        <button onClick={handleClick} >Edit Project</button>
      </div>
      <EstimateTable projects={projects} />
    </>
  )
}
