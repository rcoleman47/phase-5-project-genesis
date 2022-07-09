import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import DivisionSelector from './DivisionSelector';
import BudgetItemForm from './BudgetItemForm';

export default function EstimateForm() {
  const project = useSelector(state => state.projects.currentProject);

  const renderBudgetItems = project?.budget_items ? project?.budget_items.slice().sort((a, b) => {
    return a.division.split(' ')[1] - b.division.split(' ')[1] || a.cost_code.split(' ')[0] - b.cost_code.split(' ')[0]
  }).map(item => <BudgetItemForm key={item.id} budget_item={item}/>) : <h3>Add Budget Items</h3>

  const budgetItemTableHeader =<table><thead><tr><th>Division</th><th>Cost Code</th><th>Unit Quantity</th><th>Unit</th><th>Unit Cost</th><th>Taxed</th><th>Subcontracted</th><th>Total</th><th>Notes</th></tr></thead></table>

  return (
    <div>
      <div className="page-title">
        <h1 style={{color: 'orange'}}>{project?.title} Project Estimate</h1>
      </div>
      <div className='estimate-form-container'>
        <DivisionSelector />

        <div className='budgetItem-container'>
          {project.budget_items?.length > 0 ? budgetItemTableHeader : ''}
          {renderBudgetItems}
        </div>

      </div>

    </div>
  )
}
