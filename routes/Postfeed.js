const mongoose = require('mongoose')
var express = require("express");
var app = express.Router()
const newpost = mongoose.model('newpost');
const user = mongoose.model('user')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })

app.post(`/api/updatepost`, requireAuth, (req, res) => {

    // console.log(req.body.id)

    // newpost.findById(req.body.id, (err, res) => {
    //     if (err) { console.log(err) } else {
    //         console.log(res)


    //     }
    // })

    newpost.findById(req.body.id, (err, postfound) => {
        if (err) { console.log(err) } else {
            postfound.likes = req.body.likes
                // postfound.comments.text = req.body.comments.text
                // postfound.postedBy.id = req.user._id
                // postfound.postedBy.Email = req.user.email
            postfound.save()
        }

    })
    return res.status(201).send({ error: false })
})

module.exports = app;