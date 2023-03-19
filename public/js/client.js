// const io =require("socket.io");

const socket = io('http://localhost:3000');
socket.on('connection')

socket.on('message', data => {
    document.querySelector('h1').innerHTML = data
})

const sendMessage = () => {
    const messageInput = document.querySelector('.message');
    const data = messageInput.value;
    console.log(data)
    socket.emit('message', data)
}
