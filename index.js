const express = require("express");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "116320309813-pt6s8oobqik7cat8d96i58vk2g00ekou.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5500/auth/google/callback" // Google Developer Console'da tanımlanan callback URL'sini ekleyin
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

const app = express();

app.get("/login", (req,res)=> {
    res.send("<p><a href='/auth/google'>login with Google</a> selam</p>");
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/profile",
        failureRedirect: "/failurl"
    })
);

app.get("/profile", (req,res)=> {
    res.send("welcome");
});

app.get("/failurl", (req,res)=> {
    res.send("yanlış giriş abicim");
});

app.listen(5500, () => {
    console.log("Running on port 5500");
});
