import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProjectView } from '../Redux/Reducers/view';

export default function ViewNavBar() {
  const view = useSelector(state => state.view.projectView);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=> {
    navigate(`${view}`)
  }, [navigate, view])

  const handleSelect = (e) => {
    dispatch(setProjectView(e.target.value));
  };

  return (
    <div className='project-navbar' >
      <select onChange={handleSelect} value={view}>
          <option value='/project/estimate' >Estimate</option>
          <option value='/project/directory' >Directory</option>
        </select>
    </div>
  )
}
