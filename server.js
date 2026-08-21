const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const indexPath = path.join(__dirname, "index.html");

const server = http.createServer((req, res) => {
  fs.readFile(indexPath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Server error");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
