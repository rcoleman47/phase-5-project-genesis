import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setCurrentProject } from '../Redux/Reducers/projects';
import { useEffect } from 'react';
import EstimateTable from './EstimateTable';


export default function Estimates() {
  const projects = useSelector(state => state.projects.allProjects);
  const currentProject = useSelector(state => state.projects.currentProject);

  const [projectId, setProjectId] = useState(projects?.[0].id);

  const dispatch = useDispatch();

  useEffect(() => {
    setProjectId(JSON.parse(window.localStorage.getItem('projectId')));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('projectId', projectId);
  }, [projectId]);

  useEffect(() => {
    fetch(`/projects/${projectId}`)
    .then(r => r.json())
    .then(project => dispatch(setCurrentProject(project)));
  }, [projectId])

  const renderOptions = projects ? projects?.map(project => <option key={project.id} value={project.id}>{project.title}</option> ) : <option>No Current Projects</option>;

  const handleSelect = (e) => {
    setProjectId(e.target.value)
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   fetch(`/projects/${projectId}`)
  //   .then(r => r.json())
  //   .then(project => dispatch(setCurrentProject(project)));

  //   // window.location.reload();
  // };

  return (
    <div className='projects'>
      <div>
          {/* <form onSubmit={handleSubmit}> */}
            <select onChange={handleSelect} value={projectId}  >
              {renderOptions}
            </select>
            {/* <button type='submit'>Select Project</button> */}
          {/* </form> */}
      </div>
      <EstimateTable projects={projects} projectId={projectId}  />

    </div>
  )
}
