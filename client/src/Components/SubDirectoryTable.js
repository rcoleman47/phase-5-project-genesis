export default function SubDirectoryTable({ subcontractor }) {

  const renderUsers = subcontractor?.contacts ? [...subcontractor?.contacts].map(user => {
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
        <th style={{color: 'orange', fontWeight: '900'}}>
          {subcontractor?.name}
        </th>
        <th style={{fontWeight: '900'}}>
          {subcontractor?.trade}
        </th>
        <th style={{fontWeight: '900'}}>
          {subcontractor?.address}
        </th>
        <th style={{fontWeight: '900'}}>
          {subcontractor?.phone_number}
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