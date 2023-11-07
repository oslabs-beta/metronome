import React from 'react'
import { ChangeEvent, useState, useEffect } from 'react';
import { getVersions, addVersions, setVersion} from '../fetchers/versionFetcher';

function Versions({showVersion, showFinalSubmit, setShowFinalSubmit}) {
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [versionQuery, setVersionQuery] = useState('');
  const [filteredVersions, setFilteredVersions] = useState(versions);
  const [showAddVersion, setShowAddVersion] = useState(false);
  const [hideForm, setHideForm] = useState(false)
  const [versionSuccess, setVersionSuccess] = useState('')

  const handleVersionSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedVersion)
    if (selectedVersion === 'Add version') {
      // Add new version logic
      await addVersions({version_name: versionQuery})
      setVersionSuccess(`Successfully created and selected version: '${versionQuery}'`)
      setHideForm(true)
      setShowFinalSubmit(true)
    } else {
      // Existing version
      await setVersion({version_name: selectedVersion});
      setVersionSuccess(`Successfully selected version: '${selectedVersion}'`)
      setHideForm(true)
      setShowFinalSubmit(true)
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
    if (newFilteredVersions.length === 1) {
        setSelectedVersion(newFilteredVersions[0]);
    }
    }, [versionQuery, versions]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    {showVersion && <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <form hidden={hideForm} onSubmit={handleVersionSubmit} className="space-y-6">
    <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-sky-400">Select or create a new version:</h1>    
    <input
      type="text"
      placeholder="Add a new project"
      value={versionQuery}
      onChange={(e) => setVersionQuery(e.target.value)}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
    {!showAddVersion && <select
      value={selectedVersion}
      onChange={(e) => {
        setSelectedVersion(e.currentTarget.value)}}
    >
      {filteredVersions.map((version, index) => (
        <option key={index} value={version}>
          {version}
        </option>
      ))}
    </select>
      }
      {!showAddVersion && <button type="submit">Select</button>}
    {showAddVersion && <button onClick={() => setSelectedVersion('Add version')}>Add project</button>}
  </form>
  {hideForm && <h2>{versionSuccess}</h2>}
  </div>}
  </div>
  )
}

export default Versions