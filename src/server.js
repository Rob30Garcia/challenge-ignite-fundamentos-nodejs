import http from 'node:http';

const server = http.createServer((req, res) =>  {
  return res.end('Create project');
})

server.listen(3333);
