import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTeamMember, setUser } from '../Redux/Reducers/projects';


export default function ProjectUserForm({setAddUser}) {
  const project = useSelector(state => state.projects.currentProject);
  const users = useSelector(state => state.company.users);
  const currentUser = useSelector(state => state.projects.currentProjectUser);

  
  // const [error, setError] = useState(null);
  const [userID, setUserID] = useState(users?.[0].id);
  
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetch(`http://127.0.0.1:3000/users/${userID}`)
    .then(r => r.json())
    .then(user => {
      dispatch(setUser(user))
    });
  }, [userID, dispatch]);

  const renderUsers = users ? users?.map(user => <option key={user.id} value={user?.id}>{user.first_name} {user.last_name}</option> ) : <option>No Current Users</option>;

  const handleSelect = (e) => {
    setUserID(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://127.0.0.1:3000/user_projects`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: currentUser?.id,
        project_id: project?.id,
      })
    })
    .then(r=>{
      if(r.ok){ 
        r.json().then(userProject => {
          dispatch(addTeamMember(userProject.user))
        });
        // setError(null);
      }
      else
      r.json().then(json=>alert(json.error));
    });
  };

  return (
    <div className='project-form-container' >
         
      <form className='new-project-form' style={{width: '20%', marginTop: '15px', marginRight: '60px'}} onSubmit={handleSubmit} >

        <label style={{fontWeight: '800'}}>
          Team Member:
          <select 
            style={{width: '158px', marginLeft: '5px', marginRight: '15px'}}
            name='subcontractor_id'
            type='text' 
            onChange={handleSelect}
            value={userID} >
              {renderUsers}
            </select>
        </label>

        {/* {error ?  <h5 style={{color: 'orange', display: 'block'}}>{error}</h5> : null} */}

        <input style={{width: '120px', marginLeft: '15px'}} type="submit" value="Add To Project" />

      </form>
      
    </div>
  )
}