import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getProjects, addProjects } from '../fetchers/projectFetcher';


function FileUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [projects, setProjects] = useState(["Project1", "Project2"]);
  const [selectedProject, setSelectedProject] = useState('');
  const [query, setQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [showAddProject, setShowAddProject] = useState(false);

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (selectedProject === 'Add project') {
      // Aquí podrías manejar la creación de un nuevo proyecto
      console.log('Create new project', query);
      setProjects([...projects, query]);
      setQuery('');
      setSelectedProject('');
    } else {
      // Aquí podrías manejar la selección de un proyecto existente
      console.log('Selected project', selectedProject);
    }
  };

  useEffect(() => {

    setProjects(getProjects())

    const newFilteredProjects = projects.filter((projects) =>
      projects.toLowerCase().includes(query.toLowerCase())
    );
    setShowAddProject(newFilteredProjects.length === 0);
    setFilteredProjects(newFilteredProjects);
  }, [query, projects]);

  const handleFileChange = (e)  => {
    if (e.target.files) {
        console.log(e.target.files[0])
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    const formData = new FormData()
    formData.append('file', file)
    // 👇 Uploading the file using the fetch API to the server
    // console.log(formData)
    fetch('/api/fileUpload', {
      method: 'POST',
      body: formData, // Convert the file data to JSON string
    // headers: {
    //     'Content-Type': 'application/json'
    //     // 'content-length': `${file.size}`, // 👈 Headers need to be a string
    //   },
    })
      .then((res) => res.json())
      .then((data) => {console.log(data,'this is in fileupload.jsx')
      navigate("/dashboard")})
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       <form className="space-y-6" encType="multipart/form-data">
        <input className="mt-2" type="file"  onChange={handleFileChange} />

        <div className="mt-2">{file && `${file.name} - ${file.type}`}</div>

        <input className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type='submit' onClick={e=>handleUploadClick(e)}/>
      </form> 
      <form onSubmit={handleProjectSubmit}>
      <input
        type="text"
        placeholder="Find project..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
      >
        {filteredProjects.map((projects, index) => (
          <option key={index} value={projects}>
            {projects}
          </option>
        ))}
        {showAddProject && <option value="Add project">Add project</option>}
      </select>
      <button type="submit">Submit</button>
    </form>
    </div>
    </div>
  );
}

export default FileUpload;