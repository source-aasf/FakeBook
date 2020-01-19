const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


const localOptions = { usernameField: 'email' }
const locallogin = new LocalStrategy(localOptions, function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }

            user.comparePassword(password, function(err, isMatch) {
                if (err) { return done(err); }
                if (!isMatch) { return done(null, false) }

                return done(null, user)
            })
        })
    })
    //Setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}


//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) { //jwt payload
    //see if the user Id  in the payload exists in our database
    User.findById(payload.sub, function(err, user) {
            if (err) { return done(err, false); }

            if (user) {
                done(null, user)
            } else {
                done(null, false)
            }
        })
        // if it does, call 'done' with that other
        // other wise, call done without object
})

passport.use(jwtLogin)
passport.use(locallogin)