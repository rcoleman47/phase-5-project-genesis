import { useSelector } from 'react-redux';

export default function Projects() {

  const projects = useSelector(state => state.projects.value);

  const renderOptions = projects?.length > 0 ? projects?.map(project => <option key={project.id} value={project.title}>{project.title}</option> ) : <option>No Current Projects</option>

  const first = projects?.[0]
  
  const handleSelect = (e) => {
    console.log(e.target.value)
    // fetch(`/projects/${e.target.value.id}`)
  };

  return (
    <div>
      <div>
        <label>Select Project
          <select onChange={handleSelect} value={first?.title}  >
            {renderOptions}
          </select>
        </label>
      </div>


    </div>
  )
}
