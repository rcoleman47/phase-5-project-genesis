import { useSelector } from 'react-redux';
import DashboardTable from './DashboardTable';

export default function Dashboard() {
  const projects = useSelector(state => state.projects.value);

  console.log(projects)

  const renderDashboard = projects ? <DashboardTable projects={projects} /> : <h1>Loading...</h1>

  return (
    <div className='dashboard'>

      {renderDashboard}
    </div>
  )
}
