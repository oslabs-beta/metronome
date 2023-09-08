import { ChangeEvent, useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);
  const handleFileChange = (e)  => {
    if (e.target.files) {
        console.log(e.target.files[0])
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }
    const formData = new FormData()
    formData.append('file', file)
    // 👇 Uploading the file using the fetch API to the server
    console.log(formData)
    fetch('/api/fileUpload', {
      method: 'POST',
      body: formData, // Convert the file data to JSON string
    // headers: {
    //     'Content-Type': 'application/json'
    //     // 'content-length': `${file.size}`, // 👈 Headers need to be a string
    //   },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
       <form encType="multipart/form-data">
      <input type="file"  onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <input type='submit' onClick={handleUploadClick}/>
      </form> 
    </div>
  );
}

export default FileUpload;