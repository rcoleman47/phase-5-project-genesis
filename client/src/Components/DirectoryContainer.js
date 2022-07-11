import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setDirectoryView } from '../Redux/Reducers/view';

export default function DirectoryContainer() {
  const view = useSelector(state => state.view.directoryView)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=> {
    navigate(`${view}`)
  }, [view, navigate])

  const handleSelect = (e) => {
    dispatch(setDirectoryView(e.target.value));
  };

  return (
    <div className='project-container' >

      <div className='project-navbar' style={{marginRight: '300px', width: '112px'}} >
        <select onChange={handleSelect} value={view}>
          <option value='/directory/company' >Company</option>
          <option value='/directory/subcontractors' >Subcontractors</option>
        </select>
      </div>

    <div className='projects'>
      <Outlet />
    </div>

    </div>
  )
}