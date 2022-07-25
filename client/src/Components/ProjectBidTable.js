export default function ProjectBidTable({projectBids}) {

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

  const divStyle = {
    display:    'flex', 
    marginLeft: '39%', 
    height:     '100px'
  }

  const h1Style = {
    textAlign:    'center', 
    color:        'orange', 
    marginRight:  '90px', 
    background:   'white', 
    border:       '2px solid black', 
    padding:      '10px'
  }

  return (
    <>
      {projectBids.length > 0  ? renderTable : <div style={divStyle}><h1 style={h1Style}>Add Bids to Project</h1></div>}
    </>
  )
}