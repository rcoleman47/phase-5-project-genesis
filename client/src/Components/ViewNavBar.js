import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

export default function ViewNavBar() {
  const [view, setView] = useState('/project/estimate')

  const navigate = useNavigate();

  useEffect(()=> {
    navigate(`${view}`)
  }, [view])

  const handleSelect = (e) => {
    setView(e.target.value);
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
