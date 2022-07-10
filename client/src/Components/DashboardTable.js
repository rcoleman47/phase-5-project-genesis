export default function DashboardTable({currentProjects, sort}) {

  const renderProjects = currentProjects ? [...currentProjects].sort((a, b) => {
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
        <td>{project.size.toLocaleString()} sf</td>
        <td>${project.total.toLocaleString()}</td>
      </tr>
    )
  } ) : <tr><th>No Current Projects</th></tr>

  const renderTable = 
  <table>
    <thead>
      <tr>
        <th>Project Name:</th>
        <th>Location:</th>
        <th>Phase:</th>
        <th>Sector:</th>
        <th>Classification:</th>
        <th>Size:</th>
        <th>Total:</th>
      </tr>
    </thead>
    <tbody>
        {renderProjects}
    </tbody>
</table>

  return (
    <>
      {currentProjects ? renderTable : <h1 style={{textAlign: 'center', color: 'orange'}}>Start A New Project!</h1>}
    </>
  )
}
