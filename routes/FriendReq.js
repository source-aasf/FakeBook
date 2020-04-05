var user = require('../models/user')
var mongoose = require('mongoose')
var express = require('express')
var app = express.Router({ mergeParams: true })
var async = require('async')

const passport = require('passport')
const passportService = require('../services/passport')
const requireAuth = passport.authenticate('jwt', { session: false })



app.post(`/api/sendrequest`, requireAuth, (req, res) => {

    async.parallel([

        //function for updating the model of reciever of the new request
        // For new request
        // sender sends the requests to receiver
        // user should not be present in the friend list or requestlist
        //socket.io event listener for add friend event 
        function() {
            console.log(req.user._id)
            if (req.body.receiverId) {
                user.findById(req.body.receiverId, (err, founduser) => {
                    if (err) { console.log(err) }
                    if (founduser.request.userId != req.user._id && founduser.friendsList.friendId != req.user._id) {
                        let request = {
                            userId: req.user._id,
                        }
                        founduser.totalRequest = founduser.totalRequest + 1;
                        founduser.request.push(request)
                        founduser.save()
                    }
                })
            }

        },
        //function for updating the model of the sender when it sends a request
        //
        function() {
            if (req.body.receiverId) {
                user.findById(req.user._id, (err, founduser) => {
                    if (err) { console.log(err) }
                    if (founduser.sentRequest.receiverId != req.body.receiverId) {
                        let request = {
                            receiverId: req.body.receiverId
                        }
                        founduser.sentRequest.push(request)
                        founduser.save()
                    }

                })
            }

        },


        // Functions when the request is accepted 
        //for the receiever of request

        function() {
            if (req.body.senderId) {
                user.findById(req.user._id, (err, founduser) => {
                    if (err) { console.log(err) }
                    if (founduser.friendsList.friendId != req.body.senderId) {
                        let newfriend = {
                            friendId: req.body.senderId
                        }
                        founduser.friendsList.push(newfriend)
                        founduser.totalRequest = founduser.totalRequest - 1;
                        founduser.request.forEach((item) => {
                            if (item.userId === req.body.senderId) {
                                founduser.request.splice(founduser.request.indexOf(item), 1)
                            }
                        })
                        founduser.save()

                    }
                })
            }
        },
        //for the sender of request
        // receiever sends requests to the sender
        function() {
            if (req.body.senderId) {
                user.findById(req.body.senderId, (err, founduser) => {
                    if (err) { console.log(err) }
                    if (founduser.friendsList.friendId != req.user._id) {
                        let newfriend = {
                            friendId: req.user._id
                        }
                        founduser.friendsList.push(newfriend)
                        founduser.sentRequest.forEach((item) => {
                            if (item.receiverId === req.user._id) {
                                founduser.sentRequest.splice(founduser.sentRequest.indexOf(item), 1)
                            }
                        })
                        founduser.save()

                    }
                })
            }
        },
        // function for cancelling the request
        function() {
            if (req.body.user_Id) {
                user.findById(req.body._id, (err, founduser) => {
                    if (err) { console.log(err) }
                    if (founduser.request.userId = req.body.user_Id) {
                        founduser.request.forEach((item) => {
                            if (item.userId === req.body.user_Id) {
                                founduser.request.splice(founduser.request.indexOf(item), 1)
                            }
                        })
                        founduser.totalRequest = founduser.totalRequest - 1;
                        founduser.save()

                    }
                })
            }
        },
        function(callback) {
            if (req.body.user_Id) {
                User.update({
                    '_id': req.body.user_Id,
                    'sentRequest.receverid': { $eq: req.user._id }
                }, {
                    $pull: {
                        sentRequest: {
                            receiverId: req.user._id
                        }
                    }
                }, (err, count) => {
                    callback(err, count);
                });
            }
        }





    ], (err, results) => {
        console.log(err)
    })

    return res.status(201).send({
        error: false,

    })

})

module.exports = app;