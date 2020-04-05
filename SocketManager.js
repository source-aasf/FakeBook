const { addUser, removeUSer, getUser, getUsersInRoom } = require('./chatusers')

module.exports = function(socket) {
    console.log("connection established")

    socket.on('join', (e, callback) => {
        const { error, user } = addUser({ id: socket.id, name: e.name, room: e.room });
        if (error) { return console.log(error) }

        socket.emit('message', { user: 'admin', text: "$(e.name), welcome to the room" })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: "$(e.name), has joined" })

        socket.join(user.room)

        // callback();
    })

    socket.on('sendMessage', (message) => {
            const user = getUser(socket.id)
            io.to(user.room).emit('message', { user: user.name, text: message })
                // callback();
        })
        // socket.emit('catch', { name: 'utkarsh' })

    socket.on('disconnect', () => {
        console.log("connection ended")
    })

}