const http = require('http');
const { fork } = require('child_process');

const server = http.createServer();


server.on('request', (request, response) => {
  if (request.url === '/compute') {
      console.log("inside compute")
    const compute = fork('compute.js');
    compute.send('start');

    compute.on('message', result => {
        console.log("Long computation result")
        response.end(`Long computation result: ${result}`)
    });
  } else {
    response.end('Route not found')
  }
});

server.listen(3000);



