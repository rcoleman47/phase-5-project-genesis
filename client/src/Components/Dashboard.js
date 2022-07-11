import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProjectView } from '../Redux/Reducers/view';
import { useState } from 'react';
import DashboardTable from './DashboardTable';
import DashPagination from './DashPagination';

export default function Dashboard() {
  const [sort, setSort] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(15);

  const projects = useSelector(state => state.projects.allProjects);

  const handleSelect = (e) => {
    setSort(e.target.value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalProjects = projects?.length
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects?.length ? [...projects]?.sort((a, b) => {
    if(sort === 'title'){
      return a.title.localeCompare(b.title);
    } else if(sort === 'phase'){
        return b.phase.localeCompare(a.phase);
    } else if(sort === 'sector'){
        return a.sector.localeCompare(b.sector);
    } else if(sort === 'classification'){
        return a.classification.localeCompare(b.classification);
    } else{
        return a.id - b.id
      }
    }).slice(indexOfFirstProject, indexOfLastProject) : undefined;
  
  const renderDashboard = projects ? <DashboardTable currentProjects={currentProjects} /> : <h3 style={{alignSelf: 'center', color: 'orange'}}>No Projects</h3>;

  const paginate = (number) => setCurrentPage(number);

  const handleClick = () => {
    dispatch(setProjectView('/project/new'))
    navigate('/project/new')
  };

  return (
    <div className='dashboard'>
      <div className='dashboard-buttons' >
        <label>Filter
          <select onChange={handleSelect} value={sort}>
            <option value='default' >Default</option>
            <option value='title' >Name</option>
            <option value='phase' >Phase</option>
            <option value='sector' >Sector</option>
            <option value='classification'>Classification</option>
          </select>
        </label>
       
        <button onClick={handleClick} >Create New Project</button>
      </div>

      {renderDashboard}

      <DashPagination 
        projectsPerPage={projectsPerPage}
        totalProjects={totalProjects} 
        paginate={paginate} />
    </div>
  )
}