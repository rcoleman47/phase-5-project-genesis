import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProjects } from '../Redux/Reducers/projects';
import ViewNavBar from './ViewNavBar';


export default function Home() {
  const dispatch = useDispatch();


  useEffect(() => {
    fetch('/projects')
    .then(r => r.json())
    .then(projects => dispatch(setProjects(projects)))
  }, []);

  return (
    <div className='pageContainer'>
      <ViewNavBar />
      <Outlet />
    </div>
  )
}
