const express = require("express");
const http = require("http");
const { rateLimit } = require("express-rate-limit");
const { initializeAPI } = require("./api");
const NodeRSA = require('node-rsa');
const key = new NodeRSA({ b: 1024 });
const privateKey = key.exportKey('private');
const publicKey = key.exportKey('public');

res.json({ privateKey, publicKey });


// Create the express server
const app = express();
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 Minute
  limit: 50, // limit each IP to 50 requests per windowMs
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

if (keyData.privateKey && keyData.publicKey) {
  // Speichern Sie die Keys im localStorage
  localStorage.setItem("privateKey", keyData.privateKey);
  localStorage.setItem("publicKey", keyData.publicKey);
}
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("privateKey");
    localStorage.removeItem("publicKey");
  });
// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(express.json());
const server = http.createServer(app);

// deliver static files from the client folder like css, js, images
app.use(express.static("client"));
// route for the homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

// Initialize the REST api
initializeAPI(app);

//start the web server
const serverPort = process.env.PORT || 3000;
server.listen(serverPort, () => {
  console.log(`Express Server started on port ${serverPort}`);
});
