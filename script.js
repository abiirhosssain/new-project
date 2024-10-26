const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const nameContainer = document.getElementById('name-container');
const nameInput = document.getElementById('name-input');
const saveNameBtn = document.getElementById('save-name-btn');
let userName = '';

// Save user name and show chat container
saveNameBtn.addEventListener('click', () => {
    userName = nameInput.value;
    if (userName.trim()) {
        nameContainer.style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
    }
});

// Receive messages from server
socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
});

// Send message to server
messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', { name: userName, message });
    messageInput.value = '';
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}
