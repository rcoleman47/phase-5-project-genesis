export default function DashboardTable({currentProjects }) {

  const renderProjects = currentProjects ? [...currentProjects].map(project => {
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
