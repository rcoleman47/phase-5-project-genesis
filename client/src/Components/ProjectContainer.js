import ViewNavBar from "./ViewNavBar"
import { Outlet } from 'react-router-dom';

export default function ProjectContainer() {
  return (
    <div className='project-container'>
      <ViewNavBar />
      <div className='projects'>
        <Outlet />
      </div>
    </div>
  )
}
