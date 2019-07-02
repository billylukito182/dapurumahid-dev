const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const router = express.Router();

// console.developers.google.com
passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
      },
      (accessToken, refreshToken, profile, done) => {
        console.log('accessToken',accessToken);
          console.log('refreshToken',refreshToken);
          console.log('profile',profile);
      }
    )
);

router.get(
    '/auth/google',
    passport.authenticate('google',{
      scope: ['profile','email']
    })
);

router.get(
    '/auth/google/callback',
    passport.authenticate('google')
);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Exercise Expresses123' });
});

module.exports = router;
