import express from 'express';
import ViteExpress from 'vite-express';
import multer from 'multer';

import {db, dbEmitter} from '../backend/db/sqlmodel.js';

const app = express();
// Set up storage for uploaded files
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

app.get("/message", (_, res) => res.send("Hello from express!"));

app.post('/api/fileUpload', upload.single('file'), (req, res) => {
    try {
      const uploadedFile = req.file;
  
      if (!uploadedFile) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
    //   console.log(uploadedFile.buffer.toString())
      const jsonData = JSON.parse(uploadedFile.buffer.toString());
      console.log(jsonData)
      // Assuming you have the JSON data stored in a variable called 'jsonData'
    //   console.log(jsonData.dataForRoots[0].commitData.updaters);
  
  // Extract version information
//   const reactVersion = jsonData.timelineData[0].reactVersion;
  
//   // Extract dataForRoots
//   const rootComponents = jsonData.dataForRoots;
  
//   // Extract componentMeasures
//   const componentMeasures = jsonData.componentMeasures;
  
//   // Calculate total rendering time for each component
//   const componentRenderTimes = {};
//   for (const componentId in componentMeasures) {
//     const componentData = componentMeasures[componentId];
//     componentRenderTimes[componentId] = calculateTotalRenderTime(componentData);
//   }
  
  // Display human-readable values
//   console.log(`React Version: ${reactVersion}`);
  
//   for (const rootId in rootComponents) {
//     const rootComponent = rootComponents[rootId];
//     console.log(`Root Component ${rootId}:`);
//     console.log(`- Total Render Time: ${rootComponent.totalActualDuration} ms`);
//     console.log(`- Total Commits: ${rootComponent.commits.length}`);
//   }
  
//   for (const componentId in componentRenderTimes) {
//     console.log(`Component ${componentId}:`);
//     console.log(`- Total Render Time: ${componentRenderTimes[componentId]} ms`);
//   }
  
      res.json({ message: 'File uploaded and logged successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

dbEmitter.on("dbConnected", () => {
    console.log("Server is listening...");
  });

  // Function to calculate the total rendering time for a component
  function calculateTotalRenderTime(componentData) {
    return componentData.reduce((totalTime, measure) => totalTime + measure.duration, 0);
  }

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));