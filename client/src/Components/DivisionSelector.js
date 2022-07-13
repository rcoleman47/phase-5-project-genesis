import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setCurrentDiv, setCurrentDivCodes, setCurrentCode } from '../Redux/Reducers/costcodes';
import { setCurrentProject} from '../Redux/Reducers/projects';
import CostCodeSelector from './CostCodeSelector';


export default function DivisionSelector() {
  const divisions = useSelector(state => state.costCodes.all);
  const currentDiv = useSelector(state => state.costCodes.currentDiv);
  const currentCode = useSelector(state => state.costCodes.currentCode);
  const project = useSelector(state => state.projects.currentProject);

  const [error, setError] = useState(null);
  const [codeId, setCodeId] = useState(currentDiv.cost_codes[0].id)
  const [divisionId, setDivisionId] = useState(divisions[0].id);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/divisions/${divisionId}`)
    .then(r => r.json())
    .then(division => {
      dispatch(setCurrentDiv(division))
      dispatch(setCurrentDivCodes(division.cost_codes))
    });
  }, [divisionId, dispatch])


  useEffect(() => {
    fetch(`/cost_codes/${codeId}`)
    .then(r => {
      if (r.ok){
        r.json().then(code => {
          dispatch(setCurrentCode(code))
        })
      }
      else {
        r.json().then(json=>console.log(json.error))};
    });
  }, [codeId, dispatch]);


  const renderDivisions = divisions ? divisions?.map(division => <option key={division.id} value={division?.id}>{division.number}: {division.title}</option> ) : <option>No Current Divisions</option>;

  const handleSelect = (e) => {
    setDivisionId(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/budget_items`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        division: currentDiv?.number,
        cost_code: currentCode?.description,
        unit_quantity: 1,
        unit: 'ls',
        unit_cost: 1000,
        project_id: project.id
      })
    })
    .then(r=>{
      if(r.ok){ 
        r.json().then(project => {
          dispatch(setCurrentProject(project))
        });

        setError(null);

      }
      else
        r.json().then(json=>setError(json.error));
    });
    
  };

  return (
    <div className='estimate-form-selector'>
      <form onSubmit={handleSubmit} value={currentDiv?.[0] ? currentDiv[0] : ''}>
        <select onChange={handleSelect} value={divisionId} style={{width: '300px'}} >
          {renderDivisions}
        </select> 
    
        <CostCodeSelector currentDiv={currentDiv} codeId={codeId} setCodeId={setCodeId} />

        {error ? <h5>{error}</h5> : null}

        <button type='submit'>Add Item</button>
      </form>
    </div>
  )
}
