import { randomUUID } from 'node:crypto';

const tasks = [];

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      return res.writeHead(200).end(JSON.stringify(tasks));
    }
  }, 
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const { title, description } = req.body

      tasks.push({
        id: randomUUID(),
        title,
        description,
        create_at: new Date().toString(),
        updated_at: new Date().toString(),
        completed_at: null
      });

      return res.writeHead(201).end();
    }
  }
];
