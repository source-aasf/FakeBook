const mongoose = require('mongoose');
var express = require("express");
var app = express.Router({ mergeParams: true })
const newpost = mongoose.model('newpost');
// const user = require("../models/user")
const passport = require('passport')
const passportService = require('../services/passport')
const requireAuth = passport.authenticate('jwt', { session: false })
    // const user = require("../models/user")
const user = mongoose.model('user')



app.get(`/api/newpost`, requireAuth, async(req, res) => {
    let newPost = await newpost.find({ "createdBy.id": req.user.id })
    return res.status(200).send(newPost);
})

app.post(`/api/newpost`, requireAuth, (req, res) => {
    var text = req.body.text;
    var likes = req.body.likes;
    // var comments = {
    //     id: req.user._id,
    //     email: req.user.email
    // }
    var newPost = {
            text: text,
            likes: likes,
            // comments: comments
        }
        // console.log(req.params.id + "here is id")
    user.findById(req.user._id, (err, usercreated) => {
        if (err) { console.log(err) } else {
            // console.log(usercreated + 'hello')
            newpost.create(newPost, (err, newlyCreated) => {
                if (err) { console.log(err) } else {
                    newlyCreated.createdBy.id = req.user._id
                    newlyCreated.createdBy.Email = req.user.email
                        // console.log(newlyCreated)
                    newlyCreated.save()
                    usercreated.post.push(newlyCreated);
                    usercreated.save()
                }
            })
        }

    })
    return res.status(201).send({
        error: false,
        newPost
    })
})

module.exports = app;