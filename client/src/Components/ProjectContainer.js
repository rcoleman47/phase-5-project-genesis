import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { setCurrentProject } from '../Redux/Reducers/projects';
import ViewNavBar from "./ViewNavBar";

export default function ProjectContainer() {
  const view      = useSelector(state => state.projects.viewProject);
  const projectId = useSelector(state => state.projects.projectId);

  const dispatch  = useDispatch();

  useEffect(() => {
    if (projectId) {
      fetch(`/projects/${projectId}`)
      .then(r => r.json())
      .then(project => dispatch(setCurrentProject(project)));
    }
  }, [projectId, dispatch])

  return (
    <div className='project-container'>
        <ViewNavBar />
      <div className={view ? 'projects' : 'estimate-form-container'}>
        <Outlet />
      </div>
    </div>
  )
}
