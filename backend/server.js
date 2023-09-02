import express from 'express';
import session from 'express-session'
import ViteExpress from 'vite-express';
import  {use,serializeUser,deserializeUser} from './controller/authControllers';
import multer from 'multer';

import {db, dbEmitter} from '../backend/db/sqlmodel.js';
import passport from 'passport-google-oauth2'


const app = express();
// Set up storage for uploaded files
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

app.get("/message", (_, res) => res.send("Hello from express!"));

//added code
function isLoggedIn(req,res,next){
  req.user?next():res.sendStatus(401);
}
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUnitalized: true,
  cookie: {secure: false}
  
}));

app.use(passport.initalize());
app.use(passport.session());
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/google/failure'
}));

app.get('/auth/google/failure', (req,res)=> {
  res.send('Something went wrong')
}) 

app.get('/auth/protected',isLoggedIn, (req,res)=> {
  let name = req.user.displayName;

  res.send(`Hello ${name}`);
}); 

//logout route
app.use('/auth/logout', (req,res) => {
  req.session.destroy();
  res.send("See you again!");
})
//end of added code


//added code
function isLoggedIn(req,res,next){
  req.user?next():res.sendStatus(401);
}
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUnitalized: true,
  cookie: {secure: false}
  
}));

app.use(passport.initalize());
app.use(passport.session());
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/google/failure'
}));

app.get('/auth/google/failure', (req,res)=> {
  res.send('Something went wrong')
}) 

app.get('/auth/protected',isLoggedIn, (req,res)=> {
  let name = req.user.displayName;

  res.send(`Hello ${name}`);
}); 

//logout route
app.use('/auth/logout', (req,res) => {
  req.session.destroy();
  res.send("See you again!");
})
//end of added code


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

dbEmitter.on("dbConnected", () => {
    console.log("Server is listening...");
  });

  // Function to calculate the total rendering time for a component
  function calculateTotalRenderTime(componentData) {
    return componentData.reduce((totalTime, measure) => totalTime + measure.duration, 0);
  }

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));