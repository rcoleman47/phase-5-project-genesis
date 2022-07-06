import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProjects } from '../Redux/Reducers/projects';

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const projects = useSelector(state => state.projects.value);

  useEffect(() => {
    fetch('/projects')
    .then(r => {
      if (r.ok){
        r.json().then(projects => dispatch(setProjects(projects)))
      }
      else navigate('/login');
    });

  }, []);

  console.log(projects)

  return (
    <div>Dashboard</div>
  )
}
