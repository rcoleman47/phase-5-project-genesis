export default function DirectoryTable({company, users, sort}) {

  const renderUsers = company?.users ? [...users]?.sort((a, b) => {
    if(sort === 'name'){
      return a.first_name.localeCompare(b.first_name);
    } else if(sort === 'role'){
        return a.role.localeCompare(b.role);
    } else{
        return a.id - b.id
      }
    }).map(user => {
    return (
      <tr key={user.id}>
        <td>{user.first_name} {user.last_name}</td>
        <td>{user.email}</td>
        <td>{user.cell_number}</td>
        <td>{user.role}</td>
      </tr>
    )
  } ) : <tr><th>No Company Team</th></tr>

  const renderTable = 
  <>
  <h3 style={{marginLeft: '100px', color: 'orange', fontWeight: '900'}}>{company?.name}</h3>
  <table className="directory-table">
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
</>

  return (
    <>
      {company?.users  ? renderTable : <h1 style={{textAlign: 'center', color: 'orange'}}>Start A New Project!</h1>}
    </>
  )
}