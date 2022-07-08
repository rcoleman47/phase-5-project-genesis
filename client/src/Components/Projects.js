import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import ProjectTable from './ProjectTable';
import { setCurrentProject } from '../Redux/Reducers/projects';


export default function Projects() {
  const projects = useSelector(state => state.projects.allProjects);
  const currentProject = useSelector(state => state.projects.currentProject);

  const [projectId, setProjectId] = useState(currentProject?.id);

  const dispatch = useDispatch();

  const renderOptions = projects ? projects?.map(project => <option key={project.id} value={project.id}>{project.title}</option> ) : <option>No Current Projects</option>;

  const handleSelect = (e) => {
    setProjectId(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/projects/${projectId}`)
    .then(r => r.json())
    .then(project => dispatch(setCurrentProject(project)));

    window.location.reload();
  };

  console.log(projectId)

  return (
    <div>
      <div>
          <form onSubmit={handleSubmit}>
            <select onChange={handleSelect} value={projectId}  >
              {renderOptions}
            </select>
            <button type='submit'>Select Project</button>
          </form>
      </div>
      <ProjectTable projects={projects} projectId={projectId}  />

    </div>
  )
}
