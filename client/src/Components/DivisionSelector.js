import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setCurrentDiv, setCurrentCodes } from '../Redux/Reducers/costcodes';
import { addCurrentProjectItem } from '../Redux/Reducers/projects';
import CostCodeSelector from './CostCodeSelector';



export default function DivisionSelector() {
  const divisions = useSelector(state => state.costCodes.all);
  const currentDiv = useSelector(state => state.costCodes.currentDiv);

  const [error, setError] = useState(null);
  const [codeId, setCodeId] = useState(undefined)
  const [divisionId, setDivisionId] = useState(divisions?.[0].id);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/divisions/${divisionId}`)
    .then(r => r.json())
    .then(division => {
      dispatch(setCurrentDiv(division))
      dispatch(setCurrentCodes(division.cost_codes))
    });
  }, [divisionId, codeId])

  const renderDivisions = divisions ? divisions?.map(division => <option key={division.id} value={division.id}>{division.number}: {division.title}</option> ) : <option>No Current Divisions</option>;

  const handleSelect = (e) => {
    setDivisionId(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/budget_items`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        division: divisionId,
        cost_code: codeId,
        unit_quantity: 1,
        unit: 'ls'
      })
    })
    .then(r=>{
      if(r.ok){ 
        r.json().then(item => {
          dispatch(addCurrentProjectItem(item))
        });

        setError(null);

      }
      else
        r.json().then(json=>setError(json.error));
    });
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit} value={currentDiv ? currentDiv[0] : ''}>
        <select onChange={handleSelect} value={divisionId}  >
          {renderDivisions}
        </select> 
    
        <CostCodeSelector currentDiv={currentDiv} codeId={codeId} setCodeId={setCodeId} />

        {error ? <h5>{error}</h5> : null}

        <button type='submit'>Select Project</button>
      </form>
    </div>
  )
}
