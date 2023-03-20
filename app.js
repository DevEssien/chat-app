const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs')
const path = require('path')

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


// const user = require('./models/user');
const formatMessage = require('./utils/messages')
const User = require('./utils/users')


const userRoute = require('./routes/auth-user');
const homeRoute = require('./routes/home');
const roomRoute = require('./routes/room');

// const User = require('./models/user')

const MONGODB_URI = "mongodb://127.0.0.1:27017/chatDB";

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, "public")));
app.use(homeRoute);
app.use('/room', roomRoute)
app.use('/auth', userRoute);

// const func = async () => {
//     const createUser = new User({
//         name: 'Essien emmanuel',
//         email: 'essienemma@gmail.com'
//     })
//     const success = await createUser.save()
//     if (success) {
//         console.log('successful')
//         return
//     }
//     console.log('failed')
// }
// func()

mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
});

const botName = 'we-tokBot'

//Run when client connects
io.on('connection', (socket) => {

    //listen for joinRoom
    socket.on('joinRoom', ({ username, room}) => {

        const user = User.userJoin(socket.id, username, room);
        socket.join(user.room)

        //welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to we-tok'))
        
        //Broadcast when a user joins a room
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`))
    })
    
    //listen for chatMessage
    socket.on('chatMessage', (message) => {
        const user = User.getCurrentUser(socket.id)
        io.to(user.room).emit('message',formatMessage(user.username,  message));
    })

    //Run when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'a user has left the chat'));
    })

})

server.listen(3000, () => {
    console.log('server is spinning at port 3000');
});
