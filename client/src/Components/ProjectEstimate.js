import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setProjectView } from '../Redux/Reducers/view';
import { setCurrentProject, setProjectId} from '../Redux/Reducers/projects';
import EstimateTable from './EstimateTable';


export default function ProjectEstimate() {
  const projects = useSelector(state => state.projects.allProjects);
  const projectId = useSelector(state => state.projects.projectId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (projectId) {
      fetch(`/projects/${projectId}`)
      .then(r => r.json())
      .then(project => dispatch(setCurrentProject(project)));
    }
  }, [projectId, dispatch])

  const renderOptions = projects?.length > 0 ? projects?.slice().sort((a, b) => {
    return a.title.localeCompare(b.title)
  }).map(project => <option key={project.id} value={project.id}>{project.title}</option> ) : <option>No Current Projects</option>;

  const handleSelect = (e) => {
    dispatch(setProjectId(e.target.value))
  };

  const handleClick = () => {
    dispatch(setProjectView('/project/edit'))
    navigate('/project/edit')
  };

  const renderButton = projects?.length > 0 ? <button onClick={handleClick} >Edit Project</button> : '';

 

  return (
    <>
      <div>
        <select onChange={handleSelect} style={{width: '100px'}} value={projectId} >
          {renderOptions}
         </select>
        {renderButton}
      </div>
      <EstimateTable projects={projects} /> 
    </>
  )
}
