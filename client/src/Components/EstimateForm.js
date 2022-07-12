import { useSelector } from 'react-redux';
import { useState } from 'react';
import DivisionSelector from './DivisionSelector';
import BudgetItemForm from './BudgetItemForm';
import SubBidForm from './SubBidForm';

export default function EstimateForm() {
  const [addSubBid, setAddSubBid] = useState(true);
  const [amount, setAmount] = useState(0);

  const project = useSelector(state => state.projects.currentProject);

  const handleClick = () => {
    setAddSubBid(!addSubBid);
  };

  const renderBudgetItems = project?.budget_items ? project?.budget_items.slice().sort((a, b) => {
    return a.division.split(' ')[1] - b.division.split(' ')[1] || a.cost_code.split(' ')[0] - b.cost_code.split(' ')[0]
  }).map(item => <BudgetItemForm addSubBid={addSubBid} key={item.id} budget_item={item} setAmount={setAmount}/>) : <h3>Add Budget Items</h3>;

  const buttonText = addSubBid ? 'Sub Bid' : 'Budget Item';

  const budgetItemTableHeader =<table style={{marginRight: addSubBid ? '' : '115px', width: addSubBid ? '' : '90%'}}><thead><tr><th>Division</th><th>Cost Code</th><th>Unit Quantity</th><th>Unit</th><th>Unit Cost</th><th>Taxed</th><th>Subcontracted</th><th>Total</th>{addSubBid ? <th>Notes</th> : <th></th>}</tr></thead></table>;

  return (
    <div>
      <div className='estimate-form-container'>
    
        {addSubBid ? <DivisionSelector /> : <SubBidForm setAddSubBid={setAddSubBid} amount={amount}/>}

        <button onClick={handleClick} style={{width: '100px', alignSelf: 'center', marginRight: '90px', marginTop: '10px'}} >{buttonText}</button>
        
        <div className='budgetItem-container'>
          {project?.budget_items?.length > 0 ? budgetItemTableHeader : ''}
          {renderBudgetItems}
        </div>

      </div>

    </div>
  )
}
