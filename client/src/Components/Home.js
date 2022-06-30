import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/Reducers/user';

export default function Home() {
  const user = useSelector( state => state.user.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    fetch('/logout', {
      method: 'DELETE',
    });
    
    dispatch(logout()); 
    
    navigate('/login'); 
  };

 
  return (
    <div>
      <h1>{user.first_name}</h1>
      <button onClick={handleClick} >Log Out</button>
    
    </div>
  )
}
