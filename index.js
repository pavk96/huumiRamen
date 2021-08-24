const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const db = require("./server_mongo/server.js");
//mongoDB 연동 모듈 사용
db();

const app = http.createServer(function (request, response) {
  const mimeType = {
    ".ico": "image/x-icon",
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".png": "image/png",
    ".jpeg": "image/jpeg",
    ".eot": "aplication/vnd.ms-fontobject",
    ".ttf": "aplication/font-sfnt",
  };
  const _url = request.url;
  const queryString = url.parse(_url, true).query;
  const filePath = path.join(__dirname, "./html/index.html");
  const ext = path.parse(_url).ext;
  const publicPath = path.join(__dirname, "./public");

  if (Object.keys(mimeType).includes(ext)) {
    fs.readFile(`${publicPath}${_url}`, (err, data) => {
      if (err) throw err;
      response.writeHead(200, "Content-Type", mimeType[ext]);
      response.end(data);
    });
  } else {
    response.writeHead(200, "Content-Type", "text/html");
    fs.readFile("./public/html/index.html", (err, data) => {
      if (err) throw err;
      response.end(data);
    });
  }
});
app.listen(3000);
