const passport = require('passport');

// developers.facebook.com

module.exports = (app) => {
    app.get(
        '/auth/facebook',
        passport.authenticate('facebook', {
            scope: ['email', 'user_gender']
        })
    );

    app.get(
        '/auth/facebook/callback',
        passport.authenticate('facebook'),
        (req, res) => {
            res.redirect('/api/current_user');
        }
    );
}
