// server.js

const express = require("express");
const SocketServer = require("ws");
const uuidv4 = require("uuid/v4");

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

wss.broadcast = data => {
  wss.clients.forEach(client => {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

// Takes care of creating an ID for received data, re-stringifies it, and broadcasts it
const createIdStringify = data => {
  data._id = uuidv4();
  return (unparsedData = JSON.stringify(data));
};

// Checks the current amount of connected users and broadcasts it to everyone.
const sendOnlineUsers = () => {
  let clientSize = {
    type: "incomingSize",
    online: wss.clients.size
  };
  createIdStringify(clientSize);
  wss.broadcast(unparsedData);
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  console.log("Client connected");

  sendOnlineUsers();

  ws.onmessage = e => {
    let parsedData = JSON.parse(e.data);

    switch (parsedData.type) {
      case "postMessage":
        parsedData.type = "incomingMessage";
        createIdStringify(parsedData);

        wss.broadcast(unparsedData);
        break;

      case "postNotification":
        parsedData.type = "incomingNotification";
        createIdStringify(parsedData);

        wss.broadcast(unparsedData);
        break;

      default:
        break;
    }
  };

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    console.log("Client disconnected");
    sendOnlineUsers();
  });
});
