import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

const server = http.createServer(async (req, res) =>  {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(route => {
    return route.method === method && route.path.test(url);
  });

  if(route) {
    //retornar os dados da regex
    const routeParams = req.url.match(route.path);

    console.log(routeParams);

    req.params = {...routeParams.groups};

    return route.handler(req, res);
  }

  return res.writeHead().end();
})

server.listen(3333);
