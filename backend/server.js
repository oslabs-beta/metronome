import express from 'express';
import session from 'express-session'
import ViteExpress from 'vite-express';
import "dotenv/config"
import multer from 'multer';
import {db, dbEmitter} from '../backend/db/sqlmodel.js';
import passport from 'passport-google-oauth2'


const app = express();

app.get("/message", (_, res) => res.send("Hello from express!"));

//added code
app.use(passport.initalize());
app.use(passport.session());

import auth from "./auth.js"
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
app.get('/',(req,res) => {
  res.send('<a href="/auth/google">Authentication with Google</a>')
});
//have button on front end that makes a req on this endpoint on line 28
//check components folder for login component
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile']}))

app.get('/google/callback', passport.authenticate('google', {
  sucessRedirect: '/protected',
  failureRedirect: '/auth/failure',
})
);

app.get('/auth/failure', (req,res) => {
  res.send('something went wrong...')
});

app.get('/protected', isLoggedIn, (req,res) => {
  res.send(`Hello, ${req.user.displayName}!`);
});

//end of added code

app.post('/api/fileUpload', upload.single('file'), (req, res) => {
    try {
      const uploadedFile = req.file;
  
}));

app.use(passport.initalize());

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
//end of added code


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
//end of added code


dbEmitter.on("dbConnected", () => {
    console.log("Server is listening...");
  });

  // Function to calculate the total rendering time for a component
  function calculateTotalRenderTime(componentData) {
    return componentData.reduce((totalTime, measure) => totalTime + measure.duration, 0);
  }

  //added code for log out
app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
})

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));