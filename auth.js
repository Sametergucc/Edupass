const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID:"116320309813-po8nfupllb1cc0lqg6tttksavg2qag84.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5500/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    })
);
passport.serializeUser((user,done) => {
    done(null,user) 
});
passport.deserializeUser((user,done) => {
    done(null,user)
});