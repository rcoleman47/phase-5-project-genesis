import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBudgetItem } from '../Redux/Reducers/projects';

export default function BudgetItemForm({budget_item}) {
  const [error, setError] = useState(null);
  const [isTaxed, setIsTaxed] = useState(budget_item?.taxed);
  const [budgetItemForm, setBudgetItemForm] = useState({
    division:        budget_item?.division,
    cost_code:       budget_item?.cost_code,
    unit_quantity:   budget_item?.unit_quantity,
    unit_cost:       budget_item?.unit_cost,
    unit:            budget_item?.unit,
    taxed:           budget_item?.taxed,
    subcontracted:   budget_item?.subcontracted,
    notes:           budget_item?.notes,
  });

  const {tax_rate} = budget_item

  const {division, cost_code, unit_quantity, unit_cost, unit, taxed, subcontracted, notes} = budgetItemForm

  const dispatch = useDispatch();

  const handleChange = (e) => {
    let key   = e.target.name;
    let value = e.target.value;
    if(key === 'taxed'){
      if(value === 'true'){
        setIsTaxed(true);
      } else setIsTaxed(false);
    }
    setBudgetItemForm({
      ...budgetItemForm,
      [key]: value,
    });
  };

  const handleTaxChange = (e) => {
    let value = e.target.value;
    if(value === 'true'){
      setIsTaxed(true);
    } else setIsTaxed(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/budget_items/${budget_item?.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(budgetItemForm)
    })
    .then(r=>{
      if(r.ok){ 
        r.json().then(item => {
          dispatch(updateBudgetItem((item)));
        });

        setError(null);
      }
      else
        r.json().then(json=>setError(json.error));
    });

  };
  console.log(isTaxed)
  const total = isTaxed ? Math.round((unit_cost * unit_quantity) * (1 + (tax_rate / 100))) : (unit_cost * unit_quantity)

  return (
    <div className='budgetItem-form-container'>
         
      <form className='budgetItem-form' onSubmit={handleSubmit} >
          <input 
            name='division'
            type='text' 
            value={division} 
            readOnly
            />
          <input 
            name='cost_code'
            type='text' 
            value={cost_code} 
            readOnly
          />
          <input 
            name='unit_quantity'
            type='number' 
            value={unit_quantity} 
            onChange={handleChange}
          />
          <select 
            name='unit'
            type='text' 
            value={unit} 
            onChange={handleChange}>
              <option value={'ls'}>ls</option>
              <option value={'ea'}>ea</option>
              <option value={'k'}>k</option>
              <option value={'box'}>box</option>
              <option value={'ft'}>ft</option>
              <option value={'sqft'}>sqft</option>
              <option value={'yds'}>yds</option>
            </select>
          <input 
            name='unit_cost'
            type='text' 
            value={unit_cost} 
            onChange={handleChange}
          />
          <select 
            name='taxed'
            type='text' 
            value={taxed} 
            onClick={handleTaxChange}
            onChange={handleChange}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          <select 
            name='subcontracted'
            type='text' 
            value={subcontracted} 
            onChange={handleChange}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          <input 
            name='unit_cost'
            type='text' 
            value={total} 
            readOnly
          />
          <input 
            name='notes'
            type='text' 
            value={notes} 
            onChange={handleChange}
            />

        {error ? <h5>{error}</h5> : null}

        <input type="submit" value="Update" />

      </form>
      
    </div>
  )
}

// (unit_cost * unit_quantity) * (1 + (tax_rate / 100))