import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProjectBid } from '../Redux/Reducers/projects';
import { setCurrentSub } from '../Redux/Reducers/subcontractors';


export default function SubBidForm() {
  const subcontractor = useSelector(state => state.subs.currentSub);
  const subs = useSelector(state => state.subs.allSubs);
  const project = useSelector(state => state.projects.currentProject);

  const [error, setError] = useState(null);
  const [subID, setSubID] = useState(subs?.[0].id);
  const [projectID, setProjectID] = useState(project?.id)
  const [bidForm, setBidForm] = useState({
    amount: 0,
    cost_code: '',
  });
 
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {setProjectID(project.id);}, 0);
  }, [project.id])

  useEffect(() => {
    fetch(`/subcontractors/${subID}`)
    .then(r => r.json())
    .then(sub => {
      dispatch(setCurrentSub(sub))
    });
  }, [subID, dispatch]);

  const renderSubs = subs ? [...subs]?.sort((a, b)=> a.trade.localeCompare(b.trade)).map(sub => <option key={sub.id} value={sub?.id}>{sub.name}: {sub.trade}</option> ) : <option>No Current Subcontractors</option>;

  const handleSelect = (e) => {
    setSubID(e.target.value);
  };

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setBidForm({
      ...bidForm,
      [key]: value
    })
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/bids`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        amount: bidForm.amount,
        cost_code: bidForm.cost_code,
        project_id: projectID,
        subcontractor_id: subcontractor?.id,
      })
    })
    .then(r=>{
      if(r.ok){ 
        r.json().then(bid => {
          dispatch(addProjectBid(bid))
        });
        setError(null);
      }
      else
      r.json().then(json=>alert(json.error));
    });
  };

  return (
    <div className='project-form-container'>
         
      <form className='new-project-form' style={{width: '37.5%', marginBottom: '25px'}} onSubmit={handleSubmit} >

        <label style={{fontWeight: '800'}}>
          Bid Amount:  
          <input
            style={{width: '150px', marginLeft: '5px', marginRight: '15px'}}
            name='amount'
            type='number' 
            value={bidForm.amount} 
            onChange={handleChange}
            />
        </label>

        <label style={{fontWeight: '800'}}>
          Description:
          <input  
            style={{width: '150px', marginLeft: '5px', marginRight: '15px'}}
            name='cost_code'
            type='text' 
            value={bidForm.cost_code}
            placeholder='Enter Bid Description' 
            onChange={handleChange}
          />
        </label>

        <label style={{fontWeight: '800'}}>
          Subcontractor:
          <select 
            style={{width: '158px', marginLeft: '5px', marginRight: '15px'}}
            name='subcontractor_id'
            type='text' 
            onChange={handleSelect}
            value={subID == null ? 'null' : subID} >
              {renderSubs}
            </select>
        </label>

        {error ?  <h5 style={{color: 'orange', display: 'block'}}>{error}</h5> : null}

        <input style={{marginLeft: '15px'}} type="submit" value="Create Bid" />

      </form>
      
    </div>
  )
}