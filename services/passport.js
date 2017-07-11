const passport = require('passport');
const User = require('../models/user');
const token = require('../token');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: token.secret
};

// Create a JWT strategy
// payload: decoded jwt token , which in this case is the user ID and the timestamp
// done: callback whether user is authenticated or not
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    // See of the user ID in the payload exists in our database
    // If it does, call 'done' with that other
    // otherwise, call done without a user object
    User.findById(payload.sub, function(err, user){
        if(err) { return done(err, false); }

        if(user){
            done(null, user);
        }else{
            done(null, false);
        }
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
