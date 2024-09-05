const socket = require("ws");
var clients = [];
const webSocket = new socket.Server({ port: 5656 });

if (webSocket) {
    console.log("Websocket Server Started");
} else {
    console.error("Failed To Start Server");
}

webSocket.on("connection", wsClient => {
    console.log("Something connected");
    clients.push({ client: wsClient, clientName: "unnamed" });

    wsClient.on("message", messageData => {
        try {
            let message = messageData.toString();
            console.log("Received Message: " + message);

            if (isJson(message)) {
                let jsonMessage = JSON.parse(message);

                if (jsonMessage.to) {
                    messageName(jsonMessage.to, JSON.stringify(jsonMessage), clients);
                } else {
                    messageAll(clients, jsonMessage.code); // Send the code to all clients
                    console.log('No recipient specified');
                }
            } else {
                if (message.startsWith("renameSelf")) {
                    let client = clients.find(c => c.client === wsClient);
                    if (client) {
                        client.clientName = message.split("|")[1];
                        console.log("Client renamed to: " + client.clientName);
                    }
                } else {
                    console.log('Message not JSON');
                }
            }
        } catch (err) {
            console.error("Error processing message:", err);
        }
    });

    wsClient.on("close", () => {
        try {
            console.log("Something Disconnected");
            // Optionally remove the disconnected client from the clients array
            clients = clients.filter(c => c.client !== wsClient);
        } catch (err) {
            console.error("Error handling disconnection:", err);
        }
    });
});


function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function messageAll(clients, message) {
    clients.forEach(function (client) {
        client.client.send(message);
    });
    console.log(`Sent "${message}" to all connected clients`)
}

function objValExists(obj, val) {
    return Object.values(obj).includes(val);
}

function messageName(name, message, clients) {
    let client = clients.find(c => c.clientName === name);
    if (client) {
        client.client.send(message);
        console.log(`Sent '${message} to ${client.clientName}'`)
    } else {
        console.log(`Client with name "${name}" not found.`);
    }
}
