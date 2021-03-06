const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// if user authenticated, set cookie session to false
// requireAuth: play the role of a middleware
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app){
    //app.get('/', Authentication.allposts);
    app.get('/', requireAuth, function(req, res){
        res.send({message: 'Welcome to the dummy server world!' })
    });
    
     app.post('/signin', requireSignin, Authentication.signin);
    
    app.post('/signup', Authentication.signup);

}