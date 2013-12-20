var crypto = require('crypto'),
    LocalStrategy = require('passport-local').Strategy,
    data = require('../models/auth')();

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });


    passport.deserializeUser(function(user_id, done) {
        new data.ApiUser({id: user_id}).fetch().then(function(user) {
            return done(null, user);
        }, function(error) {
            return done(error);
        });
    });


    passport.use(new LocalStrategy({
        usernameField: 'un',
        passwordField: 'pw'
    },function(email, password, done) {
        new data.ApiUser({email: email}).fetch({require: true}).then(function(user) {
            var sa = user.get('salt');
            var pw = user.get('password');
            var upw = crypto.createHmac('sha1', sa).update(password).digest('hex');
            if(upw == pw) {
                return done(null, user);
            }
            return done(null, false, { 'message': 'Invalid password'});
        }, function(error) {
            return done(null, false, { 'message': 'Unknown user'});
        });
    }));
};
