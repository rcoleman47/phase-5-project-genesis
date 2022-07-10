import { useSelector} from 'react-redux';

export default function EstimateTable({projects}) {
  const currentProject = useSelector(state => state.projects.currentProject);

  const renderBudget = currentProject?.budget_items ? currentProject?.budget_items.slice().sort((a, b) => {
    return a.division.split(' ')[1] - b.division.split(' ')[1] || a.cost_code.split(' ')[0] - b.cost_code.split(' ')[0]
  }).map(item => {
    return (
      <tr key={item.id}>
        <td>{item.cost_code}</td>
        <td>{item.unit_quantity}</td>
        <td>{item.unit}</td>
        <td>${item.unit_cost.toLocaleString()}</td>
        <td>{item.taxed ? 'Yes' : 'No'}</td>
        <td>{item.subcontracted ? 'Yes' : 'No'}</td>
        <td>${item.total.toLocaleString()}</td>
        <td>{item.notes}</td>
      </tr>
    )
  } ) : projects ? projects[0]?.budget_items.map(item => {
    return (
      <tr key={item.id}>
        <td>{item.cost_code}</td>
        <td>{item.unit_quantity}</td>
        <td>{item.unit}</td>
        <td>${item.unit_cost.toLocaleString()}</td>
        <td>{item.taxed ? 'Yes' : 'No'}</td>
        <td>{item.subcontracted ? 'Yes' : 'No'}</td>
        <td>${item.total.toLocaleString()}</td>
        <td>{item.notes}</td>
      </tr>
    )
  } ) :  <tr style={{alignSelf: 'center', color: 'orange', fontWeight: '800'}}>No Budget Items</tr>;

  const renderTable = 
<table>
  <thead>
    <tr>
      <th>Cost Code:</th>
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
      <th style={{textAlign: 'left'}}>${currentProject?.total ? currentProject.total.toLocaleString() : '' }</th>
      <th style={{textAlign: 'right'}}>Cost Per SF:</th>
      <th style={{textAlign: 'left'}}>${currentProject?.cost_per_sf ? currentProject.cost_per_sf.toLocaleString() : '' }</th>
    </tr>
  </thead>
</table>;

  return (
   <>
    {currentProject?.budget_items ? renderTable : <div><h1 style={{textAlign: 'center', color: 'orange'}}>Head to the Company Dashboard</h1><h1 style={{textAlign: 'center', color: 'orange',}}>To Start A New Project!</h1></div>}
   </>
  )
}