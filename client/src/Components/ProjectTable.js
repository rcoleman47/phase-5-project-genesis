export default function ProjectTable({currentProject}) {
  console.log(currentProject)
  const renderBudget = currentProject?.length > 0 ? currentProject[0].budget_items.map(item => {
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
  } ) : <th style={{alignSelf: 'center', color: 'orange'}}>No Budget Items</th>;

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
        </tr>
      </thead>
      <tbody>
          {renderBudget}
      </tbody>
      <thead>
        <tr>
          <th>Total:</th>
          <th>$</th>
        </tr>
      </thead>
    </table>
  )
}