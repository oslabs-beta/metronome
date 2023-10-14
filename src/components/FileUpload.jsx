import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Projects from './Projects';


function FileUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileAdded, setFileAdded] = useState(false)

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
    fetch('/api/fileUpload', {
      method: 'POST',
      body: formData, // Convert the file data to JSON string
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
      <Projects fileAdded={fileAdded}/> 
    </div>
    </div>
  );
}

export default FileUpload;