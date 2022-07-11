import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCurrentProject } from '../Redux/Reducers/projects';
import { setProjectView } from '../Redux/Reducers/view';
import EditProjectForm from './EditProjectForm'
import EstimateForm from './EstimateForm'

export default function ProjectEdit() {
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


  const handleClick = () => {
    dispatch(setProjectView('/project/estimate'))
    navigate('/project/estimate')
  };

  return (
    <>

      <div className='estimate-form-view'>
        <button onClick={handleClick} >Done Editing</button>
      </div>

      <div>
      <EditProjectForm projectId={projectId} />
      </div>

      <EstimateForm  />

    </>
  )
}
