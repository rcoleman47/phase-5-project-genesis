import { useSelector, useDispatch } from 'react-redux';
import { setCurrentProject } from '../Redux/Reducers/projects';

export default function Projects() {

  const projects = useSelector(state => state.projects.allProjects);
  const currentProject = useSelector(state => state.projects.currentProject);

  const dispatch = useDispatch();
  

  const renderOptions = projects?.length > 0 ? projects?.map(project => <option key={project.id} value={project.id}>{project.title}</option> ) : <option>No Current Projects</option>;

  const handleSelect = (e) => {
    console.log(e.target.value);
    dispatch(setCurrentProject([...projects].filter(project => project.id === e.target.value)))
  };
  console.log(projects)

  return (
    <div>
      <div>
        <label>Select Project
          <select onChange={handleSelect} value={currentProject?.title}  >
            {renderOptions}
          </select>
        </label>
      </div>


    </div>
  )
}
