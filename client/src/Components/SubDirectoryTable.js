export default function SubDirectoryTable({subcontractor, sort}) {

  const renderUsers = subcontractor?.contacts ? [...subcontractor?.contacts].sort((a, b) => {
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
  } ) : <tr><th>No Subcontractor Team</th></tr>

  const renderTable = 
  <table className="directory-table">
    <thead>
      <tr>
        <th style={{border: 'none', color: 'orange', fontWeight: '900'}}>
          {subcontractor?.name}
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
      {subcontractor?.contacts  ? renderTable : <h1 style={{textAlign: 'center', color: 'orange'}}>Start A New Project!</h1>}
    </>
  )
}