const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const indexPath = path.join(__dirname, "index.html");
const relayUrl = process.env.CHAT_RELAY_URL || '';

const server = http.createServer((req, res) => {
  fs.readFile(indexPath, "utf8", (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Server error");
      return;
    }
    // Inject the relay URL so the page can POST chat events to it
    const html = data.replace(
      '<!-- CHAT_RELAY_URL -->',
      `<script>window.CHAT_RELAY_URL = ${JSON.stringify(relayUrl)};</script>`
    );
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
