import { useSelector } from 'react-redux';

export default function Projects() {

  const projects = useSelector(state => state.projects.value);

  const renderOptions = projects ? projects.map(project => <option key={project.id} value={project.title}>{project.title}</option> ) : <option>No Projects</option>;

  const handleSelect = (e) => {
    console.log(e.target.value)
    // fetch(`/projects/${e.target.value.id}`)
  };

  return (
    <div>
      <div>
        <label>Select Project
          <select onChange={handleSelect} value={projects?.[0].title}  >
            {renderOptions}
          </select>
        </label>
      </div>


    </div>
  )
}
