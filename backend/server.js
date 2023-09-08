import express from 'express';
import ViteExpress from 'vite-express';
import multer from 'multer';
import dataController from './controller/dataController.js';

import {db, dbEmitter} from '../backend/db/sqlmodel.js';

const app = express();
// Set up storage for uploaded files
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

app.use(express.json());
app.get("/message", (_, res) => res.send("Hello from express!"));

app.get('/api/dashboard/metrics', dataController.getMetrics,(req,res)=>{
  console.log(res.locals.metricsData,'i am in the server')
  return res.status(200).json(res.locals.metricsData);
}); // TODO

app.post('/api/fileUpload', upload.single('file'), dataController.getJsonFile, (req, res) => {
    // try {
    //   const uploadedFile = req.file
//   if (!uploadedFile) {
    //     return res.status(400).json({ error: 'No file uploaded' });
    //   }
    //   const jsonData = JSON.parse(uploadedFile.buffer.toString());
    //   res.json(jsonData);
    //   }
    //  catch (error) {
    //   console.error(error);
    //   res.status(500).json({ error: 'An error occurred' });
    // }
// console.log(res.locals.JsonFile,'i am in server.js fileupload');
  return res.status(200).json(res.locals.JsonFile);

  });

  //get overview data which are res.locals.version and totalRender

dbEmitter.on("dbConnected", () => {
    console.log("Server is listening...");
  });

  // Function to calculate the total rendering time for a component
  function calculateTotalRenderTime(componentData) {
    return componentData.reduce((totalTime, measure) => totalTime + measure.duration, 0);
  }

ViteExpress.listen(app, 3000, () => console.log("Server is listening...")); 