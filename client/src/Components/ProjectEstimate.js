import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCurrentProject, editProject, setProjectId} from '../Redux/Reducers/projects';
import EstimateTable from './EstimateTable';
import EstimateForm from './EstimateForm';


export default function ProjectEstimate() {
  const projects = useSelector(state => state.projects.allProjects);
  const projectId = useSelector(state => state.projects.projectId);
  const view = useSelector(state => state.projects.viewProject);

  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId) {
      fetch(`/projects/${projectId}`)
      .then(r => r.json())
      .then(project => dispatch(setCurrentProject(project)));
    }
  }, [projectId])

  const renderOptions = projects?.length > 0 ? projects?.map(project => <option key={project.id} value={project.id}>{project.title}</option> ) : <option>No Current Projects</option>;

  const handleSelect = (e) => {
    dispatch(setProjectId(e.target.value))
  };

  const buttonText = view ? 'Edit Project' : 'Done Editing';

  const handleClick = () => {
    dispatch(editProject());
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
