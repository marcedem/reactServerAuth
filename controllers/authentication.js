const User = require('../models/user');

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
                res.json({success: true});
            });

        });

}

exports.allposts = function (req, res, next) {
    res.send(['waterbottle', 'phone', 'paper']);
}
