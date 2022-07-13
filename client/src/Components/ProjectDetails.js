import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setCurrentProject, setProjectId } from '../Redux/Reducers/projects';
import ProjectTeamTable from './ProjectTeamTable';
import ProjectBidTable from './ProjectBidTable';
import ProjectUserForm from './ProjectUserForm';
import SubBidForm from './SubBidForm';

export default function ProjectTeam() {
  const [addUser, setAddUser] = useState(true);
  const [addBid, setAddBid] = useState(true);

  const project = useSelector(state => state.projects.currentProject);
  const projects = useSelector(state => state.projects.allProjects);
  const projectId = useSelector(state => state.projects.projectId);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/projects/${projectId}`)
    .then(r => r.json())
    .then(project => dispatch(setCurrentProject(project)));
  }, [projectId, dispatch])

  const renderOptions = projects?.length > 0 ? projects?.slice().sort((a, b) => {
    return a.title.localeCompare(b.title)
  }).map(project => <option key={project.id} value={project.id}>{project.title}</option> ) : <option>No Current Projects</option>;

  const handleSelect = (e) => {
    dispatch(setProjectId(e.target.value))
  };

  const handleUserClick = (e) => {
    setAddUser(!addUser)
  };

  const handleBidClick = (e) => {
    setAddBid(!addBid)
  };

  const addUserButton = addUser ? 'Add to Team' : 'Remove Form';

  const addBidButton = addBid ? 'Enter Bid' : 'Remove Form';

  const renderUserButton = projects?.length > 0 ? <button onClick={handleUserClick}>{addUserButton}</button> : '';

  const renderBidButton = projects?.length > 0 ? <button style={{margin: '0 0 15px 310px'}} onClick={handleBidClick}>{addBidButton}</button> : '';


  const renderProjectTeam = project?.users ? <ProjectTeamTable projectUsers={project.users} projectName={project.name} /> : <h3 style={{background: 'white',alignSelf: 'center', color: 'orange'}}>No Team Assigned to Project</h3>;

  const renderSubBids = project?.bids ? <ProjectBidTable projectBids={project.bids} projectName={project.name} /> : <h3 style={{background: 'white',alignSelf: 'center', color: 'orange'}}>No Subcontractor Bids for this Project</h3>;


  return (
    <>
      <div style={{marginLeft: '30%', height: '100px'}}>
        <h1 style={{textAlign: 'center', background: 'white', width: '50%'}}>{project.title}</h1>
      </div>
      <div>
        <select onChange={handleSelect} style={{width: '100px'}} value={projectId} >
          {renderOptions}
         </select>
        {renderUserButton}
      </div>
     
      {addUser ? '' : <ProjectUserForm setAddUser={setAddUser} />}

      {renderProjectTeam}

      <div style={{marginLeft: '45%', height: '100px'}}>
        <h1 style={{textAlign: 'center', background: 'white', width: '10%'}}>Bids</h1>
      </div>
      <div>
        {renderBidButton}
        {addBid ? '' : <SubBidForm project={project} setAddBid={setAddBid} />}
      </div>

      {renderSubBids}

    </>
  )
}