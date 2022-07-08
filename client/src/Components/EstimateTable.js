import { useSelector} from 'react-redux';

export default function EstimateTable({projects}) {
  const currentProject = useSelector(state => state.projects.currentProject);
  console.log(currentProject.budget_items[0].division.split(' ')[1]);

  const renderBudget = currentProject.budget_items ? currentProject?.budget_items.slice().sort((a, b) => {
    return a.division.split(' ')[1] - b.division.split(' ')[1]
  }).map(item => {
    return (
      <tr key={item.id}>
        <td>{item.cost_code}</td>
        <td>{item.unit_quantity}</td>
        <td>{item.unit}</td>
        <td>${item.unit_cost.toLocaleString()}</td>
        <td>{item.taxed ? '✓' : 'x'}</td>
        <td>{item.subcontracted ? '✓' : 'x'}</td>
        <td>${item.total.toLocaleString()}</td>
        <td>{item.notes}</td>
      </tr>
    )
  } ) : projects ? projects[0].budget_items.map(item => {
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
  } ) : <tr><td style={{alignSelf: 'center', color: 'orange'}}>No Budget Items</td></tr>;

  return (
    <table>
      <thead>
        <tr>
          <th>Cost Code:</th>
          <th>Unit Quantitiy:</th>
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
      <thead style={{border: 'none'}}>
        <tr>
          <th>Total:</th>
          <th>${currentProject?.total ? currentProject.total.toLocaleString() : '' }</th>
        </tr>
      </thead>
    </table>
  )
}