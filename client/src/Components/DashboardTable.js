export default function DashboardTable({currentProjects, sort}) {

  const renderDashboard = currentProjects ? [...currentProjects].sort((a, b) => {
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
    }).map(project => {
    return (
      <tr key={project.id}>
        <td>{project.title}</td>
        <td>{project.location}</td>
        <td>{project.phase}</td>
        <td>{project.sector}</td>
        <td>{project.classification}</td>
        <td>{project.size}</td>
      </tr>
    )
  } ) : <tr><th>Loading...</th></tr>

  return (
    <table>
      <thead>
        <tr>
          <th>Project Name:</th>
          <th>Location:</th>
          <th>Phase:</th>
          <th>Sector:</th>
          <th>Classification:</th>
          <th>Size:</th>
        </tr>
      </thead>
      <tbody>
          {renderDashboard}
      </tbody>
    </table>
  )
}
