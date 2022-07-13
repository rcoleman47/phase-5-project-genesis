import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setSubs } from '../Redux/Reducers/subcontractors';
import SubDirectoryTable from './SubDirectoryTable';
import SubPagination from './SubPagination';
import NewSubForm from './NewSubForm';


export default function SubDirectory() {
  const [subSort, setSubSort] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [subsPerPage] = useState(2);
  const [addSub, setAddSub] = useState(true);

  const subcontractors = useSelector(state => state.subs.allSubs);

  const dispatch = useDispatch();

  const handleSubSort = (e) => {
    setSubSort(e.target.value);
  };

  useEffect(() => {
    fetch('/subcontractors')
    .then(r => r.json())
    .then(subs => {
      dispatch(setSubs(subs))
    })
  }, [dispatch]);

  const handleClick = (e) => {
    setAddSub(!addSub)
  };

  const totalSubs = subcontractors?.length
  const indexOfLastSub = currentPage * subsPerPage;
  const indexOfFirstSub = indexOfLastSub - subsPerPage;

  const currentSubs = subcontractors?.length ? [...subcontractors].sort((a, b) => {
    if(subSort === 'name'){
      return a.name.localeCompare(b.name);
    } else if(subSort === 'trade'){
        return a.trade.localeCompare(b.trade);
    } else{
        return a.id - b.id
      }
    })?.slice(indexOfFirstSub, indexOfLastSub) : undefined;


  const paginate = (number) => setCurrentPage(number);

  const buttonText = addSub ? 'Add Subcontractor' : 'Remove Form';

  const renderSubDirectory = currentSubs ? [...currentSubs].map(sub =>  <SubDirectoryTable key={sub.id} subcontractor={sub} />) : <h1 style={{alignSelf: 'center', color: 'orange'}}>Add Subcontractors and Contacts</h1>;

  return (
    <>
      <div >
        <select onChange={handleSubSort} value={subSort}>
          <option value='name' >Name</option>
          <option value='trade' >Trade</option>
        </select>

        <button onClick={handleClick} >{buttonText}</button>
      </div>

      {addSub ? '' : <NewSubForm setAddSub={setAddSub} />}

      {renderSubDirectory}

      <SubPagination 
        subsPerPage={subsPerPage} 
        totalSubs={totalSubs} 
        paginate={paginate} />
    </>
  )
}