import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

export default function DirectoryContainer() {
  const [view, setView] = useState('/directory/company');

  const navigate = useNavigate();

  useEffect(()=> {
    navigate(`${view}`)
  }, [view, navigate])

  const handleSelect = (e) => {
    setView(e.target.value);
  };

  return (
    <div className='project-container' style={{}}>

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