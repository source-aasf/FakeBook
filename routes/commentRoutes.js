const mongoose = require('mongoose');
const comment = mongoose.model('Comment');

module.exports = (app) => {

    app.get(`/api/comments`, async(req, res) => {
        let newcomments = await comment.find();
        return res.status(200).send(newcomments);
    })

    app.post(`/api/comments`, async(req, res) => {
        let newcomment = await comment.create(req.body);
        return res.status(201).send({
            error: false,
            newcomment
        })
    })
}