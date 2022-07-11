import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setView } from '../Redux/Reducers/view';

export default function ViewNavBar() {
  const view = useSelector(state => state.view.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=> {
    navigate(`${view}`)
  }, [view])

  const handleSelect = (e) => {
    dispatch(setView(e.target.value));
  };

  return (
    <div className='project-navbar' >
      <select onChange={handleSelect} value={view}>
          <option value='/project/estimate' >Estimate</option>
          <option value='/subcontractors' >Subcontractors</option>
        </select>
    </div>
  )
}
