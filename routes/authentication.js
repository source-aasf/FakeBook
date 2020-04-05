const User = require('../models/user')
const jwt = require('jwt-simple')
const config = require('../config')



function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}


exports.signin = function(req, res, next) {

    res.send({
        token: tokenForUser(req.user),
        user: req.user
    })
}

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) { // implemet chek for @ and .com in an email
        return res.status(422).send({ error: 'you must provide a email and password' })
    }


    //check if email is present
    User.findOne({ email: email }, function(err, existingUser) {


        //if email does not exits then, return an error
        if (err) return next(err)
            //throw error if email exist
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' })
        }
        //if a user does NOT exist, create and save user record
        const user = new User({
            email: email,
            password: password

        });

        user.save(function(err, usersaved) {
            if (err) { return next(err); }
            // respond to request indicating the user was created
            res.json({
                token: tokenForUser(user),
                id: usersaved._id,
                email: usersaved.email
            });
        })


    });






}