// import express from 'express';
// import ViteExpress from 'vite-express';
// import multer from 'multer';
// import dataController from './controller/dataController.js';
// import cors from 'cors';
// import cookieParser from 'cookie-parser'
// import {db, dbEmitter} from '../backend/db/sqlmodel.js';
// import session from 'express-session'
// import userController from './controller/userController.js';
// import cookieController from './controller/cookieController.js';
// //added code
// const passport = require('passport');
// import auth from './auth';
// //end of added code

// const app = express();

//added code
// app.use(passport.initialize());
// app.use(passport.session());


// function isLoggedIn(req, res, next) {
//   req.user ? next() : res.sendStatus(401);
// }
// app.get('/',(req,res) => {
//   res.send('<a href="/auth/google">Authentication with Google</a>')
// });
// //have button on front end that makes a req on this endpoint on line 28
// //check components folder for login component
// app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile']}))

// app.get('/google/callback', passport.authenticate('google', {
//   sucessRedirect: '/protected',
//   failureRedirect: '/auth/failure',
// })
// );

// app.get('/auth/failure', (req,res) => {
//   res.send('something went wrong...')
// });

// app.get('/protected', isLoggedIn, (req,res) => {
//   res.send(`Hello, ${req.user.displayName}!`);
// });

//end of added code


// //added code for log out
// app.get('/logout', (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.send('Goodbye!');
// });

//added code
// function isLoggedIn(req, res, next) {
//   req.user ? next() : res.sendStatus(401);
// }

// app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/', (req, res) => {
//   res.send('<a href="/auth/google">Authenticate with Google</a>');
// });

// app.get('/auth/google',
//   passport.authenticate('google', { scope: [ 'email', 'profile' ] }
// ));

// app.get( '/auth/google/callback',
//   passport.authenticate( 'google', {
//     successRedirect: '/protected',
//     failureRedirect: '/auth/google/failure'
//   })
// );

// app.get('/protected', isLoggedIn, (req, res) => {
//   res.send(`Hello ${req.user.displayName}`);
// });

// app.get('/logout', (req, res) => {
//   req.logout(function(err) {
//     if(err) {return next(err);}
//     res.redirect('/');
//   });
//   req.session.destroy();
//   res.send('Goodbye!');
// });

// app.get('/auth/google/failure', (req, res) => {
//   res.send('Failed to authenticate..');
// });

//end of added code

// app.use(express.urlencoded({ extended: true }));
// app.use(cors({ credentials: true, origin: true }));
// app.use(express.json());
// app.use(cookieParser());
// // Set up storage for uploaded files
// const storage = multer.memoryStorage(); // Store the file in memory
// const upload = multer({ storage });

// app.use(express.json());
// app.get("/message", (_, res) => res.send("Hello from express!"));

// app.get('/api/dashboard/metrics', dataController.getMetrics,(req,res)=>{
//   console.log(res.locals.metricsData,'i am in the server')
//   return res.status(200).json(res.locals.metricsData);
// }); // TODO

// app.post('/api/fileUpload', upload.single('file'), dataController.getJsonFile, (req, res) => {
//   return res.status(200).json(res.locals.JsonFile);
//   });

//   app.post('/api/users/register', userController.createUser, (req, res) =>{
//     res.json('created user');
//   });

//   app.post('/api/users/login', userController.getUser, cookieController.setCookie, (req, res)=>{
//     res.status(200).json(req.cookies);
//   });

//   app.get('/api/check-session', cookieController.verifyCookie, (req, res) =>{
//     res.status(200).json(req.cookies);
//   })

//   app.post('/saveData',(req,res)=>{
//     console.log('testing from extension', req.body);
//     res.status(200).send('ok');
//   })

// dbEmitter.on("dbConnected", () => {
//     console.log("Server is listening...");
//   });

// ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));

import express from 'express';
import ViteExpress from 'vite-express';
import multer from 'multer';
import dataController from './controller/dataController.js';
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

app.use(express.json());
app.get("/message", (_, res) => res.send("Hello from express!"));

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