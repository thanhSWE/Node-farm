const EventEmitter = require("events");
const http = require("http");
const url = require("url");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEvent = new Sales();

//setup listener
myEvent.on("newSale", () => {
  console.log("There are a newSale!"); //prints out the event name
});
myEvent.on("newSale", () => {
  console.log("Costumer: ThanhCa"); //prints out the event name
});

myEvent.on("newSale", (stock) => {
  console.log(`The number of product was sold is ${stock} `);
});

//phat ra su kien newSale
myEvent.emit("newSale", 9);
/////////////////////
const server = http.createServer();
server.on("request", (req, res) => {
  console.log("there is a request to server");
  console.log(req.url);
  res.end("there is a request to server");
});
server.on("request", (req, res) => {
  console.log("Another request");
});
server.on("close", (req, res) => {
  console.log("Close Server");
});
server.listen(3000, () => {
  console.log("Listening on port 3000");
});
