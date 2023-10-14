import React from 'react'
import { ChangeEvent, useState, useEffect } from 'react';
import { getVersions, addVersions} from '../fetchers/versionFetcher';

function Versions({showVersion}) {
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [versionQuery, setVersionQuery] = useState('');
  const [filteredVersions, setFilteredVersions] = useState(versions);
  const [showAddVersion, setShowAddVersion] = useState(false);

  const handleVersionSubmit = (e) => {
    e.preventDefault();
    console.log(selectedVersion)
    if (selectedVersion === 'Add version') {
      // Add new version logic
      console.log("adding new version", versionQuery)
      addVersions({project_name: versionQuery})
      // setProjectQuery('');
      // setSelectedProject('');
    } else {
      // Existing version
      console.log('Selected version', selectedVersion);
      }
    }

useEffect(() => {
    const fetchVersions = async () => {
        const fetchedVersions = await getVersions();
        setVersions(fetchedVersions);
    };
    fetchVersions();
    }, []);
    
useEffect(()=>{
        const newFilteredVersions = versions.filter((version) =>
        version.toLowerCase().includes(versionQuery.toLowerCase())
    );
    setShowAddVersion(newFilteredVersions.length === 0);
    setFilteredVersions(newFilteredVersions);
    }, [versionQuery, versions]);

  return (
    <div>
    {showVersion && <form onSubmit={handleVersionSubmit}>
    <input
      type="text"
      placeholder="Add a new project"
      value={versionQuery}
      onChange={(e) => setVersionQuery(e.target.value)}
    />
    {!showAddVersion && <select
      value={selectedVersion}
      onChange={(e) => {
        console.log('Selected value:', e.currentTarget.value);
        setSelectedVersion(e.currentTarget.value)}}
    >
      {filteredVersions.map((project, index) => (
        <option key={index} value={project}>
          {project}
        </option>
      ))}
    </select>
      }
      {!showAddVersion && <button type="submit">Select</button>}
    {showAddVersion && <button onClick={() => setSelectedVersion('Add project')}>Add project</button>}
  </form>}</div>
  )
}

export default Versions