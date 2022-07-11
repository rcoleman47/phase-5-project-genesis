import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, setCurrentSub } from '../Redux/Reducers/subcontractors';


export default function SubBidForm() {
  const subcontractor = useSelector(state => state.subs.currentSub);
  const subs = useSelector(state => state.subs.allSubs);
  const project = useSelector(state => state.projects.currentProject);
  const currentCode = useSelector(state => state.costCodes.currentCode);

  const [error, setError] = useState(null);
  const [subID, setSubID] = useState(subs?.[0].id);
  const [amount, setAmount] = useState(0);
 
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/subcontractors/${subID}`)
    .then(r => r.json())
    .then(sub => {
      dispatch(setCurrentSub(sub))
    });
  }, [subID])


  const renderSubs = subs ? subs?.map(sub => <option key={sub.id} value={sub?.id}>{sub.name}</option> ) : <option>No Current Subcontractors</option>;

  const handleSelect = (e) => {
    setSubID(e.target.value);
  };
  
  const handleChange = (e) => {
    setAmount(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/bids`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        amount: amount,
        cost_code: currentCode?.description,
        project_id: project?.id,
        subcontractor_id: subcontractor?.id,
      })
    })
    .then(r=>{
      if(r.ok){ 
        r.json().then(contact => {
          dispatch(addContact(contact));
        });
      
        setError(null);
      }
      else
        r.json().then(json=>setError(json.error));
    });

  };

  return (
    <div className='project-form-container'>
         
      <form className='new-project-form' style={{width: '37.5%'}} onSubmit={handleSubmit} >

        <label style={{fontWeight: '600'}}>
          Amount:
          <input
            style={{width: '150px', marginLeft: '5px', marginRight: '15px'}}
            name='amount'
            type='number' 
            value={amount} 
            onChange={handleChange}
            />
        </label>

        <label style={{fontWeight: '600'}}>
          Cost Code:
          <input  
            style={{width: '150px', marginLeft: '5px', marginRight: '15px'}}
            name='cost_code'
            type='text' 
            value={currentCode?.description} 
            readOnly
          />
        </label>

        <label style={{fontWeight: '600'}}>
          Subcontractor:
          <select 
            style={{width: '158px', marginLeft: '5px', marginRight: '15px'}}
            name='subcontractor_id'
            type='text' 
            onChange={handleSelect}
            value={subID} >
              {renderSubs}
            </select>
        </label>

        {error ? error.map(e => <h5 style={{color: 'orange', display: 'block'}}>{e}</h5>): null}

        <input style={{marginLeft: '15px'}} type="submit" value="Create Bid" />

      </form>
      
    </div>
  )
}