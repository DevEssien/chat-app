const socket = io("http://localhost:3000");

socket.on("connection");

const messageForm = document.querySelector('#form');

//message from server 
socket.on("message", (message) => {
    document.querySelector("h1").innerHTML = message;
});

// const sendMessage = () => {
//     const messageInput = document.querySelector(".message");
//     const data = messageInput.value;
//     socket.emit("message", data);
// };

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const messageInput = document.querySelector(".message");
    const message = messageInput.value;
    socket.emit("chatMessage", message);
    messageInput.value = ''
})

