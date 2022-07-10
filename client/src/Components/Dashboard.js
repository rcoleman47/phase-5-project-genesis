import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

  const totalProjects = projects?.length
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects?.length ? [...projects]?.slice(indexOfFirstProject, indexOfLastProject) : undefined;
  
  const renderDashboard = projects ? <DashboardTable sort={sort} currentProjects={currentProjects} /> : <h3 style={{alignSelf: 'center', color: 'orange'}}>No Projects</h3>;

  const paginate = (number) => setCurrentPage(number);

  const handleClick = () => {
    navigate('/projects/new')
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