const HTTPS_PORT = 3000;

/**
 * create a normal https server
 */
const https = require("https");
const fs = require("fs");
const mime = require("mime");

const serverOptions = {
  key: fs.readFileSync(__dirname + "/secret/key.pem"),
  cert: fs.readFileSync(__dirname + "/secret/cert.pem")
};

const httpsHandler = (req, res) => {
  console.log(req.url);
  // send emty response for favicon.ico
  if (req.url === "/favicon.ico") {
    res.writeHead(200);
    res.end();
    return;
  }

  const fileName = req.url === "/" ? "index.html" : __dirname + req.url;
  fs.readFile(fileName, (err, data) => {
    if (err) {
      res.writeHead(503);
      res.end("Error occurred while reading file", fileName);
      return;
    }
    res.writeHead(200, { "Content-Type": mime.getType(fileName) });
    res.end(data);
  });
};

https
  .createServer(serverOptions, httpsHandler)
  .listen(HTTPS_PORT, () =>
    console.log("https server started on port", HTTPS_PORT)
  );