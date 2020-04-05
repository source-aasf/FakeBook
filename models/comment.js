const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now },
    postedBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    }
});
module.exports = mongoose.model("Comment", commentSchema);