const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const serverPort = 8125;




http.createServer((request, response) => {
    // console.log('request starting...');

    let filePath = './ui-view' + request.url;
    if ( request.url === '/' || request.url.match(/\?/) ) filePath = './ui-view/index.html';
    let extname = path.extname(filePath);
    let contentType = recognizeContentType(extname);


    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile('./404.html', function (error, content) {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, {'Content-Type': contentType});

            let parsedUrl = url.parse(request.url, true);
            if(Object.keys(parsedUrl.query).length !== 0) {
                sendToSecondBackend(JSON.stringify(parsedUrl.query));
            };

            response.end(content, 'utf-8');
        }
    });

}).listen(serverPort);
console.log(`Server running at http://127.0.0.1:${serverPort}/`);

const sendToSecondBackend = (data)=> {

    const reqOptions = {
        host: '127.0.0.1',
        port: '6060',
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    const postRequest = http.request(reqOptions, (res) => {
        res.setEncoding('utf8');

    });

    postRequest.write(data);
    postRequest.end();
};

const recognizeContentType = (extname)=> {
    let contentType = null;

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        default:
            contentType = 'text/html';
    }
    return contentType;
}
