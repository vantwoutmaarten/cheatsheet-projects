const webSocketServerPort = 8000;
const webSocketServer = require("websocket").server;
const http = require("http");
const { client } = require("websocket");

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketServerPort);
console.log("listening on port 8000");

const wsServer = new webSocketServer({
  httpServer: server,
});

const clients = {};

const getUniqueID = () => {
  const s4 = Math.random() * 100000;
};

wsServer.on("request", function (request) {
  let userID = getUniqueID();
  console.log("Request Received from " + request.origin);
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;

  console.log("connected", userID);

  connection.on("message", function (message) {
    if (message.type === "utf8") {
      console.log("Recieved Message ", message.utf8Data);

      for (key in clients) {
        clients[key].sendUTF(message.utf8Data, userID);
        console.log("sent Message to ", clients[key]);
      }
    }
  });
});
