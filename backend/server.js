import express from 'express';
import ViteExpress from 'vite-express';
import multer from 'multer';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import {db, dbEmitter} from '../backend/db/sqlmodel.js';

import userController from './controller/userController.js';
import cookieController from './controller/cookieController.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());
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
      const jsonData = JSON.parse(uploadedFile.buffer.toString());
      res.json(jsonData);
      }
     catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  app.post('/api/users/register', userController.createUser, (req, res) =>{
    res.json('created user');
  });

  app.post('/api/users/login', userController.getUser, cookieController.setCookie, (req, res)=>{
    res.json('logged in and cookie set');
  });

  app.get('api/check-session', cookieController.verifyCookie, (req, res) =>{
    res.status(200).send("ok");
  })

dbEmitter.on("dbConnected", () => {
    console.log("Server is listening...");
  });

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));