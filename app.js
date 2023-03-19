const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs')
const path = require('path')

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const user = require('./models/user');

const userRoute = require('./routes/auth-user');
const homeRoute = require('./routes/home');
const User = require('./models/user')

const MONGODB_URI = "mongodb://127.0.0.1:27017/chatDB";

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, "public")));
app.use(homeRoute);
app.use('/auth', userRoute);

const func = async () => {
    const createUser = new User({
        name: 'Essien emmanuel',
        email: 'essienemma@gmail.com'
    })
    const success = await createUser.save()
    if (success) {
        console.log('successful')
        return
    }
    console.log('failed')
}
// func()

mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
});


io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('message', (data) => {
        socket.broadcast.emit('message', data)
    })
})

server.listen(3000, () => {
    console.log('server is spinning at port 3000');
});
