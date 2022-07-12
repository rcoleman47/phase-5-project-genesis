export default function ProjectBidTable({projectBids, projectName}) {

  const renderBids = projectBids.length > 0 ? [...projectBids]?.sort((a, b) => a.cost_code.localeCompare(b.cost_code)).map(bid => {
    return (
      <tr key={bid.id}>
        <td>{bid.sub_name}</td>
        <td>{bid.sub_trade}</td>
        <td>{bid.cost_code}</td>
        <td>${bid.amount.toLocaleString()}</td>
      </tr>
    )
  } ) : <tr><th>No Bids</th></tr>

  const renderTable = 
  <>
  <table className="directory-table">
    <thead>
      <tr>
        <th>Subcontractor:</th>
        <th>Trade:</th>
        <th>Cost Code:</th>
        <th>Amount:</th>
      </tr>
    </thead>
    <tbody>
        {renderBids}
    </tbody>
</table>
</>

  return (
    <>
      {projectBids.length > 0  ? renderTable : <h1 style={{textAlign: 'center', color: 'orange'}}>Add to Project Team</h1>}
    </>
  )
}