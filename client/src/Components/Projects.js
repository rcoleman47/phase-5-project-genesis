import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import ProjectTable from './ProjectTable';

export default function Projects() {
  const projects = useSelector(state => state.projects.allProjects);
  const [selectTitle, setSelectTitle] = useState(projects?.[0].title)

  console.log(projects)

  const renderOptions = projects?.length > 0 ? projects?.map(project => <option key={project.id} value={project.title}>{project.title}</option> ) : <option>No Current Projects</option>;

  const currentProject = projects?.length ? [...projects].find(project => project.title === selectTitle) : projects;

  const handleSelect = (e) => {
    setSelectTitle(e.target.value)

  };

  return (
    <div>
      <div>
        <label>Select Project
            <select onChange={handleSelect} value={selectTitle}  >
              {renderOptions}
            </select>
        </label>
      </div>
      <ProjectTable currentProject={currentProject} selectTitle={selectTitle} />

    </div>
  )
}
