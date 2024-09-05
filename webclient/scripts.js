let socket;

// Load saved data from localStorage
window.onload = function() {
    const savedServerUrl = localStorage.getItem('serverUrl');
    const savedClientName = localStorage.getItem('clientName');
    const savedRecipientName = localStorage.getItem('recipientName');


    if (savedServerUrl) {
        document.getElementById('serverUrl').value = savedServerUrl;
        connectWebSocket()
    }

    if (savedClientName) {
        document.getElementById('serverUrl').value = savedServerUrl;
        connectWebSocket()
    }
    
    if (savedRecipientName) {
        document.getElementById('serverUrl').value = savedServerUrl;
        connectWebSocket()
    }
    // Add keydown event listener for Ctrl+Enter
    document.getElementById('messageInput').addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'Enter') {
            sendMessage();
        }
    });
};

window.onbeforeunload = function() {
    localStorage.setItem('clientName', valOf('clientName'));
    localStorage.setItem('recipientName', valOf('sendTo'));
}

function connectWebSocket() {
    const serverUrl = valOf('serverUrl');
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
    let messageJSON = {
        code: message || valOf('messageInput'),
        to: valOf('sendTo')
    };

    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(messageJSON));
        appendMessage(`Sent ${JSON.stringify(messageJSON.code)} to ${JSON.stringify(messageJSON.to)}`);
        console.log('Message JSON\n' + JSON.stringify(messageJSON));
        document.getElementById('messageInput').value = ''; // Clear input field
    } else {
        appendMessage('Error: WebSocket is not connected.');
    }
}


function appendMessage(message) {
    const messages = document.getElementById('messages');
    messages.value += message + '\n';
    messages.scrollTop = messages.scrollHeight;
}


function selectSlot(slot){
    sendMessage(`turtle.select(${slot})`)
}

function valOf(id){
    return document.getElementById(id).value;
}

function refuel(){
    sendMessage('for i = 1, 16 do turtle.select(i) turtle.refuel() end')
}

function clearLogs(){
    document.getElementById('messages').value = "";
}