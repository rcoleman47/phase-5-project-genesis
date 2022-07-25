export default function ProjectTeamTable({projectUsers, projectName}) {

  const renderUsers = projectUsers.length > 0 ? [...projectUsers]?.sort((a, b) => a.role.localeCompare(b.role)).map(user => {
    return (
      <tr key={user.id}>
        <td>{user.first_name} {user.last_name}</td>
        <td>{user.email}</td>
        <td>{user.cell_number}</td>
        <td>{user.role}</td>
      </tr>
    )
  } ) : <tr><th>No Company Team</th></tr>;

  const renderTable = 
  <>
    <table className="directory-table" style={{marginBottom:'10px'}}>
      <thead>
        <tr>
          <th>Name:</th>
          <th>Email:</th>
          <th>Cell Number:</th>
          <th>Role:</th>
        </tr>
      </thead>
      <tbody>
          {renderUsers}
      </tbody>
  </table>
</>;

const divStyle = {
  display:    'flex', 
  marginLeft: '38.75%', 
  height:     '100px'
};

const h1Style = {
  textAlign:   'center', 
  color:       'orange', 
  marginRight: '90px', 
  background:  'white', 
  border:      '2px solid black', 
  padding:     '10px'
};


  return (
    <>
      {projectUsers.length > 0  ? renderTable : <div style={divStyle}><h1 style={h1Style}>Add to Project Team</h1></div>}
    </>
  )
}