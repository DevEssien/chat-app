const date = new Date()
const socket = io("http://localhost:3000");

socket.on("connection");

const messageForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('.chat-messages')

//Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

//join chat room
socket.emit('joinRoom', { username, room })

//message from server 
socket.on("message", (message) => {
    console.log('message ', message)
    outputMessage(message)

    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
});

//submit message
messageForm.addEventListener('submit', e => {
    e.preventDefault()

    //Get message text
    const messageInput = e.target.elements.msg
    const message = messageInput.value;

    //Emit message to server
    socket.emit("chatMessage", message);

    //clear input
    messageInput.value = ''
    messageInput.focus;
})

const outputMessage = (message) => {
    const div = document.createElement('div');
    div.classList.add('message')
    div.innerHTML = `
        <p class="meta"> ${message.username} <span>${message.time}</span></p>
        <p class="text">${message.text}</p>
    `;
    document.querySelector('.chat-messages').appendChild(div)
}