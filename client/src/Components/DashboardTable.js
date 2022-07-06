export default function DashboardTable({projects}) {

  const renderDashboard = projects ? projects.map(project => {
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
