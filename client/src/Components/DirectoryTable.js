export default function DirectoryTable({company, sort}) {

  const renderUsers = company?.[0].users ? [...company?.[0].users].sort((a, b) => {
    if(sort === 'name'){
      return a.name.localeCompare(b.name);
    } else if(sort === 'role'){
        return a.role.localeCompare(b.role);
    } else{
        return a.id - b.id
      }
    }).map(user => {
    return (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.cell_number}</td>
        <td>{user.role}</td>
      </tr>
    )
  } ) : <tr><th>No Company Team</th></tr>

  const renderTable = 
  <table className="directory-table">
    <thead>
      <tr>
        <th style={{border: 'none', color: 'orange', fontWeight: '900'}}>
          {company?.[0].name}
        </th>
      </tr>
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

  return (
    <>
      {company?.[0].users  ? renderTable : <h1 style={{textAlign: 'center', color: 'orange'}}>Start A New Project!</h1>}
    </>
  )
}