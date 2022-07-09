import ViewNavBar from "./ViewNavBar";
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export default function ProjectContainer() {
  const view = useSelector(state => state.projects.viewProject);

  return (
    <div className='project-container'>
        <ViewNavBar />
      <div className={view ? 'projects' : 'estimate-form-container'}>
        <Outlet />
      </div>
    </div>
  )
}
