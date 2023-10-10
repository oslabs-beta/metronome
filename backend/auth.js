// import passport from 'passport-google-oauth2'
// const passport = require('passport');
import "dotenv/config"
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
import GoogleStrategy from "passport-google-oauth2"
// const GoogleStrategy = require('passport-google-oauth2');
import passport from 'passport';




passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});

export default { passport};

//-----------------------------

// import passport from 'passport-google-oauth2';
// import "dotenv/config";

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// import GoogleStrategy from "passport-google-oauth2";

// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://localhost:5000/auth/google/callback",
//   passReqToCallback: true
// },
//   function (request, accessToken, refreshToken, profile, done) {
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //   return done(err, user);
//     // });
//     return done(null, profile);
//   }
// ));

// // Export the 'passport' object directly
// export default passport;