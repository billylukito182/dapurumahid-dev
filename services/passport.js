const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            User.findOne({userId: profile.id}).then(existingUser => {
                if (existingUser){
                    console.log("Google ID already exists");
                    // already have record
                    done(null, existingUser);
                }else{
                    // make new record
                    new User({
                        userId: profile.id,
                        provider: profile.provider,
                        name: profile.displayName,
                        email: profile.emails[0].value
                    })
                    .save()
                    .then(user => done(null,user))
                }
            })
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: keys.facebookClientID,
            clientSecret: keys.facebookClientSecret,
            callbackURL: '/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'photos', 'email','gender']
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            User.findOne({userId: profile.id}).then(existingUser => {
                if (existingUser){
                    console.log("Facebook ID already exists");
                    // already have record
                    done(null, existingUser);
                }else{
                    console.log("Insert Facebook User ID");
                    // make new record
                    new User({
                        userId: profile.id,
                        provider: profile.provider,
                        name: profile.displayName,
                        email: profile.emails[0].value
                    })
                    .save()
                    .then(user => done(null,user))
                }
            })
        }
    )
);