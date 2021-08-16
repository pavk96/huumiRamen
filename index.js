const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

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

  //내가 뭘 하고 싶은가?
  //1. 서버가 계속 켜져있으면 좋겠다.에러가 나도 꺼지지 않도록 -> pm2를 사용하기로 함
  //2. html폴더에 html파일들을 정리하고 거기로 엔드 포인트를 만들면 좋겠다.
  //->public폴더에 정적인 파일들을 모두 집어 넣고 image를 받아올 때는 mimeType을 사용하여 header를 정해주어 type을 정해줄 수 있게 되었다.
  //3. url을 이용해서 홈화면을 보여주고 싶다. 파일시스템이 아니라->내가 적어놓고도 무슨 말인지 모르겠다. url을 파싱해서 그에 해당하는 파일을 읽어서 홈화면을 보여주고 있는데 말이다...
});
app.listen(3000);
