import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getProjects, addProjects } from '../fetchers/projectFetcher';
import { getVersions } from '../fetchers/versionFetcher';


function FileUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileAdded, setFileAdded] = useState(false)
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [projectQuery, setProjectQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [showAddProject, setShowAddProject] = useState(false);
  const [versions, setVersions] = useState([])
  

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    console.log(selectedProject)
    if (selectedProject === 'Add project') {
      // Add new project logic
      console.log("adding new project", projectQuery)
      addProjects({project_name: projectQuery})
      // setProjectQuery('');
      // setSelectedProject('');
    } else {
      // Existing project
      console.log('Selected project', selectedProject);
      //fetchVersions from that project
      const fetchVersions = async () => {
        const fetchedVersions = await getVersions();
        setVersions(fetchedVersions);
      };
      fetchVersions(); 
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

  const handleFileChange = (e)  => {
    if (e.target.files) {
        console.log(e.target.files[0])
      setFile(e.target.files[0]);
      setFileAdded(true);
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
      {fileAdded && <form onSubmit={handleProjectSubmit}>
      <input
        type="text"
        placeholder="Find project..."
        value={projectQuery}
        onChange={(e) => setProjectQuery(e.target.value)}
      />
      <select
        value={selectedProject}
        onChange={(e) => {
          console.log('Selected value:', e.target.value);
          setSelectedProject(e.target.value)}}
      >
        {filteredProjects.map((projects, index) => (
          <option key={index} value={projects}>
            {projects}
          </option>
        ))}
        {showAddProject && <option value="Add project">Add project</option>}
      </select>
      <button type="submit">Select</button>
    </form>}
    </div>
    </div>
  );
}

export default FileUpload;