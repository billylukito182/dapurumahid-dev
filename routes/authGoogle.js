const passport = require('passport');

// console.developers.google.com

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google',{
            scope: ['profile','email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/api/current_user');
        }

    );
};