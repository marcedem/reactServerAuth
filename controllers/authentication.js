const jwt = require('jwt-simple');
const token = require('../token');
const User = require('../models/user');

function tokenForUser(user){
    const timeStamp = new Date().getTime();
    // sub stands for subject. iat: issued at time (this also stand for the token payload, that will be used in passport.js)
    return jwt.encode({sub: user.id, iat: timeStamp}, token.secret);
}


exports.signup = function (req, res, next) {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res
            .status(422)
            .send({error: 'You must provide email and password! '}); // 422 Unprocessable entity

    }

    // See if a user with the given email exists
    User
        .findOne({
            email: email
        }, function (err, existingUser) {

            if (err) {
                return next(err);
            }

            // if a user with email does exist, return an error
            if (existingUser) {
                return res
                    .status(422)
                    .send({error: 'Email is in use'}); // 422 Unprocessable entity
            }

            // if a user withemail does NOT exist, create and save user record
            const user = new User({email: email, password: password});
            console.log(user);
            user.save(function (err) {
                if (err) {
                    return next(err)
                }

                // Repond to request indicating the user was created
                res.json({token: tokenForUser(user)});
            });

        });

}

exports.signin = function(req, res, next){
    // User has already had their email and password auth'd
    // We just need to give them a token
    res.send({ token: tokenForUser(req.user) });
}

exports.allposts = function (req, res, next) {
    res.send(['waterbottle', 'phone', 'paper']);
}
