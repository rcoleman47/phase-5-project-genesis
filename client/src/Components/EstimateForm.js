import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import DivisionSelector from './DivisionSelector';
import BudgetItemForm from './BudgetItemForm';

export default function EstimateForm() {
  const project = useSelector(state => state.projects.currentProject);

  const renderBudgetItems = project?.budget_items ? project?.budget_items.map(item => <BudgetItemForm key={item.id} budget_item={item}/>) : <h3>Add Budget Items</h3>

  return (
    <div>
      <DivisionSelector />

      {renderBudgetItems}

    </div>
  )
}
