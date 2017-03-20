const http = require("http");

const server = http.createServer()

server.listen(3000, () =>{
  console.log('The HTTP server is listening at port 3000');
});

let counter = 0;

server.on('request', (req, res) => {
  res.writeHead(200, { "Content-Type": 'text/plain' });
  res.write("Hello World\n");
  res.write(`This is Request #${++counter}.`);
  res.end();
});
