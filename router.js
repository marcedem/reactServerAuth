const Authentication = require('./controllers/authentication');

module.exports = function(app){
    //app.get('/', Authentication.allposts);

    app.post('/signup', Authentication.signup);
}