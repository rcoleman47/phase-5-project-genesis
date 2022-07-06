import { useSelector, useDispatch } from 'react-redux';
import ViewNavBar from './ViewNavBar';

export default function Home() {
  const user = useSelector( state => state.user.value);

  return (
    <div className='pageContainer'>
      <ViewNavBar />
      <h1>{user.first_name}</h1>
      
    
    </div>
  )
}
