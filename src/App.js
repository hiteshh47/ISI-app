import './App.css';
//These imports are for file upload
// import { useState } from 'react';
import { saveAs } from 'file-saver';
// import React from 'react';

//These imports are for visualizeimg.js file
import React, { useState, useEffect } from "react";
import { getNotebookImageSrc } from './visualizeimg';

//Main function for app.js
function App() {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);

  function handleFile(event) {
    setFile(event.target.files[0]);
  }

  function handleUpload(event) {
    event.preventDefault(); // prevent default form submission

    if (!file) {
      console.error('No file selected!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('url-to-upload-file', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to upload file');
        }
        return response.blob();
      })
      .then((blob) => {
        saveAs(blob, file.name); // Download the file as a blob

        // Read the contents of the file
        const reader = new FileReader();
        reader.readAsText(blob);
        reader.onload = (event) => {
          setFileContent(event.target.result); // Set the file content
        };
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });


  }
  //Code to import code from visualizeimg.js for displaying an image file from notebook's visualization
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    fetch("path/to/your/ipynb/file.ipynb")
      .then((response) => response.json())
      .then((data) => {
        const image = data["outputs"].find(
          (output) => output["output_type"] === "display_data"
        )["data"]["image/png"];
        setImageSrc("data:image/png;base64," + image);
      });
  }, []);

  //Our final displayable
  return (
    <div className="App">
      <h1>ISI Data-Cleanse</h1>
      <hr></hr>
      <form onSubmit={handleUpload}>
        <h4>Choose the file to be analyzed</h4>
        <input type="file" name="file" onChange={handleFile} />
        <button id="uploader">Upload File</button>
        <hr></hr>
      </form>
      {file && (
        <div>
          <h4>Selected File: {file && file.name}</h4>

        </div>
      )}
      {fileContent && (
        <div>
          <h4>File Content:</h4>
          <p>{fileContent}</p>
        </div>
      )}
      {/* This code is to return the notebook image */}

      <div>
        <img src={imageSrc} alt="Notebook visualization" />
      </div>

    </div>

    // This code is to return the notebook image

  );
}

export default App;
