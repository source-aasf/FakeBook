const mongoose = require("mongoose")
var express = require("express");
// const newpost = mongoose.model('newpost');
// const user = mongoose.model('user')
// const comments = mongoose.model("Comment")
const newpost = require("./newpost")
const user = require("./user")

var user1 = new user({
    Email: "abc@gmail",
    password: 'abc'
})
var user2 = new user({
        Email: "def@gmail",
        password: 'def'
    })
    // user1.save(function(err){
    //     if(err){
    //         console.log(err)
    //         return;
    //     }

// });
// user2.save();
user.create(user1, (err, newlyCreated) => {
    if (err) { console.log(err) } else {
        console.log(newlyCreated)
    }
})