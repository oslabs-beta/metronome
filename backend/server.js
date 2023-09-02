import express from 'express';
import session from 'express-session'
import ViteExpress from 'vite-express';
import  {use,serializeUser,deserializeUser} from './controller/authControllers';
import {db, dbEmitter} from '../backend/db/sqlmodel.js';
import passport from 'passport-google-oauth2'


const app = express();

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

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));