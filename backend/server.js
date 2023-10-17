//added code
import dotenv from 'dotenv';
//end of added code
import express from 'express';
import ViteExpress from 'vite-express';
import multer from 'multer';
import dataController from './controller/dataController.js';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import {db, dbEmitter} from '../backend/db/sqlmodel.js';

import userController from './controller/userController.js';
import cookieController from './controller/cookieController.js';
//added code
import session from 'express-session'
import passport from 'passport'
import { authPassport } from './auth.js'; 

dotenv.config({ path: '../.env' });
//end of added code


import projectRoutes from './routes/projectRoutes.js';
import versionRoutes from './routes/versionRoutes.js'

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());
//added code

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<a href="/test" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ], prompt: 'select_account' }
));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: 'http://127.0.0.1:5173/fileupload',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('http://127.0.0.1:5173/fileupload', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if(err) {return next(err);}
    req.session.destroy(function(err) {
      if(err) {return next(err);}
      res.redirect('http://127.0.0.1:5173');
    });
  });
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});
//end of added code

// Set up storage for uploaded files
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/versions', versionRoutes);
app.get('/api/dashboard/metrics', dataController.getMetrics,(req,res)=>{
  console.log(res.locals.metricsData,'i am in the server')
  return res.status(200).json(res.locals.metricsData);
}); // TODO

app.post('/api/fileUpload', upload.single('file'), dataController.getJsonFile, (req, res) => {
  return res.status(200).json(res.locals.JsonFile);
  });

  app.post('/api/users/register', userController.createUser, (req, res) =>{
    res.json('created user');
  });

  app.post('/api/users/login', userController.getUser, cookieController.setCookie, (req, res)=>{
    res.status(200).json(req.cookies);
  });

  app.get('/api/check-session', cookieController.verifyCookie, (req, res) =>{
    res.status(200).json(req.cookies);
  })

  app.post('/saveData',(req,res)=>{
    console.log('testing from extension', req.body);
    res.status(200).send('ok');
  })

dbEmitter.on("dbConnected", () => {
    console.log("Server is listening...");
  });

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));