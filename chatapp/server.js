const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

// app.use("/assets", express.static(path.join(__dirname, "assets"), {
//   setHeaders: (res, filePath) => {
//     if (filePath.endsWith(".css")) {
//       res.setHeader("Content-Type", "text/css");
//     } else if (filePath.endsWith(".js")) {
//       res.setHeader("Content-Type", "application/javascript");  
//     }
//   }
// }));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

app.use(express.static(path.join(__dirname, "public")));


io.on("connection", (socket) => {
  socket.on("send", (data) => {
    data.id = socket.id; 
    io.emit("receive", data); 
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
