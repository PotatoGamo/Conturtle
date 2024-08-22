let socket;

// Load saved data from localStorage
window.onload = function() {
    const savedServerUrl = localStorage.getItem('serverUrl');
    const savedMessage = localStorage.getItem('messageInput');

    if (savedServerUrl) {
        document.getElementById('serverUrl').value = savedServerUrl;
        connectWebSocket()
    }

    if (savedMessage) {
        document.getElementById('messageInput').value = savedMessage;
    }

    // Add keydown event listener for Ctrl+Enter
    document.getElementById('messageInput').addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'Enter') {
            sendMessage();
        }
    });
};

function connectWebSocket() {
    const serverUrl = document.getElementById('serverUrl').value;
    localStorage.setItem('serverUrl', serverUrl); // Save the server URL to localStorage

    socket = new WebSocket(serverUrl);

    socket.onopen = function(event) {
        document.getElementById('status').innerHTML = 'Status: <span style="color: green;">Connected</span>';
        appendMessage('Connected to ' + serverUrl);
    };

    socket.onmessage = function(event) {
        appendMessage('Received: ' + event.data);
    };

    socket.onclose = function(event) {
        document.getElementById('status').innerHTML = 'Status: <span style="color: red;">Disconnected</span>';
        appendMessage('Disconnected from ' + serverUrl);
    };

    socket.onerror = function(error) {
        document.getElementById('status').innerHTML = 'Status: <span style="color: red;font-weight:bold;">Error</span>';
        appendMessage('Error: ' + error.message);
    };
}

function sendMessage(message) {
    if(!message){
        message = document.getElementById('messageInput').value;
    }
    localStorage.setItem('messageInput', message); // Save the last message to localStorage

    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
        appendMessage('Sent: ' + message);
        document.getElementById('messageInput').value = ''; // Clear input field
        localStorage.removeItem('messageInput'); // Clear saved message
    } else {
        appendMessage('Error: WebSocket is not connected.');
    }
}

function appendMessage(message) {
    const messages = document.getElementById('messages');
    messages.value += message + '\n';
    messages.scrollTop = messages.scrollHeight;
}
