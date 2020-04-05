const express = require('./node_modules/express');
const mongoose = require('mongoose')
const bodyParser = require('./node_modules/body-parser')
const morgan = require('morgan')
const cors = require('cors');
const socketio = require("socket.io")
const http = require("http")
require('./models/newpost');
require('./models/user')
const newpostroutes = require('./routes/newpostRoutes')
const postfeedroutes = require('./routes/Postfeed')
const app = express()
const SocketManager = require('./SocketManager')
const server = http.createServer(app);
const io = socketio(server);
io.origins('*:*')
io.on('connection', SocketManager)
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/Fakebook`);

app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(cors());
app.use('/', newpostroutes)
app.use('/', postfeedroutes)

app.use('/', require('./routes/FriendReq'))
require('./routes/userRoutes')(app);
// require('./routes/Postfeed')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'winterproject', 'build', 'index.html'))
    })

}



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});