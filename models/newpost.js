const mongoose = require("mongoose");
const newpostSchema = new mongoose.Schema({
    text: String,
    likes: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now },
    comments: [{
        text: String,
        postedBy: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            Email: String

        }
    }],
    createdBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        Email: String


    }
})

module.exports = mongoose.model("newpost", newpostSchema);