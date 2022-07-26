import { useSelector} from 'react-redux';

export default function EstimateTable() {
  const currentProject = useSelector(state => state.projects.currentProject);

  const renderBudget   = currentProject?.budget_items?.length > 0 ? currentProject?.budget_items.slice().sort((a, b) => {
    return a.division.split(' ')[1] - b.division.split(' ')[1] || a.cost_code.split(' ')[0] - b.cost_code.split(' ')[0]
  }).map(item => {
    return (
      <tr key={item.id}>
        <td style={{textAlign: 'center'}}>{item.division.slice(9)}</td>
        <td>{item.cost_code}</td>
        <td style={{textAlign: 'center'}}>{item.unit_quantity}</td>
        <td>{item.unit}</td>
        <td>${item.unit_cost.toLocaleString()}</td>
        <td>{item.taxed ? 'Yes' : 'No'}</td>
        <td>{item.subcontracted ? 'Yes' : 'No'}</td>
        <td>${item.total.toLocaleString()}</td>
        <td>{item.notes}</td>
      </tr>
    )
  } ) : <tr style={{color: 'orange', textAlign: 'center', background: 'black', fontWeight: '800'}}>Add Budget Items</tr>;

  const renderTable = 
  <table>
    <thead>
      <tr>
        <th style={{textAlign: 'center'}}>Division:</th>
        <th style={{width: '35%'}}>Cost Code:</th>
        <th>Unit Quantity:</th>
        <th>Unit:</th>
        <th>Unit Cost:</th>
        <th>Taxed:</th>
        <th>Subcontracted:</th>
        <th>Total:</th>
        <th>Notes:</th>
      </tr>
    </thead>
    <tbody>
        {renderBudget}
    </tbody>
    <thead >
      <tr>
        <th style={{textAlign: 'right'}}>Total:</th>
        <th style={{textAlign: 'right'}}>${currentProject?.total ? currentProject.total.toLocaleString() : '' }</th>
        <th style={{textAlign: 'right'}}>Cost Per SF:</th>
        <th style={{textAlign: 'right'}}>${currentProject?.cost_per_sf ? currentProject.cost_per_sf.toLocaleString() : '' }</th>
      </tr>
    </thead>
  </table>;

  const h1Style = {textAlign: 'center', color: 'orange', background: 'white', border: '2px solid black', width: '500px', padding: '10px'}


  return (
   <>
    {currentProject?.budget_items ? renderTable : <div style={{display: 'flex', marginLeft: '33%'}}><h1 style={h1Style}>Head to the Company Dashboard To Start a New Project!</h1></div>}
   </>
  )
}