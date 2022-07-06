import { useSelector } from 'react-redux';
import { useState } from 'react';
import DashboardTable from './DashboardTable';

export default function Dashboard() {
  const [sort, setSort] = useState('default');

  const projects = useSelector(state => state.projects.value);

  const handleSelect = (e) => {
    setSort(e.target.value);
  };

  const renderDashboard = projects ? <DashboardTable sort={sort} projects={projects} /> : <h1 style={{alignSelf: 'center', color: 'orange'}}>Loading...</h1>

  return (
    <div className='dashboard'>
       <label>Select View
        <select onChange={handleSelect} value={sort}>
          <option value='default' >Default</option>
          <option value='title' >Name</option>
          <option value='phase' >Phase</option>
          <option value='sector' >Sector</option>
          <option value='classification'>Classification</option>
        </select>
      </label>

      {renderDashboard}
    </div>
  )
}


// projects.sort((a, b) => {
//   if(sort === 'title'){
//     return a.title.localeCompare(b.title);
//   } else if(sort === 'phase'){
//       return a.phase.localeCompare(b.phase);
//   } else if(sort === 'sector'){
//       return a.sector.localeCompare(b.sector);
//   } else if(sort === 'sector'){
//       return a.sector.localeCompare(b.sector);
//   } else if(sort === 'classification'){
//       return a.classification.localeCompare(b.classification);
//     } else return a.id - b.id
//   })