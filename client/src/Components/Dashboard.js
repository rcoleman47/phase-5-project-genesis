import { useSelector } from 'react-redux';
import { useState } from 'react';
import DashboardTable from './DashboardTable';
import DashPagination from './DashPagination';

export default function Dashboard() {
  const [sort, setSort] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);

  const projects = useSelector(state => state.projects.allProjects);

  const handleSelect = (e) => {
    setSort(e.target.value);
  };

  const totalProjects = projects?.length
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects ? [...projects].slice(indexOfFirstProject, indexOfLastProject) : projects;
  
  const renderDashboard = projects ? <DashboardTable sort={sort} currentProjects={currentProjects} /> : <h1 style={{alignSelf: 'center', color: 'orange'}}>No Projects</h1>;

  const paginate = (number) => setCurrentPage(number);

  return (
    <div className='dashboard'>
      <div>
        <label>Filter
          <select onChange={handleSelect} value={sort}>
            <option value='default' >Default</option>
            <option value='title' >Name</option>
            <option value='phase' >Phase</option>
            <option value='sector' >Sector</option>
            <option value='classification'>Classification</option>
          </select>
        </label>
       
      </div>

      {renderDashboard}

      <DashPagination 
        projectsPerPage={projectsPerPage}
        totalProjects={totalProjects} 
        paginate={paginate} />
    </div>
  )
}