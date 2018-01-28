const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const serverPort = 6060;


http.createServer((request, response) => {
    console.log(request);


}).listen(serverPort);
console.log(`Server running at http://127.0.0.1:${serverPort}/`);
