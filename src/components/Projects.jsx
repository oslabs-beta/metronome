import React from 'react'
import { ChangeEvent, useState, useEffect } from 'react';
import { getProjects, addProjects, setProject } from '../fetchers/projectFetcher';
import Versions from './Versions';

function Projects({showFinalSubmit, setShowFinalSubmit}) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [projectQuery, setProjectQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showVersion, setShowVersion] = useState(false)
  const [hideForm, setHideForm] = useState(false)
  const [projectSuccess, setProjectSuccess] = useState('')

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedProject)
    if (selectedProject === 'Add project') {
      // Add new project logic
      await addProjects({project_name: projectQuery})
      setProjectSuccess(`Successfully created and selected project: '${projectQuery}'`)
      setHideForm(true)
      setShowVersion(true)
    } else {
      // Existing project
      await setProject({project_name: selectedProject});
      setProjectSuccess(`Successfully selected project: '${selectedProject}'`)
      setHideForm(true)
      setShowVersion(true)
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
    if (newFilteredProjects.length === 1) {
        setSelectedProject(newFilteredProjects[0]);
    }
    }, [projectQuery, projects]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">   
    <form hidden={hideForm} onSubmit={handleProjectSubmit}>
    <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-sky-400">Select or create a new project:</h1>    
    <input
      type="text"
      placeholder="Add a new project"
      value={projectQuery}
      onChange={(e) => setProjectQuery(e.target.value)}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
    {!showAddProject && <select
      value={selectedProject}
      onChange={(e) => {
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
  {hideForm && <h2>{projectSuccess}</h2>}
  {hideForm && <Versions showVersion={showVersion} showFinalSubmit={showFinalSubmit} setShowFinalSubmit={setShowFinalSubmit}/> }
  </div>
  </div>
  )
}

export default Projects