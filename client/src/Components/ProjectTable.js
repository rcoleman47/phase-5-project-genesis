import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCurrentProject } from '../Redux/Reducers/projects';

export default function ProjectTable({projects, projectId}) {
  const currentProject = useSelector(state => state.projects.currentProject);

  const dispatch = useDispatch();
  console.log(projects)

  useEffect(() => {
    fetch(`/projects/${projectId}`)
    .then(r => r.json())
    .then(project => dispatch(setCurrentProject(project)));
  }, [projectId])

  const renderBudget = currentProject ? currentProject.budget_items.map(item => {
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
  } ) : projects ? currentProject.budget_items.map(item => {
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
        </tr>
      </thead>
      <tbody>
          {renderBudget}
      </tbody>
      <thead>
        <tr>
          <th>Total:</th>
          <th>${currentProject.total.toLocaleString()}</th>
        </tr>
      </thead>
    </table>
  )
}