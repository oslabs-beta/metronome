import passport from 'passport'
import {Strategy as GoogleStrategy } from 'passport-google-oauth2';
import User from
import dotenv from 'dotenv'
require('dotenv').config()

const use = passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    done(null, profile);
  }
)
);

const serializeUser = passport.serializeUser((user, done) => {
    done(null,user)
});

const deserializeUser = passport.deserializeUser((user,done) => {
    done(null,user);
})

export default {use,serializeUser,deserializeUser};