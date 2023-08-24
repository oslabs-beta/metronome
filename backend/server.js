import express from 'express';
import ViteExpress from 'vite-express';

import {db, dbEmitter} from '../backend/db/sqlmodel.js';

const app = express();

app.get("/message", (_, res) => res.send("Hello from express!"));

dbEmitter.on("dbConnected", () => {
    console.log("Server is listening...");
  });

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));