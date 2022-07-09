import ViewNavBar from "./ViewNavBar"
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function ProjectContainer() {
  const [view, setView] = useState(true);

  return (
    <div className='project-container'>
        <ViewNavBar />
      <div className={view ? 'projects' : 'estimate-form-container'}>
        <Outlet context={[view, setView]}/>
      </div>
    </div>
  )
}
