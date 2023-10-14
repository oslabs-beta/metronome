import React from 'react'
import { ChangeEvent, useState, useEffect } from 'react';
import { getProjects, addProjects, setProject } from '../fetchers/projectFetcher';
import Versions from './Versions';

function Projects({fileAdded}) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [projectQuery, setProjectQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showVersion, setShowVersion] = useState(false)

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    console.log(selectedProject)
    if (selectedProject === 'Add project') {
      // Add new project logic
      console.log("adding new project", projectQuery)
      addProjects({project_name: projectQuery})
      setProjectQuery('');
      setSelectedProject('');
    } else {
      // Existing project
      console.log('Selected project', selectedProject);
      setProject({project_name: selectedProject});

      }
    };

useEffect(() => {
    const fetchProjects = async () => {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
    };
    fetchProjects();
    }, []);
    
useEffect(()=>{
        const newFilteredProjects = projects.filter((project) =>
        project.toLowerCase().includes(projectQuery.toLowerCase())
    );
    setShowAddProject(newFilteredProjects.length === 0);
    setFilteredProjects(newFilteredProjects);
    }, [projectQuery, projects]);

  return (
    <div>
    {fileAdded && <div><form onSubmit={handleProjectSubmit}>
    <input
      type="text"
      placeholder="Add a new project"
      value={projectQuery}
      onChange={(e) => setProjectQuery(e.target.value)}
    />
    {!showAddProject && <select
      value={selectedProject}
      onChange={(e) => {
        console.log('Selected value:', e.currentTarget.value);
        setSelectedProject(e.currentTarget.value)}}
    >
      {filteredProjects.map((project, index) => (
        <option key={index} value={project}>
          {project}
        </option>
      ))}
    </select>
      }
      {!showAddProject && <button type="submit">Select</button>}
    {showAddProject && <button onClick={() => setSelectedProject('Add project')}>Add project</button>}
  </form>
  {/* <Versions showVersion={showVersion}/>  */}
  </div>}
  </div>
  )
}

export default Projects