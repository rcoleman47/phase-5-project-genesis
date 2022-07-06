import { Outlet } from 'react-router-dom';
import ViewNavBar from './ViewNavBar';

export default function Home() {

  return (
    <div className='pageContainer'>
      <ViewNavBar />
      <Outlet />
    </div>
  )
}
