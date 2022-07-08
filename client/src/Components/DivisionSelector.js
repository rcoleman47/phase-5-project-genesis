import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { setCurrentDiv, setCurrentCodes } from '../Redux/Reducers/costcodes';
import CostCodeSelector from './CostCodeSelector';
import { current } from '@reduxjs/toolkit';


export default function DivisionSelector() {
  const divisions = useSelector(state => state.costCodes.all);
  const currentDiv = useSelector(state => state.costCodes.currentDiv);
  const codes = useSelector(state => state.costCodes.currentCodes);

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
    console.log(e.target)
    console.log(divisionId)
    console.log(codeId)

  };

  return (
    <div>
      <form onSubmit={handleSubmit} value={currentDiv ? currentDiv[0] : ''}>
        <select onChange={handleSelect} value={divisionId}  >
          {renderDivisions}
        </select> 
    
        <CostCodeSelector currentDiv={currentDiv} codeId={codeId} setCodeId={setCodeId} />
        <button type='submit'>Select Project</button>
      </form>
    </div>
  )
}
