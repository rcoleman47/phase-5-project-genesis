import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCurrentProject, editProject, setProjectId} from '../Redux/Reducers/projects';
import EstimateTable from './EstimateTable';
import EstimateForm from './EstimateForm';
import EditProjectForm from './EditProjectForm';


export default function ProjectEstimate() {
  const projects = useSelector(state => state.projects.allProjects);
  const projectId = useSelector(state => state.projects.projectId);
  const viewProject = useSelector(state => state.projects.viewProject);

  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId) {
      fetch(`/projects/${projectId}`)
      .then(r => r.json())
      .then(project => dispatch(setCurrentProject(project)));
    }
  }, [projectId])

  const renderOptions = projects?.length > 0 ? projects?.slice().sort((a, b) => {
    return a.title.localeCompare(b.title)
  }).map(project => <option key={project.id} value={project.id}>{project.title}</option> ) : <option>No Current Projects</option>;

  const handleSelect = (e) => {
    dispatch(setProjectId(e.target.value))
  };

  const renderSelect = 
<select onChange={handleSelect} value={projectId} >
  {renderOptions}
</select>

  const buttonText = viewProject ? 'Edit Project' : 'Done Editing';

  const handleClick = () => {
    dispatch(editProject(!viewProject));
  };

  return (
    <>
      <div className={viewProject ? '' :'estimate-form-view'}>
        {viewProject ? renderSelect : ''}

        <button onClick={handleClick} >{buttonText}</button>
      </div>

      <div>
        {viewProject ? '' : <EditProjectForm projectId={projectId} />}
      </div>
      {viewProject ? <EstimateTable projects={projects} /> : <EstimateForm  />}
    </>
  )
}
